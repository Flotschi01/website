import { useEffect, useState, useCallback } from "react";
import pb from '../lib/pocketbase';

interface TextRecord {
  title: string; 
  text: string;  
}

interface ImageRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  title: string; 
  image: string; 
}

export default function Home() {
  const [textMap, setTextMap] = useState<Record<string, string>>({});
  const [imageMap, setImageMap] = useState<Record<string, string>>({});

  const fetchWebsiteAssets = useCallback(async () => {
    try {
      const [textData, imageData] = await Promise.all([
        pb.collection('texts').getFullList<TextRecord>({ requestKey: null }),
        pb.collection('images').getFullList<ImageRecord>({ requestKey: null })
      ]);
      
      const textMapping = textData.reduce((acc, item) => {
        acc[item.title] = item.text;
        return acc;
      }, {} as Record<string, string>);
      setTextMap(textMapping);

      const imageMapping = imageData.reduce((acc, item) => {
        acc[item.title] = pb.files.getUrl(item, item.image);
        return acc;
      }, {} as Record<string, string>);
      setImageMap(imageMapping);

    } catch (err: any) {
      if (err.isAbort) return;
      console.error("Error fetching runtime dynamic assets:", err);
    }
  }, []);

  useEffect(() => {
    fetchWebsiteAssets();
  }, [fetchWebsiteAssets]);

  const t = (key: string, fallback: string) => textMap[key] || fallback;
  const img = (key: string, fallbackUrl?: string) => imageMap[key] || fallbackUrl || "";

  return (
    <div className="text-[var(--color-fg)] min-h-screen mt-16 font-sans dynamic-theme-wrapper flex flex-col">

      {/* --- SECTION 1: HERO & GENERAL INFO (Muted Sage Background) --- */}
      <section className="bg-[var(--color-bg-hero)] pt-20 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bold Asymmetric Typography */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-[var(--color-primary)] leading-tight max-w-2xl">
              {t('Titel Abschnitt 1', 'Fehler')}
            </h1>
            
            <div className="space-y-6 max-w-xl pt-4">
              <div className="border-l-2 border-[var(--color-primary)] pl-6">
                <h3 className="text-md font-bold uppercase tracking-widest text-[var(--color-accent)] mb-2">Allgemeines</h3>
                <p className="text-lg leading-relaxed whitespace-pre-wrap opacity-90">
                  {t('Verein_1', 'Fehler')}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Vertical Image Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md aspect-[3/4] overflow-hidden shadow-lg rounded-xl">
              <img 
                src={img('Foto Präsidentin')} 
                className="w-full h-full object-cover grayscale-[15%] contrast-[105%] transition-transform duration-500 hover:scale-105" 
                alt="Präsidentin" 
              />
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 2: ACTIVITIES (Clean Cream Background) --- */}
      <section className="bg-[var(--color-bg-sec1)] py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Activities Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-bg-sec2)] px-3 py-1 rounded-full inline-block">
              Unsere Vereinstätigkeiten
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[var(--color-primary)] leading-tight">
              Was wir tun
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 whitespace-pre-wrap">
              {textMap['Verein_2']?.replace(/\\n/g, '\n') || 'Fehler'}
            </p>
          </div>

          {/* Right: Activities Image */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg aspect-[4/3] overflow-hidden shadow-lg rounded-xl">
              <img 
                src={img('Vereinstätigkeiten')} 
                className="w-full h-full object-cover grayscale-[15%] contrast-[105%] transition-transform duration-500 hover:scale-105" 
                alt="Vereinstätigkeiten" 
              />
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 3: PROFILE & PRESIDENT (Secondary Neutral Tint) --- */}
      <section className="bg-[var(--color-bg-sec2)] py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: President Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="w-full max-w-md aspect-[3/4] overflow-hidden shadow-lg rounded-xl">
              <img 
                src={img('Foto Präsidentin Profil')} 
                className="w-full h-full object-cover grayscale-[15%] contrast-[105%] transition-transform duration-500 hover:scale-105" 
                alt="Präsidentin Profil" 
              />
            </div>
          </div>

          {/* Right: President Info */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-widest bg-[var(--color-bg-hero)] px-3 py-1 rounded-full inline-block text-[var(--color-primary)]">
              {t('Titel Abschnitt 2', 'Fehler')}
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-[var(--color-primary)]">
              {t('Name', 'Fehler')}
            </h2>
            <p className="text-lg leading-loose opacity-80 max-w-xl whitespace-pre-wrap">
              {t('Beschreibung Präsidentin', 'Lorem ipsum dolor sit amet.')?.replace(/\\n/g, '\n')}
            </p>
          </div>

        </div>
      </section>

      {/* --- SECTION 4: QUALIFICATIONS (Light Warm Amber Tint) --- */}
      <section className="bg-[var(--color-bg-sec3)] py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Qualifications List */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-bg-sec2)] px-3 py-1 rounded-full inline-block">
              Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[var(--color-primary)] leading-tight">
              Qualifikationen & Erfahrung
            </h2>
          </div>

          {/* Right: Qualification Items */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-12 lg:pl-12">
            <div className="relative pt-4">
              <div className="text-xl font-medium text-[var(--color-primary)] relative z-10 pl-2">
                {t('Qualifikationen 1', 'Fehler')}
              </div>
            </div>
            
            <div className="relative pt-4">
              <div className="text-xl font-medium text-[var(--color-primary)] relative z-10 pl-2">
                {t('Qualifikationen 2', 'Fehler')}
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}