import { useEffect, useState, useCallback } from "react";
import pb from "../lib/pocketbase";

interface FlyerRecord {
  id: string;
  title: string;
  description: string;
  image: string;
  created: string;
  collectionId: string;
}

export default function News() {
  const [flyers, setFlyers] = useState<FlyerRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFlyers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await pb.collection("flyers").getFullList<FlyerRecord>({
        sort: "-created",
        requestKey: null,
      });
      setFlyers(data);
    } catch (err: any) {
      if (err.isAbort) return;
      console.error("Error fetching News:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlyers();
  }, [fetchFlyers]);

  return (
    <div className="text-[var(--color-fg)] mt-16  min-h-screen font-sans dynamic-theme-wrapper">
      
      {/* --- HERO / HEADER SECTION (Muted Sage Background) --- */}
      <section className="bg-[var(--color-bg-hero)] pt-20 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">

            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-[var(--color-primary)] leading-tight">
              Aktuelles & Flyer
            </h1>
            <p className="text-lg leading-relaxed opacity-90 mt-6 whitespace-pre-wrap max-w-2xl">
              Unsere aktuellen Ankündigungen, Veranstaltungen und Flyer zum Download.
            </p>
          </div>
        </div>
      </section>

      {/* --- FLYERS GRID SECTION (Clean Cream Background) --- */}
      <section className="bg-[var(--color-bg-sec1)] py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          
          {loading ? (
            /* Loading State skeleton matching Home page aesthetic */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-3xl bg-[var(--color-bg-sec2)] border border-[var(--color-fg)]/10 p-6 h-[450px] animate-pulse">
                  <div className="bg-[var(--color-fg)]/10 w-full aspect-[4/3] rounded-2xl mb-4" />
                  <div className="bg-[var(--color-fg)]/10 h-6 w-3/4 rounded mb-2" />
                  <div className="bg-[var(--color-fg)]/10 h-4 w-1/2 rounded" />
                </div>
              ))}
            </div>
          ) : flyers.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20 rounded-3xl bg-[var(--color-bg-sec2)] border border-[var(--color-fg)]/10 max-w-2xl mx-auto">
              <p className="text-[var(--color-fg)]/60 text-lg whitespace-pre-wrap">
                Momentan liegen keine aktuellen Flyer vor.
              </p>
            </div>
          ) : (
            /* Populated Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {flyers.map((flyer) => (
                <article 
                  key={flyer.id} 
                  className="group rounded-3xl bg-[var(--color-bg-sec2)] border border-[var(--color-fg)]/10 hover:border-[var(--color-primary)]/50 transition overflow-hidden flex flex-col h-full"
                >
                  {/* Visual Image Container */}
                  {flyer.image && (
                    <div className="overflow-hidden bg-[var(--color-bg-hero)] relative aspect-[4/3] border-b border-[var(--color-fg)]/10">
                      <img
                        src={pb.files.getUrl(flyer, flyer.image)}
                        alt={flyer.title}
                        className="w-full h-full object-cover grayscale-[15%] contrast-[105%] group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Content Box */}
                  <div className="p-8 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-2xl font-light mb-4 tracking-tight text-[var(--color-primary)] group-hover:text-[var(--color-primary)] transition">
                        {flyer.description}
                      </h3>
                    </div>

                    {/* Download Button - styled to match Home page button patterns */}
                    <div className="mt-8 pt-4 border-t border-[var(--color-fg)]/5 flex justify-end">
                      <a 
                        href={pb.files.getUrl(flyer, flyer.image)}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[var(--color-fg)] text-[var(--color-bg-hero)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-bg-hero)] px-5 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition flex items-center gap-2"
                      >
                        Ansehen / Download
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}