import { useEffect, useState, useCallback } from "react";
import pb from '../lib/pocketbase';
import { SmartText } from '../lib/SmartText';
interface TextRecord {
  title: string;
  text: string;
}

interface ImageRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  title: string;
  croppedImage: string;
}

export default function Offers() {
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
        acc[item.title] = pb.files.getUrl(item, item.croppedImage);
        return acc;
      }, {} as Record<string, string>);
      setImageMap(imageMapping);
    } catch (err: any) {
      if (err.isAbort) return;
      console.error("Error fetching offers assets:", err);
    }
  }, []);

  useEffect(() => {
    fetchWebsiteAssets();
  }, [fetchWebsiteAssets]);

  //Hilfsfunktionen für dynamische Inhalte
  const t = (key: string, fallback: string) => textMap[key] || fallback;
  const img = (key: string, fallbackUrl?: string) => imageMap[key] || fallbackUrl || "";

  return (
    <div className="text-[var(--color-fg)] min-h-screen font-sans mt-16 dynamic-theme-wrapper flex flex-col overflow-x-hidden">
{/* --- SECTION 0: HERO & GENERAL INFO (Muted Sage Background) --- */}
      <section className="bg-[var(--color-bg-sec2)] pt-20 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    {/* Right Column: Clean Vertical Image Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-center">
          {/* Changed aspect to square, rounded to full, removed background/heavy shadow colors to ensure transparency */}
          <div className="w-80 max-w-md aspect-square overflow-hidden rounded-full drop-shadow-md">
            <img 
              src={img('Titelbild Vereinsseite')} 
              className="w-full h-full object-contain grayscale-[15%] contrast-[105%] transition-transform duration-500 hover:scale-105" 
              alt="Präsidentin" 
            />
          </div>
        </div>
          {/* Left Column: Bold Asymmetric Typography */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-[var(--color-primary)] leading-tight max-w-2xl">
              <SmartText content={t('Willkommen', 'Lade Inhalt')} />
            </h1>
            
            <div className="space-y-6 max-w-xl pt-4">
              <div className="border-l-2 border-[var(--color-primary)] pl-6">
                <p className="text-lg leading-relaxed whitespace-pre-wrap opacity-90">
                  <SmartText content={t('Willkommen_untertext', 'Lade Inhalt')} />
                </p>
              </div>
            </div>
          </div>



        </div>
      </section>
      {/* SECTION 1: Tierkommunikation (Muted Sage) */}
      <section className="bg-[var(--color-bg-hero)] py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Optimized for long German words */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[var(--color-primary)] leading-tight break-words hyphens-auto">
              <SmartText content={t('Tierkommunikation_titel', 'Lade Inhalt')} />
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 whitespace-pre-wrap">
              <SmartText content={t('Tierkommunikation', 'Lade Inhalt')} collapsible={true} />
            </p>
          </div>
          {/* Left: President Image */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end order-2 lg:order-1">
            {/* Image Container */}
            <div className="w-full max-w-md aspect-[3/4] overflow-hidden shadow-lg rounded-xl">
              <img 
                src={img('Tierkommunikation')} 
                className="w-full h-full object-cover grayscale-[15%] contrast-[105%] transition-transform duration-500 hover:scale-105" 
                alt="Präsidentin Profil" 
              />
            </div>
            
            {/* Copyright Text */}
            <p className="text-gray-400 text-xs mt-2 text-center lg:text-right w-full max-w-md">
              © Claudia H-M Photography
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Bewusste spirituelle Begleitung (Clean Cream) */}
      <section className="bg-[var(--color-bg-sec1)] py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 lg:order-2 order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[var(--color-primary)] leading-tight break-words hyphens-auto">
              <SmartText content={t('spirituelle Begleitung_titel', 'Lade Inhalt')} />
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 whitespace-pre-wrap">
              <SmartText content={t('spirituelle Begleitung', 'Lade Inhalt')} collapsible={true} />
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-center lg:order-1 order-2">
            <div className="w-full max-w-md aspect-[4/3] overflow-hidden shadow-lg rounded-xl">
              <img
                src={img('spirituelle Begleitung')}
                className="w-full h-full object-cover grayscale-[15%] contrast-[105%] transition-transform duration-500 hover:scale-105"
                alt="Spirituelle Begleitung"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Energieharmonisierung (Light Warm Amber Tint) */}
      <section className="bg-[var(--color-bg-sec3)] py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Optimized for long German words */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[var(--color-primary)] leading-tight break-words hyphens-auto">
              <SmartText content={t('Energieharmonisierung_titel', 'Lade Inhalt')} />
            </h2>
            <p className="text-lg w-full md:text-xl font-light leading-relaxed opacity-90 whitespace-pre-wrap">
              <SmartText content={t('Energieharmonisierung', 'Lade Inhalt')} collapsible={true} />
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md aspect-[4/3] overflow-hidden shadow-lg rounded-xl">
              <img
                src={img('Energieharmonisierung')}
                className="w-full h-full object-cover grayscale-[15%] contrast-[105%] transition-transform duration-500 hover:scale-105"
                alt="Energieharmonisierung"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Workshops (Secondary Neutral Tint) */}
      <section className="bg-[var(--color-bg-sec2)] py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 lg:order-2 order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[var(--color-primary)] leading-tight break-words hyphens-auto">
              <SmartText content={t('Workshops_titel', 'Lade Inhalt')} />
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 whitespace-pre-wrap">
              <SmartText content={t('Workshops', 'Lade Inhalt')} collapsible={true} />
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-center lg:order-1 order-2">
            <div className="w-full max-w-md aspect-[4/3] overflow-hidden shadow-lg rounded-xl">
              <img
                src={img('Workshops')}
                className="w-full h-full object-cover grayscale-[15%] contrast-[105%] transition-transform duration-500 hover:scale-105"
                alt="Workshops"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}