"use client";

import { useState, useEffect } from "react";
import { LayoutGrid, Briefcase, Code2, Mail, FileDown, Menu, X } from "lucide-react";

export default function Navbar({ profile }: { profile: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { name: "Projects", href: "#projects", icon: LayoutGrid },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Skills", href: "#skills", icon: Code2 },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  const cvUrl = profile?.resumeUrl && profile.resumeUrl.trim() !== "" ? profile.resumeUrl : null;

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Mobile top bar */}
      <div
        className={`md:hidden flex items-center justify-between px-4 py-3 transition-all ${
          isScrolled || mobileOpen
            ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <a
          href="#top"
          onClick={(e) => handleScrollTo(e, "#top")}
          className="font-mono font-bold text-sm text-zinc-100"
        >
          hsayn<span className="text-zinc-500 font-normal ml-1">portfolio</span>
        </a>

        <div className="flex items-center gap-2">
          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#e5d2b8] text-zinc-950 text-[10px] font-bold font-mono"
            >
              <FileDown className="w-3 h-3" />
              CV
            </a>
          )}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2 rounded-full bg-black/40 border border-white/10 text-zinc-200"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full inset-x-0 bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-white/10 p-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
              >
                <Icon className="w-4 h-4 text-[#c5a880]" />
                {link.name}
              </a>
            );
          })}
        </div>
      )}

      {/* Desktop navbar */}
      <div className="hidden md:block fixed top-6 inset-x-0 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 flex items-start justify-between">
          {/* Left name/logo */}
          <div className="flex-1 relative h-16 pointer-events-auto">
            <div
              className={`absolute top-0 left-0 transition-all duration-500 ${
                isScrolled ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100"
              }`}
            >
              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#f5ea3d]/90 uppercase font-mono">
                {profile?.fullName || "HSAYN BOURJI"}
              </h1>
              <p className="text-xs lg:text-sm font-mono text-[#dcc2a3] font-semibold">
                {profile?.title || "Full-Stack Software Engineer"}
              </p>
            </div>

            <div
              className={`absolute top-2 left-0 transition-all duration-500 ${
                isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <a
                href="#top"
                onClick={(e) => handleScrollTo(e, "#top")}
                className="text-zinc-100 font-mono font-bold text-lg hover:text-amber-200"
              >
                hsayn<span className="text-zinc-500 font-normal ml-1">portfolio</span>
              </a>
            </div>
          </div>

          {/* Center pill */}
          <div className="pointer-events-auto">
            <nav className="flex items-center gap-1 p-1.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full shadow-lg">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-all text-sm"
                  >
                    <Icon className="w-3.5 h-3.5 opacity-70" />
                    <span>{link.name}</span>
                  </a>
                );
              })}

              {cvUrl && (
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#e5d2b8] hover:bg-white text-zinc-950 font-bold font-mono text-xs ml-1"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  CV
                </a>
              )}
            </nav>
          </div>

          {/* Right tagline */}
          <div className="flex-1 relative h-16">
            <div
              className={`absolute top-0 right-0 w-[280px] text-right transition-all duration-500 ${
                isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <p className="text-sm text-zinc-100 leading-relaxed font-medium">
                {profile?.tagline || "Building scalable web applications and distributed systems."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}