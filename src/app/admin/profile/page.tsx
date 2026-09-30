"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, CheckCircle2 } from "lucide-react";
import FileUpload from "@/components/admin/FileUpload";

export default function ProfileAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    tagline: "",
    about: "",
    avatarUrl: "",
    heroBgUrl: "",
    resumeUrl: "",
    email: "",
    phone: "",
    location: "",
    status: "",
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
    },
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/admin/profile");
        const data = await res.json();
        if (data && data._id) {
          setFormData({
            fullName: data.fullName || "",
            title: data.title || "",
            tagline: data.tagline || "",
            about: data.about || "",
            avatarUrl: data.avatarUrl || "",
            heroBgUrl: data.heroBgUrl || "",
            resumeUrl: data.resumeUrl || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
            status: data.status || "",
            socialLinks: {
              github: data.socialLinks?.github || "",
              linkedin: data.socialLinks?.linkedin || "",
              twitter: data.socialLinks?.twitter || "",
              website: data.socialLinks?.website || "",
            },
          });
        }
      } catch (err: any) {
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("social_")) {
      const socialKey = name.replace("social_", "");
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save profile changes");

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-500">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile & Hero Details</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Control your name, headline, bio, avatar, background, phone, and resume.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Profile updated successfully!
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-950/50 border border-red-800 text-red-300 text-xs rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
          <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-2">
            Basic Info
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Primary Title / Role</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Full-Stack Software Engineer"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Hero Tagline</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              required
              placeholder="e.g. Building scalable web applications and distributed systems."
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">About / Bio</label>
            <textarea
              name="about"
              rows={4}
              value={formData.about}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Status Badge</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="e.g. Available for opportunities"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Beirut, Lebanon"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Direct Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+961 70 000 000"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>
        </div>

        {/* Media Uploads */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-6">
          <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-2">
            Media & Documents
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FileUpload
              endpoint="imageUploader"
              label="1. Person PNG Cutout (remove.bg)"
              value={formData.avatarUrl}
              onChange={(url) => setFormData((prev) => ({ ...prev, avatarUrl: url }))}
            />

            <FileUpload
              endpoint="imageUploader"
              label="2. Studio Background Image"
              value={formData.heroBgUrl}
              onChange={(url) => setFormData((prev) => ({ ...prev, heroBgUrl: url }))}
            />

            <FileUpload
              endpoint="resumeUploader"
              label="3. Resume PDF Document"
              value={formData.resumeUrl}
              onChange={(url) => setFormData((prev) => ({ ...prev, resumeUrl: url }))}
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
          <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-2">
            Social & External Profiles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">GitHub URL</label>
              <input
                type="url"
                name="social_github"
                value={formData.socialLinks.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">LinkedIn URL</label>
              <input
                type="url"
                name="social_linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Twitter / X URL</label>
              <input
                type="url"
                name="social_twitter"
                value={formData.socialLinks.twitter}
                onChange={handleChange}
                placeholder="https://x.com/username"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Custom Website</label>
              <input
                type="url"
                name="social_website"
                value={formData.socialLinks.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}