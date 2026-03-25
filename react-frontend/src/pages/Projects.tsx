import { useEffect, useState, useRef } from "react";
import PocketBase from "pocketbase";
import ReactMarkdown from "react-markdown";

interface ProjectRecord {
  id: string;
  Title: string;
  MarkdownContent: string;
  Image?: string[];
  ProjectID?: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const pb = new PocketBase(import.meta.env.VITE_PB_URL);
const hasFetchedRef = useRef(false);

useEffect(() => {
  if (!hasFetchedRef.current) {
    fetchProjects();
    hasFetchedRef.current = true;
  }
}, []);

const fetchProjects = async () => {
  try {
    console.log("Loading projects..." + import.meta.env.VITE_PB_URL);
    const result = await pb.collection("projects").getFullList<ProjectRecord>({
      sort: "ProjectID"
    });
    setProjects(result);
  } catch (err) {
    console.error("Failed loading projects", err);
  }
};

  const getImageUrl = (record: ProjectRecord, file: string) => {
    return `${import.meta.env.VITE_PB_URL}/api/files/projects/${record.id}/${file}`;
  };

  return (
    <div className="min-h-screen bg-bg text-fg p-6">
      <h1 className="text-4xl font-bold mb-10 text-secondary">Projects</h1>

      <div className="grid gap-8">
        {projects.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl shadow-md bg-secondary/10 border border-primary/20 p-5 hover:shadow-lg transition-shadow"
          >

            {p.Image && p.Image.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {p.Image.map((image, idx) => (
                  <img
                    key={idx}
                    src={getImageUrl(p, image)}
                    alt={`${p.Title} ${idx + 1}`}
                    className="rounded-lg"
                  />
                ))}
              </div>
            )}
            <br></br>
            <h1 className="text-4xl font-semibold mb-3 text-primary">{p.Title}</h1>

            <article className="prose prose-invert max-w-none">
              <div className="markdown-dark max-w-none">
                <ReactMarkdown>{p.MarkdownContent}</ReactMarkdown>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
