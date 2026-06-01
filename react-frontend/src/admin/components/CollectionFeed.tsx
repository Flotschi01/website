import { useEffect, useState, useCallback, useRef } from 'react';
import type { CollectionConfig } from '../config';
import pb from "../../lib/pocketbase";
import CreatorBox from './CreatorBox';
import ColorSelector from './ColorSelector';
import { Trash2, Edit3, X, Check, Image as ImageIcon, Crop } from 'lucide-react';

interface Props {
  config: CollectionConfig;
}

// --- Erweitertes ImageCropModal Component ---
interface CropModalProps {
  imageSource: File | string; // Akzeptiert jetzt Datei ODER URL-String
  aspectRatioString: string;
  onCrop: (croppedFile: File) => void;
  onClose: () => void;
}

function ImageCropModal({ imageSource, aspectRatioString, onCrop, onClose }: CropModalProps) {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [dimensions, setDimensions] = useState<{
    cropW: number; cropH: number;
    direction: 'horizontal' | 'vertical';
    naturalWidth: number; naturalHeight: number;
  } | null>(null);
  
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imageSource) return;
    
    if (typeof imageSource === 'string') {
      // Wenn es eine URL ist, direkt als Quelle setzen
      setImgSrc(imageSource);
    } else {
      // Wenn es ein File-Objekt ist, via FileReader einlesen
      const reader = new FileReader();
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(imageSource);
    }
  }, [imageSource]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const [w, h] = aspectRatioString.split('/').map(Number);
    const targetRatio = w / h;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    
    let cropW = img.naturalWidth;
    let cropH = img.naturalHeight;
    let direction: 'horizontal' | 'vertical' = 'horizontal';

    if (imgRatio > targetRatio) {
      cropW = img.naturalHeight * targetRatio;
      direction = 'horizontal';
    } else {
      cropH = img.naturalWidth / targetRatio;
      direction = 'vertical';
    }

    setDimensions({ cropW, cropH, direction, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight });
  };

  const handleConfirm = () => {
    if (!dimensions || !imgRef.current) return;
    const { cropW, cropH, direction, naturalWidth, naturalHeight } = dimensions;
    const canvas = document.createElement('canvas');
    canvas.width = cropW;
    canvas.height = cropH;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      let startX = 0; let startY = 0;
      if (direction === 'horizontal') startX = (sliderValue / 100) * (naturalWidth - cropW);
      else startY = (sliderValue / 100) * (naturalHeight - cropH);
      
      ctx.drawImage(imgRef.current, startX, startY, cropW, cropH, 0, 0, cropW, cropH);
      
      const fileType = imageSource instanceof File ? imageSource.type : 'image/jpeg';
      const fileName = imageSource instanceof File ? `cropped_${imageSource.name}` : 'cropped_existing.jpg';

      canvas.toBlob((blob) => {
        if (blob) onCrop(new File([blob], fileName, { type: fileType }));
      }, fileType);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-surface border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-5 text-text">
        <h3 className="text-xl font-bold">Bild zuschneiden</h3>
        
        <div className="w-full bg-black rounded-lg overflow-hidden relative shadow-inner" style={{ aspectRatio: aspectRatioString }}>
          <img
            ref={imgRef} 
            src={imgSrc} 
            alt="Crop" 
            onLoad={handleImageLoad}
            crossOrigin="anonymous" // 👈 CRITICAL: Erlaubt das Verarbeiten von externen URLs im Canvas ohne Security-Error
            className="w-full h-full object-cover"
            style={{ objectPosition: dimensions?.direction === 'horizontal' ? `${sliderValue}% 50%` : `50% ${sliderValue}%` }}
          />
        </div>

        {/* 👈 FIXED TS(1345): Sauberer Slider ohne void-Rückgabewert-Chaining */}
        <input
          type="range" min="0" max="100" value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="w-full accent-primary cursor-pointer"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 hover:bg-background rounded-lg text-muted">Abbrechen</button>
          <button onClick={handleConfirm} className="px-6 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all">Zuschnitt anwenden</button>
        </div>
      </div>
    </div>
  );
}

// --- Main CollectionFeed ---
export default function CollectionFeed({ config }: Props) {
  const [records, setRecords] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editCroppedFile, setEditCroppedFile] = useState<File | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentEditingRecord = records.find(r => r.id === editingId);
  const activeRecordRatio = currentEditingRecord?.aspect_ratio || '4/3';

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

  if (config.isColorConfig) {
    return <ColorSelector config={config} />;
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Eintrag unwiderruflich löschen?')) return;
    await pb.collection(config.id).delete(id);
    fetchRecords();
  };

  const handleUpdate = async (id: string) => {
    const formData = new FormData();
    formData.append(config.textField, editText);
    
    if (config.hasImage) {
      if (editFile) formData.append('image', editFile); // Nur senden, wenn ein NEUES Original gewählt wurde
      if (editCroppedFile) formData.append('croppedImage', editCroppedFile); // Der neue Zuschnitt (egal ob von Alt- oder Neubild)
      
      if (editFile || editCroppedFile) {
        formData.append('aspect_ratio', activeRecordRatio);
      }
    }

    try {
      await pb.collection(config.id).update(id, formData);
      setEditingId(null);
      setEditFile(null);
      setEditCroppedFile(null);
      fetchRecords();
    } catch (err) {
      console.error("Error updating record:", err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditFile(null);
    setEditCroppedFile(null);
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
                    setEditCroppedFile(null);
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
                  <div className="flex flex-col gap-2 p-3 bg-background rounded-lg border border-border">
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setEditFile(file);
                          setEditCroppedFile(null); 
                        }
                      }}
                    />
                    
                    <div className="flex items-center gap-3">
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 text-xs bg-surface border border-border hover:border-primary text-text px-3 py-2 rounded-lg transition"
                      >
                        <ImageIcon size={14} />
                        {record.image ? 'Neues Foto wählen' : 'Foto hinzufügen'}
                      </button>
                      
                      {/* Statusanzeige */}
                      {(editFile || record.image) && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-primary font-medium truncate max-w-[150px]">
                            {editFile ? editFile.name : 'Bestandsbild aktiv'}
                          </span>
                          {editCroppedFile && (
                            <span className="text-[10px] bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full border border-green-500/30">
                              Neu zugeschnitten
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 👈 JETZT IMMER VERFÜGBAR: Button wird eingeblendet sobald ein neues ODER ein altes Bild existiert */}
                    {(editFile || record.image) && (
                      <button 
                        type="button"
                        onClick={() => setShowCropper(true)}
                        className="flex items-center justify-center gap-2 w-full py-2 mt-2 text-xs font-bold bg-surface hover:bg-border rounded border border-border transition-colors text-text"
                      >
                        <Crop size={14} />
                        {editCroppedFile ? 'Zuschnitt anpassen' : `Bildbereich zuschneiden (${record.aspect_ratio || '4/3'})`}
                      </button>
                    )}
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
              // --- Normaler Feed-Ansichtsmodus ---
              <>
                <p className="text-text whitespace-pre-wrap mt-2">{record[config.textField]}</p>
                
                {config.hasImage && (record.croppedImage || record.image) && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-border max-w-full">
                    <img 
                      src={`${pb.baseUrl}/api/files/${config.id}/${record.id}/${record.croppedImage || record.image}`} 
                      alt="attachment" 
                      className="w-full object-cover block"
                      style={{ 
                        aspectRatio: record.aspect_ratio || '4/3', 
                        maxHeight: '600px'
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        ))}
        {records.length === 0 && <p className="text-center text-muted py-8">Keine Einträge gefunden.</p>}
      </div>

      {/* 👈 INTELLIGENTE QUELLE: Übergibt entweder die neue Datei oder die bestehende PocketBase-Bild-URL */}
      {showCropper && (editFile || currentEditingRecord?.image) && (
        <ImageCropModal
          imageSource={editFile || `${pb.baseUrl}/api/files/${config.id}/${currentEditingRecord.id}/${currentEditingRecord.image}`}
          aspectRatioString={activeRecordRatio}
          onCrop={(cropped) => {
            setEditCroppedFile(cropped);
            setShowCropper(false);
          }}
          onClose={() => setShowCropper(false)}
        />
      )}
    </div>
  );
}