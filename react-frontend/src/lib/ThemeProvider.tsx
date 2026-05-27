import { useEffect, useState } from 'react';
import pb from './pocketbase'; // Adjust the import path as needed
// Initialize PocketBase (replace with your actual server URL)
export default function ThemeProvider({   children}: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Create a controller to handle the component unmounting
    const controller = new AbortController();

    async function fetchThemeColors() {
      try {
        const records = await pb.collection('colors').getFullList({
          sort: '-created',
          // Pass the abort signal to PocketBase
          requestKey: 'theme-fetch', 
          signal: controller.signal,
        });

        const root = document.documentElement;

        records.forEach((record : { title: string; color: string }) => {
          if (record.title && record.color) {
            const variableName = record.title.startsWith('--') 
              ? record.title 
              : `--${record.title}`;
              
            root.style.setProperty(variableName, record.color);
          }
        });

        // Only stop loading if the request successfully finished
        setLoading(false);
      } catch (error) {
        // 2. Ignore PocketBase's autocancel or React's abort errors
        if (error instanceof Error && (error.name === 'AbortError')) {
          return; 
        }
        console.error('Error fetching theme colors:', error);
        setLoading(false);
      }
    }

    fetchThemeColors();

    // 3. Cleanup function: Runs when React Strict Mode unmounts the component
    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100 text-gray-500">
        Loading application theme...
      </div>
    );
  }

  return <>{children}</>;
}