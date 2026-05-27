import { useEffect, useState, useCallback } from 'react';
import pb from "../../lib/pocketbase";
import type { CollectionConfig } from '../config';
import { Palette, Save, Check, RefreshCw } from 'lucide-react';

interface Props {
  config: CollectionConfig;
}

// 1. A dedicated row component to isolate state and prevent parent re-renders
function ColorRow({ record, config, onSaveSuccess }: { record: any; config: CollectionConfig; onSaveSuccess: (id: string, title: string, value: string) => void }) {
  // Keep an isolated, local state for just this single input row
  const [localColor, setLocalColor] = useState(record[config.textField] || '#ffffff');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState<boolean | null>(false);

  // Sync state if the database record changes externally
  useEffect(() => {
    setLocalColor(record[config.textField] || '#ffffff');
  }, [record, config.textField]);

  const triggerSave = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append(config.textField, localColor);
      
      // Update PocketBase directly
      await pb.collection(config.id).update(record.id, formData);

      // Trigger the parent callback to update layout variables instantly
      onSaveSuccess(record.id, record.title, localColor);
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(null), 2000);
    } catch (err) {
      console.error("Failed to save color record:", err);
      alert("Fehler beim Speichern.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-border hover:border-primary/30 transition-all">
      <div className="flex-1 pr-4">
        <code className="text-sm font-mono font-semibold text-text block select-all">
          {record.title}
        </code>
      </div>

      <div className="flex items-center gap-3">
        {/* Native Picker: drag as much as you want, it only alters this single isolated field */}
        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border cursor-pointer shadow-sm">
          <input
            type="color"
            value={localColor}
            onChange={(e) => setLocalColor(e.target.value)}
            className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
          />
        </div>

        {/* Text Input displaying hex value */}
        <input
          type="text"
          maxLength={7}
          value={localColor}
          onChange={(e) => setLocalColor(e.target.value)}
          className="w-24 p-2 text-center font-mono text-sm uppercase rounded border border-border bg-surface text-text focus:outline-none focus:border-primary"
        />

        {/* Save button: The ONLY thing that triggers an API call */}
        <button
          onClick={triggerSave}
          disabled={isSaving}
          className={`p-2 rounded-lg text-white transition-colors flex items-center justify-center min-w-[38px] min-h-[38px] ${
            isSaved 
              ? 'bg-green-600' 
              : 'bg-primary hover:bg-primary/90 disabled:opacity-50'
          }`}
          title="Farbe permanent speichern"
        >
          {isSaving ? (
            <RefreshCw size={16} className="animate-spin" />
          ) : isSaved ? (
            <Check size={16} />
          ) : (
            <Save size={16} />
          )}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// MAIN WRAPPER COMPONENT
// ==========================================
export default function ColorSelector({ config }: Props) {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchColors = useCallback(async () => {
    try {
      const data = await pb.collection(config.id).getFullList({ 
        sort: 'title', 
        requestKey: null 
      });
      setRecords(data);
    } catch (err: any) {
      if (err.isAbort) return;
      console.error("Error fetching colors:", err);
    } finally {
      setLoading(false);
    }
  }, [config.id]);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  const handleSaveSuccess = (id: string, title: string, finalHex: string) => {
    // 1. Update the parent list state only *after* a successful server response
    setRecords(prev => prev.map(r => r.id === id ? { ...r, [config.textField]: finalHex } : r));
    
    // 2. Inject property into document root for instant live dashboard previewing
    const variableName = title.startsWith('--') ? title : `--${title}`;
    document.documentElement.style.setProperty(variableName, finalHex);
  };

  if (loading) return <p className="text-center text-muted py-8">Farben werden geladen...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-surface rounded-xl shadow-sm border border-border p-6">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
        <Palette className="text-primary" size={22} />
        <div>
          <h3 className="text-lg font-bold text-text">Design-Farbschema</h3>
          <p className="text-xs text-muted">
            Wähle deine Wunschfarben aus und klicke auf Speichern, um das Design zu aktualisieren.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {records.map((record) => (
          <ColorRow 
            key={record.id}
            record={record}
            config={config}
            onSaveSuccess={handleSaveSuccess}
          />
        ))}
      </div>
    </div>
  );
}