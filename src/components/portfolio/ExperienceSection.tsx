"use client";

import { Briefcase, GraduationCap } from "lucide-react";

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

export default function ExperienceSection({ items }: { items: ExpItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section id="experience" className="py-24 sm:py-32 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-14 sm:mb-20 text-center">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
            Career Path
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-mono tracking-tight text-[#e5d2b8] uppercase">
            Experience & Education
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#c5a880]/40 via-white/10 to-transparent sm:-translate-x-1/2" />

          <div className="space-y-10 sm:space-y-14">
            {items.map((item, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={item._id}
                  className={`relative flex flex-col sm:flex-row ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  } items-start sm:items-center gap-6 sm:gap-10`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-3 w-3 h-3 rounded-full bg-[#e5d2b8] shadow-[0_0_20px_rgba(229,210,184,0.45)] z-10" />

                  {/* Spacer for desktop alignment */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Card */}
                  <div className={`w-full sm:w-1/2 pl-10 sm:pl-0 ${isLeft ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:text-left"}`}>
                    <div className="group p-5 sm:p-6 rounded-2xl bg-[#111113] border border-white/10 hover:border-[#c5a880]/30 transition-all duration-300 shadow-xl">
                      
                      {/* type + dates */}
                      <div className={`flex flex-wrap items-center gap-2 mb-3 ${isLeft ? "sm:justify-end" : "sm:justify-start"}`}>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/10 bg-black/40 text-zinc-300">
                          {item.type === "work" ? (
                            <>
                              <Briefcase className="w-3 h-3 text-[#c5a880]" /> Work
                            </>
                          ) : (
                            <>
                              <GraduationCap className="w-3 h-3 text-sky-400" /> Education
                            </>
                          )}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {item.startDate} — {item.current ? "Present" : item.endDate}
                        </span>
                      </div>

                      {/* role + company */}
                      <h3 className="text-lg sm:text-xl font-bold font-mono text-zinc-100 group-hover:text-[#e5d2b8] transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-sm text-[#c5a880] font-medium mt-1">
                        {item.company}
                        {item.location ? ` · ${item.location}` : ""}
                      </p>

                      {/* bullets */}
                      {item.description?.length > 0 && (
                        <ul className={`mt-4 space-y-1.5 ${isLeft ? "sm:text-right" : "sm:text-left"}`}>
                          {item.description.map((line, i) => (
                            <li key={i} className={`text-xs sm:text-sm text-zinc-400 leading-relaxed flex gap-2 ${isLeft ? "sm:flex-row-reverse" : ""}`}>
                              <span className="text-[#c5a880] font-mono mt-0.5">›</span>
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* skills */}
                      {item.skills?.length > 0 && (
                        <div className={`mt-4 flex flex-wrap gap-1.5 ${isLeft ? "sm:justify-end" : "sm:justify-start"}`}>
                          {item.skills.map((s) => (
                            <span
                              key={s}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black border border-white/10 text-zinc-400"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}