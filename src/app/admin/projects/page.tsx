"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, ExternalLink, Star, Loader2 } from "lucide-react";
import FileUpload from "@/components/admin/FileUpload";
import MultiFileUpload from "@/components/admin/MultiFileUpload";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
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
  galleryUrls?: string[]; // الحقل الجديد للمعرض
  featured: boolean;
  order: number;
}

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  bulletsText: "",
  techStackText: "",
  liveUrl: "",
  githubUrl: "",
  imageUrl: "",
  galleryUrls: [] as string[], // تهيئة المصفوفة
  featured: false,
  order: 0,
};

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (Array.isArray(data)) setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingId(project._id);
    setForm({
      title: project.title,
      slug: project.slug,
      description: project.description,
      bulletsText: (project.bullets || []).join("\n"),
      techStackText: (project.techStack || []).join(", "),
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      imageUrl: project.imageUrl || "",
      galleryUrls: project.galleryUrls || [], // سحب الصور المحفوظة
      featured: project.featured || false,
      order: project.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: form.description,
      bullets: form.bulletsText.split("\n").map((s) => s.trim()).filter(Boolean),
      techStack: form.techStackText.split(",").map((s) => s.trim()).filter(Boolean),
      liveUrl: form.liveUrl,
      githubUrl: form.githubUrl,
      imageUrl: form.imageUrl,
      galleryUrls: form.galleryUrls, // إرسال المعرض للداتابيز
      featured: form.featured,
      order: Number(form.order) || 0,
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
      } else {
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (e) {
      alert("Error saving project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects Management</h1>
          <p className="text-sm text-zinc-400 mt-1">Add, edit, and organize portfolio projects and case studies.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12 text-zinc-500">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl">
          <p className="text-sm text-zinc-400">No projects added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project._id} className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-zinc-100">{project.title}</h3>
                    {project.featured && (
                      <span className="flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-amber-400" /> Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{project.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-1.5 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {project.imageUrl && (
                <div className="w-full h-36 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* عرض عدد صور المعرض إذا كانت موجودة */}
              {project.galleryUrls && project.galleryUrls.length > 0 && (
                <div className="text-[10px] text-zinc-500 font-mono">
                  + {project.galleryUrls.length} Gallery Images
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-[11px] font-mono bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded text-zinc-300">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs text-zinc-500 font-mono">
                <span>Order: {project.order}</span>
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-zinc-300 flex items-center gap-1">
                      <GithubIcon /> repo
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-zinc-300 flex items-center gap-1">
                      <ExternalLink className="w-3.5 h-3.5" /> demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-lg font-semibold text-zinc-100 mb-4">
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Slug (optional)</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="e.g. cloud-monitoring-tool"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Brief Description</label>
                <textarea
                  rows={2}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  required
                  value={form.techStackText}
                  onChange={(e) => setForm({ ...form, techStackText: e.target.value })}
                  placeholder="Next.js, TypeScript, PostgreSQL, Tailwind CSS"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Key Highlights / Bullets (One per line)</label>
                <textarea
                  rows={3}
                  value={form.bulletsText}
                  onChange={(e) => setForm({ ...form, bulletsText: e.target.value })}
                  placeholder="• Reduced API latency by 40% with caching&#10;• Implemented role-based access control"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Live URL</label>
                  <input
                    type="url"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              {/* 1. رفع الصورة الرئيسية */}
              <FileUpload
                endpoint="imageUploader"
                label="Cover Image (صورة الغلاف الرئيسية)"
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
              />

              {/* 2. رفع صور المعرض (تصل لـ 10 صور) */}
              <MultiFileUpload
                endpoint="galleryUploader"
                label="Gallery Images (صور داخلية للتفاصيل)"
                values={form.galleryUrls}
                onChange={(urls) => setForm({ ...form, galleryUrls: urls })}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Order Priority</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="rounded bg-zinc-950 border-zinc-800 cursor-pointer"
                  />
                  <label htmlFor="featured" className="text-xs text-zinc-300 font-medium cursor-pointer">
                    Feature this project on top
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-medium rounded-lg disabled:opacity-50 cursor-pointer"
                >
                  {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}