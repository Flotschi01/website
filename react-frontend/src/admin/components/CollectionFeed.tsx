import { useEffect, useState, useCallback } from 'react';
import type { CollectionConfig } from '../config';
import pb from "../../lib/pocketbase";
import CreatorBox from './CreatorBox';
import { Trash2, Edit3, X, Check } from 'lucide-react';

interface Props {
  config: CollectionConfig;
}

export default function CollectionFeed({ config }: Props) {
  const [records, setRecords] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const fetchRecords = useCallback(async () => {
    try {
      const data = await pb.collection(config.id).getFullList({ sort: '-created' });
      setRecords(data);
    } catch (err) {
      console.error(`Error fetching ${config.id}:`, err);
    }
  }, [config.id]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this entry forever?')) return;
    await pb.collection(config.id).delete(id);
    fetchRecords();
  };

  const handleUpdate = async (id: string) => {
    await pb.collection(config.id).update(id, { [config.textField]: editText });
    setEditingId(null);
    fetchRecords();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <CreatorBox config={config} onCreated={fetchRecords} />

      <div className="space-y-4">
        {records.map((record) => (
          <div key={record.id} className="bg-surface rounded-xl shadow-sm border border-border p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                {config.hasTitle && record.title && <h3 className="font-bold text-text text-lg">{record.title}</h3>}
                <span className="text-xs text-muted">{new Date(record.created).toLocaleString()}</span>
              </div>
              
              <div className="flex gap-1">
                <button onClick={() => { setEditingId(record.id); setEditText(record[config.textField]); }} className="p-1.5 text-muted hover:text-primary rounded">
                  <Edit3 size={18} />
                </button>
                <button onClick={() => handleDelete(record.id)} className="p-1.5 text-muted hover:text-red-500 rounded">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Inline Editing */}
            {editingId === record.id ? (
              <div className="mt-2">
                <textarea
                  className="w-full bg-background border border-primary rounded p-3 text-text focus:outline-none"
                  rows={4}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="flex gap-2 mt-2 justify-end">
                  <button onClick={() => setEditingId(null)} className="flex items-center gap-1 text-sm text-muted hover:bg-background px-3 py-1 rounded">
                    <X size={14}/> Cancel
                  </button>
                  <button onClick={() => handleUpdate(record.id)} className="flex items-center gap-1 text-sm bg-primary text-white px-3 py-1 rounded">
                    <Check size={14}/> Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-text whitespace-pre-wrap mt-2">{record[config.textField]}</p>
            )}

            {config.hasImage && record.image && (
              <img 
                src={`${pb.baseURL}/api/files/${config.id}/${record.id}/${record.image}`} 
                alt="attachment" 
                className="mt-4 rounded-lg w-full max-h-96 object-cover border border-border"
              />
            )}
          </div>
        ))}
        {records.length === 0 && <p className="text-center text-muted py-8">No entries found.</p>}
      </div>
    </div>
  );
}