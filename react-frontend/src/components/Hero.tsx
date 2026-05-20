import React, { useEffect, useState, useRef, useCallback } from 'react';
import pb from '../lib/pocketbase';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LandingRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  title: string;
  image: string;
  order: number;
}

interface HeroProps {
  textMap: Record<string, string>; // Receives centralized text layout object from Home
}

const INTERVAL_MS = 6000;
const TRANSITION_MS = 800;

const Hero: React.FC<HeroProps> = ({ textMap }) => {
  const [records, setRecords] = useState<LandingRecord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [sliding, setSliding] = useState(false);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Optimized fetching logic using standard strict-mode protection rules
  const fetchLandingData = useCallback(async () => {
    try {
      const data = await pb.collection('landing_pages').getFullList<LandingRecord>({ 
        sort: 'order',
        requestKey: null 
      });
      setRecords(data);
    } catch (err: any) {
      if (err.isAbort) return;
      console.error("Error loading landing images:", err);
    }
  }, []);

  useEffect(() => {
    fetchLandingData();
  }, [fetchLandingData]);

  const goTo = useCallback((next: number, dir: 'right' | 'left') => {
    if (sliding) return;

    if (timerRef.current) clearInterval(timerRef.current);

    setDirection(dir);
    setNextIndex(next);
    setSliding(true);

    setTimeout(() => {
      setCurrentIndex(next);
      setNextIndex(null);
      setSliding(false);
    }, TRANSITION_MS);
  }, [sliding]);

  useEffect(() => {
    if (records.length < 2) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % records.length;
        goTo(next, 'right');
        return prev;
      });
    }, INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [records, goTo]);

  const prev = () => {
    const next = (currentIndex - 1 + records.length) % records.length;
    goTo(next, 'left');
  };

  const next = () => {
    const n = (currentIndex + 1) % records.length;
    goTo(n, 'right');
  };

  const getUrl = (r: LandingRecord) => pb.files.getUrl(r, r.image);

  if (records.length === 0) {
    return <div className="flex h-screen items-center justify-center text-white">Loading...</div>;
  }

  const slideInFrom  = direction === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
  const slideOutTo   = direction === 'right' ? 'translateX(-100%)' : 'translateX(100%)';

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { transform: ${slideInFrom}; }
          to   { transform: translateX(0); }
        }
        @keyframes slideOut {
          from { transform: ${slideOutTo}; }
          to   { transform: ${slideOutTo}; }
        }
        .slide-in  { animation: slideIn  ${TRANSITION_MS}ms ease-in-out forwards; }
        .slide-out { animation: slideOut ${TRANSITION_MS}ms ease-in-out forwards; }
      `}</style>

      <div className="relative h-screen w-full overflow-hidden">
        <div
          key={`current-${currentIndex}`}
          className={`absolute inset-0 bg-cover bg-center ${sliding ? 'slide-out' : ''}`}
          style={{ backgroundImage: `url(${getUrl(records[currentIndex])})` }}
        />

        {nextIndex !== null && (
          <div
            key={`next-${nextIndex}`}
            className="absolute inset-0 bg-cover bg-center slide-in"
            style={{ backgroundImage: `url(${getUrl(records[nextIndex])})` }}
          />
        )}

        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* --- DYNAMIC OVERLAY CONTENT BOX --- */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-7xl max-w-5xl">
            {textMap['Start Text'] || 'Hast du dich schon mal gefragt, was dein Moser denkt?'}
          </h1>
          <p className="mb-8 max-w-2xl text-lg md:text-xl text-gray-200 whitespace-pre-wrap">
            {textMap['Untertitel'] || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi quam nostrum officia aliquam a ut dignissimos.'}
          </p>
        </div>

        {records.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-5 bottom-1/4 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="absolute right-5 bottom-1/4 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {records.length > 1 && (
          <div className="absolute bottom-10 z-30 flex gap-2 left-1/2 -translate-x-1/2">
            {records.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > currentIndex ? 'right' : 'left')}
                className="h-1.5 rounded-full bg-white transition-all duration-300"
                style={{ width: i === currentIndex ? '24px' : '6px', opacity: i === currentIndex ? 1 : 0.4 }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Hero;