import { useState, useRef } from 'react';
import type { CollectionConfig } from '../config';
import pb from "../../lib/pocketbase";
import { Image as ImageIcon, Send } from 'lucide-react';

interface Props {
  config: CollectionConfig;
  onCreated: () => void;
}

export default function CreatorBox({ config, onCreated }: Props) {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!text.trim() && !file) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append(config.textField, text);
    if (config.hasTitle && title) formData.append('title', title);
    if (file) formData.append('image', file);

    try {
      await pb.collection(config.id).create(formData);
      setText('');
      setTitle('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      onCreated();
    } catch (err) {
      console.error("Creation error:", err);
      alert("Failed to create entry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-border p-4 mb-6">
      {config.hasTitle && (
        <input 
          type="text"
          placeholder="Enter title..."
          className="w-full mb-3 p-2 bg-background border border-border rounded text-text font-medium outline-none focus:border-primary"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}
      
      <textarea
        className="w-full bg-background rounded-xl p-3 resize-none outline-none text-text placeholder:text-muted focus:ring-1 focus:ring-primary transition-all"
        rows={3}
        placeholder={`Write something for ${config.label}...`}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {file && (
        <div className="mt-2 text-sm text-primary flex items-center justify-between bg-background p-2 rounded">
          <span>Attached: {file.name}</span>
          <button onClick={() => setFile(null)} className="text-muted hover:text-red-500">✕</button>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 mt-3 border-t border-border">
        <div>
          {config.hasImage && (
            <>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept="image/*,application/pdf"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-background text-muted font-medium transition-colors"
              >
                <ImageIcon size={20} className="text-green-500" />
                <span>Add Media</span>
              </button>
            </>
          )}
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting || (!text.trim() && !file)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          <Send size={18} />
          {isSubmitting ? 'Posting...' : 'Publish'}
        </button>
      </div>
    </div>
  );
}