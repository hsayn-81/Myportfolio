"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Briefcase, GraduationCap, Loader2 } from "lucide-react";

interface ExpItem {
  _id: string;
  company: string;
  role: string;
  location?: string;
  type: "work" | "education";
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  skills: string[];
  order: number;
}

const emptyForm = {
  company: "",
  role: "",
  location: "",
  type: "work" as "work" | "education",
  startDate: "",
  endDate: "Present",
  current: false,
  descriptionText: "",
  skillsText: "",
  order: 0,
};

export default function ExperienceAdminPage() {
  const [items, setItems] = useState<ExpItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/experience");
      const data = await res.json();
      if (Array.isArray(data)) setItems(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ExpItem) => {
    setEditingId(item._id);
    setForm({
      company: item.company,
      role: item.role,
      location: item.location || "",
      type: item.type,
      startDate: item.startDate,
      endDate: item.endDate || "Present",
      current: item.current || false,
      descriptionText: (item.description || []).join("\n"),
      skillsText: (item.skills || []).join(", "),
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    try {
      const res = await fetch(`/api/admin/experience/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (e) {
      alert("Failed to delete entry from database");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      company: form.company,
      role: form.role,
      location: form.location,
      type: form.type,
      startDate: form.startDate,
      endDate: form.current ? "Present" : form.endDate,
      current: form.current,
      description: form.descriptionText.split("\n").map((s) => s.trim()).filter(Boolean),
      skills: form.skillsText.split(",").map((s) => s.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };

    try {
      if (editingId) {
        await fetch(`/api/admin/experience/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/admin/experience", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (e) {
      alert("Error saving item");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Work Experience & Education</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage career timeline, degrees, and milestones.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Entry
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12 text-zinc-500">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl">
          <p className="text-sm text-zinc-400">No experience or education added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item._id} className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {item.type === "work" ? (
                    <span className="p-1.5 rounded bg-zinc-800 text-emerald-400 border border-zinc-700">
                      <Briefcase className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="p-1.5 rounded bg-zinc-800 text-sky-400 border border-zinc-700">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <h3 className="font-semibold text-zinc-100 text-sm">{item.role}</h3>
                  <span className="text-zinc-500 text-xs">•</span>
                  <span className="text-zinc-300 text-sm font-medium">{item.company}</span>
                </div>

                <div className="text-xs text-zinc-400 font-mono">
                  {item.startDate} — {item.current ? "Present" : item.endDate} {item.location ? `| ${item.location}` : ""}
                </div>

                {item.description && item.description.length > 0 && (
                  <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1 pt-1">
                    {item.description.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {item.skills && item.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.skills.map((s) => (
                      <span key={s} className="text-[10px] font-mono bg-zinc-950 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-1.5 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-lg font-semibold text-zinc-100 mb-4">
              {editingId ? "Edit Timeline Entry" : "Add Timeline Entry"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none"
                >
                  <option value="work">Work Experience</option>
                  <option value="education">Education & Degree</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Role / Degree Title</label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Senior Backend Engineer"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Company / University</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Start Date</label>
                  <input
                    type="text"
                    required
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    placeholder="e.g. Jan 2022"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">End Date</label>
                  <input
                    type="text"
                    disabled={form.current}
                    value={form.current ? "Present" : form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    placeholder="e.g. Dec 2023"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 disabled:opacity-50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Remote / Beirut"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="current"
                  checked={form.current}
                  onChange={(e) => setForm({ ...form, current: e.target.checked })}
                  className="rounded bg-zinc-950 border-zinc-800 cursor-pointer"
                />
                <label htmlFor="current" className="text-xs text-zinc-300 cursor-pointer">
                  I currently work or study here
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Bullet points / Achievements (One per line)</label>
                <textarea
                  rows={3}
                  value={form.descriptionText}
                  onChange={(e) => setForm({ ...form, descriptionText: e.target.value })}
                  placeholder="• Spearheaded backend architecture rewrite&#10;• Led a team of 4 developers"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Relevant Skills (comma separated)</label>
                <input
                  type="text"
                  value={form.skillsText}
                  onChange={(e) => setForm({ ...form, skillsText: e.target.value })}
                  placeholder="Node.js, Docker, Kubernetes"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none"
                />
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
                  {saving ? "Saving..." : "Save Entry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}