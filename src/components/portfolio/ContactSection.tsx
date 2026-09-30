"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2 } from "lucide-react";

export default function ContactSection({ profile }: { profile: any }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#c5a880]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-14 sm:mb-20 text-center sm:text-left">
          <span className="text-[10px] font-mono text-[#c5a880] uppercase tracking-widest block mb-2">
            // Open for opportunities
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-[#e5d2b8] uppercase">
            Let's Connect
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left info */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans max-w-md">
              Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you.
            </p>

            <div className="space-y-6">
              {profile?.email && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-[#c5a880] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Email</span>
                    <a href={`mailto:${profile.email}`} className="text-zinc-200 hover:text-[#e5d2b8] font-mono text-sm sm:text-base transition-colors">
                      {profile.email}
                    </a>
                  </div>
                </div>
              )}

              {profile?.phone && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-[#c5a880] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Phone</span>
                    <a href={`tel:${profile.phone}`} className="text-zinc-200 hover:text-[#e5d2b8] font-mono text-sm sm:text-base transition-colors">
                      {profile.phone}
                    </a>
                  </div>
                </div>
              )}

              {profile?.location && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-[#c5a880] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Location</span>
                    <span className="text-zinc-200 font-mono text-sm sm:text-base">{profile.location}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#121215] border border-white/10 shadow-2xl space-y-6">
              {success && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-400 text-sm font-mono">
                  <CheckCircle2 className="w-5 h-5" />
                  Message sent successfully!
                </div>
              )}

              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-[#c5a880]/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-[#c5a880]/50 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-[#c5a880]/50 transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-[#c5a880]/50 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#e5d2b8] hover:bg-white text-zinc-950 font-bold font-mono text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (<><Send className="w-4 h-4" /> Send Message</>)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}