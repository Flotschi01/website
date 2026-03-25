
import { useEffect, useState, useRef } from "react";
import PocketBase from "pocketbase";

interface ProjectRecord {
  id: string;
  Title: string;
  description: string;
  MarkdownContent: string;
  Image?: string[];
  ProjectID?: number;
}
interface Blog {
  id: string;
  title?: string;
  description: string;
  pictures?: string[]; // URLs for images
  md_content?: string;
}


export default function Home() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
const hasFetchedRefProject = useRef(false);
const hasFetchedRefBlog = useRef(false);


  const pb = new PocketBase(import.meta.env.VITE_PB_URL);

useEffect(() => {
  if (!hasFetchedRefProject.current) {
    fetchProjects();
    hasFetchedRefProject.current = true;
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


useEffect(() => {
  if (!hasFetchedRefBlog.current) {
    getPosts();
    hasFetchedRefBlog.current = true;
  }
}, []);

const getPosts = async () => {
  try {
    console.log("Loading projects..." + import.meta.env.VITE_PB_URL);
    const result = await pb.collection("blogs").getFullList<Blog>();
    setBlogs(result);
  } catch (err) {
    console.error("Failed loading projects", err);
  }
};

  return (
    <div className="bg-bg text-fg min-h-screen">

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-primary">
          Welcome to MySite
        </h1>

        <p className="text-xl max-w-2xl mx-auto mb-10 text-fg/80">
          A place where I share my projects, and ideas.
          The website is built with React, TypeScript, and Tailwind CSS. 
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/projects"
            className="
              px-6 py-3 rounded-lg font-medium 
              bg-primary text-bg
              hover:bg-secondary
              transition-colors
            "
          >
            View Projects
          </a>

          <a
            href="/posts"
            className="
              px-6 py-3 rounded-lg font-medium 
              border border-primary 
              text-primary
              hover:text-secondary hover:border-secondary
              transition-colors
            "
          >
            Read Posts
          </a>
        </div>
        
      </section>  
            <section className="max-w-5xl mx-auto px-4 py-20 border-t border-fg/10 text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-secondary">
          For Firends and Family
        </h1>

        <p className="text-xl max-w-2xl mx-auto mb-10 text-fg/80">
          Hier findet ihr die Links zu Nextcloud, Jellyfin und Co!<br></br>
          Benutzer sind immer vorname in klein
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="https://nextcloud.lehmsys.com"
            className="
              px-6 py-3 rounded-lg font-medium 
              border border-sky-600 
              text-sky-600
              hover:text-sky-800 hover:border-sky-800
              transition-colors
            "
          >
            To Nextcloud
            <img src="nextcloud.svg" alt="Nextcloud" className="inline-block w-5 h-5 ml-2" />
          </a>

          <a
            href="https://jellyfin.lehmsys.com"
            className="
              px-6 py-3 rounded-lg font-medium 
              border border-violet-500 
              text-violet-500
              hover:text-violet-700 hover:border-violet-700
              transition-colors
            "
          >
            To Jellyfin
            <img src="jellyfin.webp" alt="Jellyfin" className="inline-block w-5 h-5 ml-2" />
          </a>
        </div>
        
      </section>

      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid gap-8 md:grid-cols-3">

<div className="p-6 rounded-xl shadow border border-fg/10 bg-bg">
  {projects.length > 0 && (
    (() => {
      const p = projects[Math.random() * projects.length | 0]; // Randomly select a project
      // Optional: clean up markdown or truncate for a short snippet
      const description = p.description

      return (
        <div key={p.id}>
          {/* Project Title */}
          <h3 className="text-2xl font-bold text-primary mb-3">
            {p.Title}
          </h3>

          {/* Project Snippet */}
          <p className="mb-4 text-fg/80 line-clamp-3">
            {description}
          </p>

          {/* Link to the specific project or the main gallery */}
          <a
            href={`/projects`}
            className="text-secondary font-medium hover:underline"
          >
            View Project Details →
          </a>
        </div>
      );
    })()
  )}
</div>
<div className="p-6 rounded-xl shadow border border-fg/10 bg-bg">
  {blogs.length > 0 && (
    (() => {
      const p = blogs[Math.random() * blogs.length | 0]; // Randomly select a blog post
      // Optional: clean up markdown or truncate for a short snippet
      const description = p.description
      return (
        <div key={p.id}>
          {/* Project Title */}
          <h3 className="text-2xl font-bold text-primary mb-3">
            {p.title}
          </h3>

          {/* Project Snippet */}
          <p className="mb-4 text-fg/80 line-clamp-3">
            {description}
          </p>

          {/* Link to the specific project or the main gallery */}
          <a
            href={`/posts`}
            className="text-secondary font-medium hover:underline"
          >
            View Blog Post →
          </a>
        </div>
      );
    })()
  )}
</div>

        <div className="p-6 rounded-xl shadow border border-fg/10 bg-bg">
          <h3 className="text-2xl font-bold text-primary mb-3">
            About Me
          </h3>
          <p className="mb-4 text-fg/80">
            Learn more about my background, experience, interests
          </p>
          <a
            href="/cv"
            className="text-secondary font-medium hover:underline"
          >
            My Cv →
          </a>
        </div>

      </section>


    </div>
  );
}
