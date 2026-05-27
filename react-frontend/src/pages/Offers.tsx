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
        acc[item.title] = pb.files.getUrl(item, item.image);
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

  // Hilfsfunktionen für dynamische Inhalte
  const t = (key: string, fallback: string) => textMap[key] || fallback;
  const img = (key: string, fallbackUrl?: string) => imageMap[key] || fallbackUrl || "";

  return (
    <div className="text-[var(--color-fg)] min-h-screen font-sans mt-16 dynamic-theme-wrapper flex flex-col">

      {/* SECTION 1: Tierkommunikation (Muted Sage) */}
      <section className="bg-[var(--color-bg-hero)] py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-bg-sec2)] px-3 py-1 rounded-full inline-block">
              Angebot 01
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[var(--color-primary)] leading-tight">
              {t('offer_1_title', 'Tierkommunikation')}
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 whitespace-pre-wrap">
              {t('Tierkommunikation', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')}
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md aspect-[4/3] overflow-hidden shadow-lg rounded-xl">
              <img
                src={img('Tierkommunikation')}
                className="w-full h-full object-cover grayscale-[15%] contrast-[105%] transition-transform duration-500 hover:scale-105"
                alt="Tierkommunikation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Bewusste spirituelle Begleitung (Clean Cream) */}
      <section className="bg-[var(--color-bg-sec1)] py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 lg:order-2 order-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-bg-sec2)] px-3 py-1 rounded-full inline-block">
              Angebot 02
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[var(--color-primary)] leading-tight">
              {t('offer_2_title', 'Bewusste spirituelle Begleitung für alle Geschöpfe')}
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 whitespace-pre-wrap">
              {t('spirituelle Begleitung', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')}
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
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-bg-sec2)] px-3 py-1 rounded-full inline-block">
              Angebot 03
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[var(--color-primary)] leading-tight">
              {t('offer_3_title', 'Energieharmonisierung für Raum und Stall')}
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 whitespace-pre-wrap">
              {t('Energieharmonisierung', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.')}
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
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-bg-hero)] px-3 py-1 rounded-full inline-block">
              Angebot 04
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[var(--color-primary)] leading-tight">
              {t('offer_4_title', 'Workshops & Seminare')}
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 whitespace-pre-wrap">
              {t('Workshops', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.')}
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