import { useEffect, useState, useCallback } from "react";
import pb from '../lib/pocketbase';
import Hero from '../components/Hero';

interface TextRecord {
  title: string; 
  text: string;  
}

interface ImageRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  title: string; // Used as the key (e.g., "praesidentin_avatar")
  image: string; // The binary filename managed by PocketBase
}

export default function Home() {
  const [textMap, setTextMap] = useState<Record<string, string>>({});
  const [imageMap, setImageMap] = useState<Record<string, string>>({}); // 👈 Dictionary for image URLs

  // Fetch text & image matrices simultaneously
  const fetchWebsiteAssets = useCallback(async () => {
    try {
      const [textData, imageData] = await Promise.all([
        pb.collection('texts').getFullList<TextRecord>({ requestKey: null }),
        pb.collection('images').getFullList<ImageRecord>({ requestKey: null }) // 👈 Fetch from images collection
      ]);
      
      // 1. Map Text Copy
      const textMapping = textData.reduce((acc, item) => {
        acc[item.title] = item.text;
        return acc;
      }, {} as Record<string, string>);
      setTextMap(textMapping);

      // 2. Map Images directly to their full PocketBase CDN URLs
      const imageMapping = imageData.reduce((acc, item) => {
        // Automatically builds the absolute URL string for each key
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

  // Clean helper functions for mapping lookups with standard fallback recovery
  const t = (key: string, fallback: string) => textMap[key] || fallback;
  const img = (key: string, fallbackUrl?: string) => imageMap[key] || fallbackUrl || "";

  return (
    <div className="bg-bg text-fg min-h-screen">
      <Hero textMap={textMap} />

      {/* --- SECTION 2: FEATURES --- */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          {t('Titel Abschnitt 1', 'Fehler')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            <div key={"Verein_1"} className="group p-8 rounded-3xl bg-primary/60 border border-fg/10 hover:border-primary/50 transition">
              <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center ${'bg-secondary'}`}>
                <div className="w-6 h-6 bg-bg rounded-sm" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Allgemeines</h3>
              <p className="text-fg leading-relaxed whitespace-pre-wrap">
                {t('Verein_1', 'Fehler')}
              </p>
            </div>

            <div key={"Verein_2"} className="group p-8 rounded-3xl bg-secondary/60 border border-fg/10 hover:border-primary/50 transition">
              <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center ${'bg-primary'}`}>
                <div className="w-6 h-6 bg-bg rounded-sm" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Unsere Vereinstätigkeiten</h3>
              <p className="text-fg leading-relaxed whitespace-pre-wrap">
                {textMap['Verein_2']?.replace(/\\n/g, '\n') || 'Fehler'}
              </p>
            </div>
        </div>
      </section>

      {/* --- SECTION 3: BENTO BOX DISPLAY --- */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
  <h2 className="text-4xl font-bold mb-12 text-center">
    {t('Titel Abschnitt 2', 'Fehler')}
  </h2>
  {/* REMOVED auto-rows-[400px] and ADDED auto-rows-max */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-max">

    {/* Box 2: Image Content */}
    {/* ADDED h-full object-cover to the image to ensure it behaves within the flex container */}
    <div className="bg-fg/5 rounded-3xl border border-fg/10 overflow-hidden relative group flex flex-col">
      <img src={img('Foto Präsidentin')} className="w-full h-full object-cover" alt="Präsidentin" />
    </div>

    {/* Box 1: Text Content */}
    <div className="md:col-span-2 bg-primary/20 rounded-3xl border border-primary/30 p-8 flex flex-col justify-end">
      <h3 className="text-primary text-2xl font-bold">
        {t('Name', 'Fehler')}
      </h3>
      <p className="text-fg/80">
        {t('Beschreibung Präsidentin', 'Lorem ipsum dolor sit amet consectetur.')?.replace(/\\n/g, '\n')}
      </p>
    </div>

    <div className="bg-fg/5 rounded-3xl border border-fg/10 p-8">
       <span className="text-4xl font-black text-fg/20">01</span>
        <div className="text-2xl font-bold text-fg mt-4">
        {t('Qualifikationen 1', 'Fehler')}
        </div>
    </div>
    
    <div className="bg-fg/5 rounded-3xl border border-fg/10 p-8">
       <span className="text-4xl font-black text-fg/20">02</span>
        <div className="text-2xl font-bold text-fg mt-4">
         {t('Qualifikationen 2', 'Fehler')}
        </div>
    </div>
    
    {/* Hybrid Box */}
    {/* CHANGED h-full to self-stretch to handle dynamic content without collapsing */}
    <div className="md:col-span-3 bg-gradient-to-r from-primary to-secondary rounded-3xl p-1 flex items-center">
      <div className="bg-bg w-full h-full rounded-[22px] p-8 flex items-center justify-between">
          <h3 className="text-3xl font-bold">
            {t('Möglichkeiten Box', 'The Hybrid Experience')}
          </h3>
          <button className="bg-fg text-bg px-6 py-2 rounded-lg font-bold" onClick={() => window.location.href = '/offers'}>
            hier
          </button>
      </div>
    </div>
  </div>
</section>

      {/* --- SECTION 5: CONTENT HEAVY PHILOSOPHY --- */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">
          {t('philosophy_title', 'Detailed Philosophy')}
        </h2>
        <div className="space-y-6 text-lg text-fg/70 leading-loose whitespace-pre-wrap">
          <p>
            {t('philosophy_p1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Primum Theophrasti, Strato, physicum se voluit; in quo etsi est multum admodum fortunae, tamen est velit.')}
          </p>
          <blockquote className="border-l-4 border-secondary pl-6 py-2 italic text-fg">
            "{t('philosophy_quote', 'Hoc ist non modo cor non habere, sed ne palatum quidem. Non enim hanc solitudinem intellegere possumus.')}"
          </blockquote>
          <p>
            {t('philosophy_p2', 'Quid ad utilitatem tantae pecuniae? Videsne, ut quibus summa est in voluptate, hi cum solitudine aliquid etiam velle videantur? An vero displicuit ea, quae secundum naturam sunt?')}
          </p>
        </div>
      </section>
    </div>
  );
}