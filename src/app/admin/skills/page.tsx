"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Code2, Loader2 } from "lucide-react";

interface SkillCategory {
  _id: string;
  category: string;
  skills: { name: string }[];
  order: number;
}

const emptyForm = {
  category: "",
  skillsText: "",
  order: 0,
};

export default function SkillsAdminPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/admin/skills");
      const data = await res.json();
      if (Array.isArray(data)) setCategories(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: SkillCategory) => {
    setEditingId(cat._id);
    setForm({
      category: cat.category,
      skillsText: cat.skills.map((s) => s.name).join(", "),
      order: cat.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category permanently?")) return;
    try {
      const res = await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (e) {
      alert("Failed to delete category");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const skillsArray = form.skillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({ name }));

    const payload = {
      category: form.category,
      skills: skillsArray,
      order: Number(form.order) || 0,
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/skills/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
      } else {
        const res = await fetch("/api/admin/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (e) {
      alert("Error saving category");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Technical Skills</h1>
          <p className="text-sm text-zinc-400 mt-1">Group your skills by categories (e.g. Frontend, Backend, Tools).</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12 text-zinc-500">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : categories.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl">
          <p className="text-sm text-zinc-400">No skill categories added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div key={cat._id} className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 text-zinc-100 font-semibold">
                  <Code2 className="w-4 h-4 text-zinc-400" />
                  {cat.category}
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleOpenEdit(cat)} className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded transition-colors cursor-pointer">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(cat._id)} className="p-1.5 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 rounded transition-colors cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 text-xs font-medium bg-zinc-950 border border-zinc-800 rounded-md text-zinc-300">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-lg font-semibold text-zinc-100 mb-4">
              {editingId ? "Edit Category" : "Add Skill Category"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Backend Technologies"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Skills (comma separated)</label>
                <textarea
                  rows={3}
                  required
                  value={form.skillsText}
                  onChange={(e) => setForm({ ...form, skillsText: e.target.value })}
                  placeholder="Node.js, Python, PostgreSQL, Redis"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Order Priority</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="px-5 py-2 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-medium rounded-lg disabled:opacity-50 cursor-pointer">
                  {saving ? "Saving..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}