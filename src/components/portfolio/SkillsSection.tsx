"use client";

import { Cpu, Database, Code2, Layers, Wrench } from "lucide-react";

interface SkillCategory {
  _id: string;
  category: string;
  skills: { name: string }[];
  order: number;
}

export default function SkillsSection({ categories }: { categories: SkillCategory[] }) {
  if (!categories || categories.length === 0) return null;

  // ✅ Merge categories with the same name into one node
  const mergedMap = new Map<string, { category: string; skills: { name: string }[]; order: number }>();

  categories.forEach((cat) => {
    const key = cat.category.trim().toLowerCase();
    if (!mergedMap.has(key)) {
      mergedMap.set(key, {
        category: cat.category.trim(),
        skills: [...(cat.skills || [])],
        order: cat.order ?? 0,
      });
    } else {
      const existing = mergedMap.get(key)!;
      const names = new Set(existing.skills.map((s) => s.name.toLowerCase()));
      (cat.skills || []).forEach((s) => {
        if (!names.has(s.name.toLowerCase())) {
          existing.skills.push(s);
          names.add(s.name.toLowerCase());
        }
      });
      existing.order = Math.min(existing.order, cat.order ?? 0);
    }
  });

  const mergedCategories = Array.from(mergedMap.values()).sort((a, b) => a.order - b.order);

  const icons = [Code2, Cpu, Database, Layers, Wrench];

  return (
    <section id="skills" className="py-24 sm:py-32 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#c5a880]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="mb-14 sm:mb-20 text-center">
          <span className="text-[10px] font-mono text-[#c5a880] uppercase tracking-widest block mb-2">
            // System Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-[#e5d2b8] uppercase">
            Skills Tree
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Categories connected like circuit nodes. Each branch holds the tools behind the stack.
          </p>
        </div>

        {/* TREE / CIRCUIT */}
        <div className="relative">
          <div className="hidden md:block absolute top-[34px] left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c5a880]/50 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
            {mergedCategories.map((cat, idx) => {
              const Icon = icons[idx % icons.length];

              return (
                <div key={`${cat.category}-${idx}`} className="relative group">
                  <div className="relative z-10 mx-auto w-full max-w-sm">
                    {/* top pin */}
                    <div className="hidden md:flex justify-center">
                      <div className="w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-[#c5a880] shadow-[0_0_12px_rgba(197,168,128,0.45)]" />
                    </div>
                    <div className="hidden md:block w-px h-4 bg-[#c5a880]/50 mx-auto" />

                    {/* category chip */}
                    <div className="relative rounded-2xl border border-[#c5a880]/30 bg-[#121215] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_40px_rgba(0,0,0,0.45)] group-hover:border-[#c5a880]/60 transition-all duration-300">
                      <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-[#c5a880]/40" />
                      <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-[#c5a880]/40" />
                      <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-[#c5a880]/40" />
                      <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-[#c5a880]/40" />

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-[#c5a880]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-zinc-500 tracking-widest">
                            NODE {String(idx + 1).padStart(2, "0")}
                          </div>
                          <h3 className="text-sm sm:text-base font-bold font-mono text-[#e5d2b8] uppercase tracking-tight">
                            {cat.category}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* trunk */}
                    <div className="w-px h-6 bg-[#c5a880]/40 mx-auto" />
                    <div className="w-3 h-3 rounded-full bg-[#c5a880]/80 mx-auto shadow-[0_0_10px_rgba(197,168,128,0.35)]" />
                    <div className="w-px h-4 bg-[#c5a880]/30 mx-auto" />
                  </div>

                  {/* skills under same category together */}
                  <div className="relative mt-1">
                    {cat.skills.length > 1 && (
                      <div className="hidden sm:block absolute top-4 left-6 right-6 h-px bg-[#c5a880]/20" />
                    )}

                    <div className="flex flex-wrap justify-center gap-2.5">
                      {cat.skills.map((skill, sIdx) => (
                        <div key={`${skill.name}-${sIdx}`} className="relative">
                          <div className="hidden sm:block w-px h-3 bg-[#c5a880]/25 mx-auto" />
                          <div className="px-3 py-1.5 rounded-lg bg-black/70 border border-white/10 text-[11px] sm:text-xs font-mono text-zinc-300 hover:text-white hover:border-[#c5a880]/50 hover:bg-[#c5a880]/10 transition-all duration-300 shadow-md">
                            {skill.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* legend */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono text-zinc-500">
          <span className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border border-[#c5a880]" />
            Category Node
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-px bg-[#c5a880]/50" />
            Circuit Trace
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="px-2 py-0.5 rounded border border-white/10 bg-black/50 text-zinc-400">Skill</span>
            Leaf Module
          </span>
        </div>
      </div>
    </section>
  );
}