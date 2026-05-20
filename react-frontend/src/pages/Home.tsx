import { useEffect, useState, useCallback } from "react";
import pb from '../lib/pocketbase';
import Hero from '../components/Hero';

interface TextRecord {
  title: string; // Used as the key (e.g., "feature_1_title")
  text: string;  // The actual dynamic text copy
}

export default function Home() {
  const [textMap, setTextMap] = useState<Record<string, string>>({});

  // Fetch text definitions using safe strict-mode requestKeys
  const fetchTextConfig = useCallback(async () => {
    try {
      const data = await pb.collection('texts').getFullList<TextRecord>({
        requestKey: null
      });
      
      // Transform array into a simple key-value object lookup dictionary
      const mapping = data.reduce((acc, item) => {
        acc[item.title] = item.text;
        return acc;
      }, {} as Record<string, string>);
      console.log(mapping)
      setTextMap(mapping);
    } catch (err: any) {
      if (err.isAbort) return;
      console.error("Error fetching dynamic text matrix:", err);
    }
  }, []);

  useEffect(() => {
    fetchTextConfig();
  }, [fetchTextConfig]);

  // Clean helper function to handle dynamic matching with fallback support
  const t = (key: string, fallback: string) => textMap[key] || fallback;

  return (
    <div className="bg-bg text-fg min-h-screen">
      {/* Pass text lookup down to Hero component to avoid duplicate queries */}
      <Hero textMap={textMap} />

      {/* --- SECTION 2: FEATURES --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            <div key={"Verein_1"} className="group p-8 rounded-3xl bg-fg/5 border border-fg/10 hover:border-primary/50 transition">
              <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center ${'bg-secondary'}`}>
                <div className="w-6 h-6 bg-bg rounded-sm" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Über den Verein
              </h3>
              <p className="text-fg/60 leading-relaxed whitespace-pre-wrap">
                {textMap['Verein_1'] || 'Fehler'}
              </p>
            </div>

            <div key={"Verein_2"} className="group p-8 rounded-3xl bg-fg/5 border border-fg/10 hover:border-primary/50 transition">
              <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center ${'bg-primary'}`}>
                <div className="w-6 h-6 bg-bg rounded-sm" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Unsere Vereinstätigkeiten
              </h3>
              <p className="text-fg/60 leading-relaxed whitespace-pre-wrap" style={{ whiteSpace: 'pre-wrap' }}>
                {textMap['Verein_2']?.replace(/\\n/g, '\n') || 'Fehler'}
              </p>
            </div>

                        <div key={"Verein_3"} className="group p-8 rounded-3xl bg-fg/5 border border-fg/10 hover:border-primary/50 transition">
              <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center ${'bg-secondary'}`}>
                <div className="w-6 h-6 bg-bg rounded-sm" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Über den Verein
              </h3>
              <p className="text-fg/60 leading-relaxed whitespace-pre-wrap">
                {textMap['Verein_3'] || 'Fehler'}
              </p>
            </div>


        </div>
      </section>

      {/* --- SECTION 3: BENTO BOX DISPLAY --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          {t('bento_main_title', 'Platform Showcase')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          <div className="md:col-span-2 bg-primary/20 rounded-3xl border border-primary/30 p-8 flex flex-col justify-end">
            <h4 className="text-primary text-2xl font-bold">
              {t('bento_box1_title', 'Integrated Logic')}
            </h4>
            <p className="text-fg/80">
              {t('bento_box1_desc', 'Lorem ipsum dolor sit amet consectetur.')}
            </p>
          </div>
          <div className="bg-secondary/20 rounded-3xl border border-secondary/30 p-8">
            <div className="h-full w-full bg-secondary/20 animate-pulse rounded-xl" />
          </div>
          <div className="bg-fg/5 rounded-3xl border border-fg/10 p-8">
             <span className="text-4xl font-black text-fg/20">01</span>
          </div>
          <div className="bg-fg/5 rounded-3xl border border-fg/10 p-8">
             <span className="text-4xl font-black text-fg/20">02</span>
          </div>
          <div className="md:col-span-3 bg-gradient-to-r from-primary to-secondary rounded-3xl p-1 flex items-center">
            <div className="bg-bg w-full h-full rounded-[22px] p-8 flex items-center justify-between">
               <h3 className="text-3xl font-bold">
                 {t('bento_hybrid_title', 'The Hybrid Experience')}
               </h3>
               <button className="bg-fg text-bg px-6 py-2 rounded-lg font-bold">
                 {t('bento_hybrid_btn', 'Explore')}
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: STATS --- */}
      <section className="bg-primary py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-black text-bg">{t('stat_1_num', '99%')}</div>
            <div className="text-bg/70 uppercase tracking-widest text-xs font-bold mt-2">{t('stat_1_lbl', 'Uptime')}</div>
          </div>
          <div>
            <div className="text-5xl font-black text-bg">{t('stat_2_num', '250k')}</div>
            <div className="text-bg/70 uppercase tracking-widest text-xs font-bold mt-2">{t('stat_2_lbl', 'Users')}</div>
          </div>
          <div>
            <div className="text-5xl font-black text-bg">{t('stat_3_num', '12ms')}</div>
            <div className="text-bg/70 uppercase tracking-widest text-xs font-bold mt-2">{t('stat_3_lbl', 'Latency')}</div>
          </div>
          <div>
            <div className="text-5xl font-black text-bg">{t('stat_4_num', 'Free')}</div>
            <div className="text-bg/70 uppercase tracking-widest text-xs font-bold mt-2">{t('stat_4_lbl', 'Open Source')}</div>
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
            "{t('philosophy_quote', 'Hoc est non modo cor non habere, sed ne palatum quidem. Non enim hanc solitudinem intellegere possumus.')}"
          </blockquote>
          <p>
            {t('philosophy_p2', 'Quid ad utilitatem tantae pecuniae? Videsne, ut quibus summa est in voluptate, hi cum solitudine aliquid etiam velle videantur? An vero displicuit ea, quae secundum naturam sunt?')}
          </p>
        </div>
      </section>
    </div>
  );
}