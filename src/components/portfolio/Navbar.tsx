"use client";

import { useState, useEffect } from "react";
import { LayoutGrid, Briefcase, Code2, Mail, FileDown } from "lucide-react";

export default function Navbar({ profile }: { profile: any }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects", icon: LayoutGrid },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Skills", href: "#skills", icon: Code2 },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cvUrl = profile?.resumeUrl && profile.resumeUrl.trim() !== "" ? profile.resumeUrl : null;

  return (
    <header className="fixed top-6 inset-x-0 z-50 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-start justify-between relative">
        
        {/* LEFT: Name OR Logo */}
        <div className="flex-1 relative h-16 pointer-events-auto">
          <div
            className={`absolute top-0 left-0 flex flex-col transition-all duration-500 origin-top-left ${
              isScrolled
                ? "opacity-0 scale-90 pointer-events-none"
                : "opacity-100 scale-100 pointer-events-auto"
            }`}
          >
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#f5ea3d]/90 uppercase font-mono drop-shadow-md">
              {profile?.fullName || "HSAYN BOURJI"}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#dcc2a3] font-semibold drop-shadow-md">
              {profile?.title || "Full-Stack Software Engineer"}
            </p>
          </div>

          <div
            className={`absolute top-2 left-0 transition-all duration-500 ${
              isScrolled
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <a
              href="#top"
              onClick={(e) => handleScrollTo(e, "#top")}
              className="text-zinc-100 font-mono font-bold text-lg tracking-tight hover:text-amber-200 transition-colors cursor-pointer inline-block drop-shadow-md"
            >
              hsayn<span className="text-zinc-500 font-normal ml-1">portfolio</span>
            </a>
          </div>
        </div>

        {/* CENTER: Nav Pill */}
        <div className="pointer-events-auto z-50">
          <nav className="relative flex items-center gap-1 sm:gap-1.5 p-1.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_-4px_rgba(0,0,0,0.8)]">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[11px] sm:text-sm font-medium tracking-wide">
                    {link.name}
                  </span>
                </a>
              );
            })}

            {/* Gold CV Button */}
            {cvUrl ? (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#e5d2b8] hover:bg-white text-zinc-950 font-bold font-mono text-[11px] sm:text-xs transition-all duration-300 cursor-pointer ml-1 shadow-lg hover:shadow-white/20 shrink-0"
                title="Download CV"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>CV</span>
              </a>
            ) : (
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#e5d2b8] hover:bg-white text-zinc-950 font-bold font-mono text-[11px] sm:text-xs transition-all duration-300 cursor-pointer ml-1 shadow-lg hover:shadow-white/20 shrink-0"
                title="Contact Me"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>CV</span>
              </a>
            )}
          </nav>
        </div>

        {/* RIGHT: Tagline */}
        <div className="flex-1 relative h-16 hidden lg:block">
          <div
            className={`absolute top-0 right-0 w-[300px] text-right transition-all duration-500 origin-top-right ${
              isScrolled
                ? "opacity-0 scale-90 pointer-events-none"
                : "opacity-100 scale-100 pointer-events-auto"
            }`}
          >
            <p className="text-sm text-zinc-100 font-sans leading-relaxed drop-shadow-md font-medium">
              {profile?.tagline || "Building scalable web applications and distributed systems."}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}