import { useEffect, useState, useCallback, useRef } from 'react';
import type { CollectionConfig } from '../config';
import pb from "../../lib/pocketbase";
import CreatorBox from './CreatorBox';
import ColorSelector from './ColorSelector'; // 👈 Import the newly extracted file
import { Trash2, Edit3, X, Check, Image as ImageIcon } from 'lucide-react';

interface Props {
  config: CollectionConfig;
}

export default function CollectionFeed({ config }: Props) {
  const [records, setRecords] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editFile, setEditFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchRecords = useCallback(async () => {
    try {
      const data = await pb.collection(config.id).getFullList({ 
        sort: '-created',
        requestKey: null 
      });
      setRecords(data);
    } catch (err: any) {
      if (err.isAbort) return;
      console.error(`Error fetching ${config.id}:`, err);
    }
  }, [config.id]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // 👈 SEAMLESS INTERCEPT ROUTE: Bypasses standard feed if configuration matches colors
  if (config.isColorConfig) {
    return <ColorSelector config={config} />;
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this entry forever?')) return;
    await pb.collection(config.id).delete(id);
    fetchRecords();
  };

  const handleUpdate = async (id: string) => {
    const formData = new FormData();
    formData.append(config.textField, editText);
    
    if (config.hasImage && editFile) {
      formData.append('image', editFile);
    }

    try {
      await pb.collection(config.id).update(id, formData);
      setEditingId(null);
      setEditFile(null);
      fetchRecords();
    } catch (err) {
      console.error("Error updating record:", err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditFile(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!config.isUpdateOnly && <CreatorBox config={config} onCreated={fetchRecords} />}

      <div className="space-y-4">
        {records.map((record) => (
          <div key={record.id} className="bg-surface rounded-xl shadow-sm border border-border p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                {config.hasTitle && record.title && <h3 className="font-bold text-text text-lg">{record.title}</h3>}
                <span className="text-xs text-muted">{new Date(record.created).toLocaleString()}</span>
              </div>
              
              <div className="flex gap-1">
                <button 
                  onClick={() => { 
                    setEditingId(record.id); 
                    setEditText(record[config.textField]); 
                    setEditFile(null);
                  }} 
                  className="p-1.5 text-muted hover:text-primary rounded"
                >
                  <Edit3 size={18} />
                </button>
                
                {!config.isUpdateOnly && (
                  <button onClick={() => handleDelete(record.id)} className="p-1.5 text-muted hover:text-red-500 rounded">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Inline Editing */}
            {editingId === record.id ? (
              <div className="mt-2 space-y-3">
                <textarea
                  className="w-full bg-background border border-primary rounded p-3 text-text focus:outline-none"
                  rows={4}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                
                {config.hasImage && (
                  <div className="flex flex-col gap-2">
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) setEditFile(e.target.files[0]);
                      }}
                    />
                    <div className="flex items-center gap-3">
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 text-xs bg-background border border-border hover:border-primary text-text px-3 py-2 rounded-lg transition"
                      >
                        <ImageIcon size={14} />
                        {record.image ? 'Foto austauschen' : 'Foto hinzufügen'}
                      </button>
                      {editFile && (
                        <span className="text-xs text-primary font-medium truncate max-w-[200px]">
                          Selected: {editFile.name}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-2 justify-end">
                  <button onClick={handleCancel} className="flex items-center gap-1 text-sm text-muted hover:bg-background px-3 py-1 rounded">
                    <X size={14}/> Abbrechen
                  </button>
                  <button onClick={() => handleUpdate(record.id)} className="flex items-center gap-1 text-sm bg-primary text-white px-3 py-1 rounded">
                    <Check size={14}/> Speichern
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-text whitespace-pre-wrap mt-2">{record[config.textField]}</p>
                
                {config.hasImage && record.image && (
                  <img 
                    src={`${pb.baseUrl}/api/files/${config.id}/${record.id}/${record.image}`} 
                    alt="attachment" 
                    className="mt-4 rounded-lg w-full max-h-96 object-cover border border-border"
                  />
                )}
              </>
            )}
          </div>
        ))}
        {records.length === 0 && <p className="text-center text-muted py-8">No entries found.</p>}
      </div>
    </div>
  );
}