"use client";

import { useEffect, useState } from "react";
import { ExternalLink, X, Star, ArrowLeft, ArrowRight } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  bullets: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  galleryUrls?: string[];
  featured: boolean;
  order: number;
}

export default function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (activeProject) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeProject]);

  if (!projects || projects.length === 0) return null;

  const getCover = (p: ProjectItem) =>
    p.imageUrl || (p.galleryUrls && p.galleryUrls[0]) || "";

  const getGallery = (p: ProjectItem) => {
    const imgs: string[] = [];
    if (p.imageUrl) imgs.push(p.imageUrl);
    if (p.galleryUrls?.length) {
      p.galleryUrls.forEach((url) => {
        if (!imgs.includes(url)) imgs.push(url);
      });
    }
    return imgs;
  };

  return (
    <section id="projects" className="py-20 sm:py-28 relative overflow-hidden bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
              Selected Works
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-mono tracking-tight text-[#e5d2b8] uppercase">
              Featured Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm font-sans">
            Click any project to open the full case study and gallery.
          </p>
        </div>

        {/* COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, idx) => {
            const coverImg = getCover(project);

            return (
              <button
                key={project._id}
                type="button"
                onClick={() => setActiveProject(project)}
                className="group text-left cursor-pointer"
              >
                {/* Image container: full image, no forced center zoom */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#0f0f12] shadow-2xl transition-all duration-500 group-hover:border-[#c5a880]/40 group-hover:shadow-[0_20px_50px_rgba(197,168,128,0.08)]">
                  {coverImg ? (
                    <div className="absolute inset-0 flex items-center justify-center p-3">
                      <img
                        src={coverImg}
                        alt={project.title}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.015]"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-xs">
                      No Image
                    </div>
                  )}

                  {/* hover overlay */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-4">
                    <span className="text-[10px] font-mono text-[#e5d2b8] tracking-widest uppercase">
                      View Case
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#e5d2b8]" />
                  </div>

                  {project.featured && (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] font-mono bg-black/70 border border-amber-500/30 text-amber-300 px-2 py-1 rounded-full backdrop-blur-sm">
                      <Star className="w-3 h-3 fill-amber-300" /> Featured
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div className="mt-4 px-1">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className="text-[10px] font-mono text-[#c5a880]">
                      [{String(idx + 1).padStart(2, "0")}]
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600 truncate">
                      {project.techStack.slice(0, 2).join(" • ")}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-mono text-zinc-100 uppercase tracking-tight group-hover:text-[#e5d2b8] transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500 line-clamp-2 font-sans">
                    {project.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* DETAILS VIEW */}
      {activeProject && (
        <div className="fixed inset-0 z-[100] bg-[#0a0a0a]">
          <div className="absolute top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
            <button
              onClick={() => setActiveProject(null)}
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#e5d2b8] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Project Details
            </span>
            <button
              onClick={() => setActiveProject(null)}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="h-full pt-12 grid grid-cols-1 lg:grid-cols-12">
            {/* LEFT gallery */}
            <div className="lg:col-span-7 h-full overflow-y-auto px-4 sm:px-8 py-6 space-y-8 [scrollbar-width:thin]">
              {getGallery(activeProject).length > 0 ? (
                getGallery(activeProject).map((img, idx) => (
                  <div
                    key={idx}
                    className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-[#111113] shadow-lg flex items-center justify-center"
                  >
                    <img
                      src={img}
                      alt={`${activeProject.title} ${idx + 1}`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))
              ) : (
                <div className="h-64 rounded-xl border border-dashed border-zinc-800 flex items-center justify-center text-zinc-600 text-xs font-mono">
                  No gallery images
                </div>
              )}
            </div>

            {/* RIGHT details */}
            <div className="lg:col-span-5 h-full border-t lg:border-t-0 lg:border-l border-white/10 bg-[#111113] overflow-y-auto">
              <div className="lg:sticky lg:top-12 p-5 sm:p-8 space-y-6">
                {activeProject.featured && (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-amber-400" /> Featured
                  </span>
                )}

                <div>
                  <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#e5d2b8] uppercase leading-none">
                    {activeProject.title}
                  </h1>
                  <p className="mt-4 text-sm text-zinc-300 leading-relaxed font-sans">
                    {activeProject.description}
                  </p>
                </div>

                {activeProject.techStack?.length > 0 && (
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                      Technologies
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] font-mono bg-black border border-white/10 text-zinc-300 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeProject.bullets?.length > 0 && (
                  <div>
                    <div className="text-[10px] font-mono text-[#c5a880] uppercase tracking-widest mb-2">
                      Key Features
                    </div>
                    <ul className="space-y-2">
                      {activeProject.bullets.map((b, i) => (
                        <li key={i} className="text-xs sm:text-sm text-zinc-300 flex gap-2 font-sans">
                          <span className="text-[#c5a880] font-mono">›</span>
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e5d2b8] hover:bg-white text-zinc-950 font-bold text-xs rounded-full transition-all shadow-lg"
                    >
                      Live Demo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-medium text-xs rounded-full transition-colors"
                    >
                      <GithubIcon /> Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}