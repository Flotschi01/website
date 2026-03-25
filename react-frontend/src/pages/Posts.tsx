import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import PocketBase from "pocketbase";

interface Blog {
  id: string;
  title?: string;
  pictures?: string[]; // URLs for images
  md_content?: string;
}


const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const pb = new PocketBase(import.meta.env.VITE_PB_URL);
const hasFetchedRef = useRef(false);

useEffect(() => {
  if (!hasFetchedRef.current) {
    getPosts();
    hasFetchedRef.current = true;
  }
}, []);

const getPosts = async () => {
  try {
    console.log('All Env Vars:', import.meta.env);
    console.log("Loading projects..." + import.meta.env.VITE_PB_URL);
    const result = await pb.collection("blogs").getFullList<Blog>();
    setBlogs(result);
  } catch (err) {
    console.error("Failed loading projects", err);
  }
};

  const getImageUrl = (record: Blog, file?: string) => {
    return `${import.meta.env.VITE_PB_URL}/api/files/blogs/${record.id}/${file}`;
  };


  return (
    <div className="min-h-screen bg-bg text-fg p-6">
      <h1 className="text-4xl font-bold mb-10 text-primary">Blogs</h1>

      <div className="grid gap-8">
        {blogs.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl shadow-md bg-primary/10 border border-primary/20 p-5 hover:shadow-lg transition-shadow"
          >
            {p.pictures && p.pictures.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {p.pictures.map((image, idx) => (
                  <img
                    key={idx}
                    src={getImageUrl(p, image)}
                    alt={`${p.title} ${idx + 1}`}
                    className="rounded-lg"
                  />
                ))}
              </div>
            )}
            <br></br>
            <h1 className="text-4xl font-semibold mb-3 text-secondary">{p.title}</h1>

            <article className="prose prose-invert max-w-none">
              <div className="markdown-dark max-w-none">
                <ReactMarkdown>{p.md_content}</ReactMarkdown>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Blogs;
