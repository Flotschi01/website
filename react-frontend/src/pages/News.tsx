import { useEffect, useState, useCallback } from "react";
import pb from "../lib/pocketbase"; // Adjust this path to your pocketbase instance

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

  // 1. SAFE FETCH LOGIC: Utilizes requestKey: null to safely bypass React StrictMode duplicate calls
  const fetchFlyers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await pb.collection("flyers").getFullList<FlyerRecord>({
        sort: "-created",
        requestKey: null, // Prevents auto-cancellation errors
      });
      setFlyers(data);
    } catch (err: any) {
      if (err.isAbort) return; // Safely ignore react-instigated aborts
      console.error("Error fetching News:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlyers();
  }, [fetchFlyers]);

  return (
    <div className="bg-bg text-fg min-h-screen">
      {/* --- HERO / HEADER SECTION --- */}
      <section className="pt-24 pb-12 px-6 max-w-7xl mx-auto text-center">
        <span className="text-primary uppercase tracking-widest text-xs font-bold bg-primary/10 px-3 py-1 rounded-full">
          Updates & Events
        </span>
        <h1 className="text-5xl md:text-6xl font-black mt-4 mb-6 tracking-tight">
          Aktuelles & Flyer
        </h1>
        <p className="text-fg/60 max-w-2xl mx-auto text-lg leading-relaxed">
          Bleiben Sie auf dem Laufenden mit unseren neuesten Ankündigungen, 
          Veranstaltungen und aktuellen Flyern zum Download.
        </p>
      </section>

      {/* --- FLYERS GRID SECTION --- */}
      <section className="py-12 px-6 max-w-7xl mx-auto mb-24">
        {loading ? (
          /* Loading State skeleton matching Bento/Feature styling */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-3xl bg-fg/5 border border-fg/10 p-4 h-[450px] animate-pulse">
                <div className="bg-fg/10 w-full h-64 rounded-2xl mb-4" />
                <div className="bg-fg/10 h-6 w-3/4 rounded mb-2" />
                <div className="bg-fg/10 h-4 w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : flyers.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 rounded-3xl bg-fg/5 border border-fg/10 max-w-2xl mx-auto">
            <p className="text-fg/60 text-lg">Momentan liegen keine aktuellen Flyer vor.</p>
          </div>
        ) : (
          /* Populated Grid Matching Feature/Bento styles */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flyers.map((flyer) => (
              <article 
                key={flyer.id} 
                className="group rounded-3xl bg-fg/5 border border-fg/10 hover:border-primary/50 transition overflow-hidden flex flex-col h-full"
              >
                {/* Visual Image Container */}
                {flyer.image && (
                  <div className="overflow-hidden bg-bg relative aspect-[4/3] border-b border-fg/10">
                    <img
                      src={`${pb.baseUrl}/api/files/${flyer.collectionId}/${flyer.id}/${flyer.image}`}
                      alt={flyer.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Content Box */}
                <div className="p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-2">
                      {new Date(flyer.created).toLocaleDateString("de-DE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight text-fg group-hover:text-primary transition">
                      {flyer.title}
                    </h3>
                    <p className="text-fg/70 leading-relaxed line-clamp-4 whitespace-pre-wrap">
                      {flyer.description}
                    </p>
                  </div>

                  {/* Optional action element styled like Section 3 Button */}
                  <div className="mt-8 pt-4 border-t border-fg/5 flex justify-end">
                    <a 
                      href={`${pb.baseUrl}/api/files/${flyer.collectionId}/${flyer.id}/${flyer.image}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-fg text-bg group-hover:bg-primary group-hover:text-white px-5 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2"
                    >
                      Ansehen / Download
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}