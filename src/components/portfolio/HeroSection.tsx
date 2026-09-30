"use client";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface ProfileData {
  fullName: string;
  title: string;
  tagline: string;
  about: string;
  avatarUrl?: string;
  heroBgUrl?: string;
  resumeUrl?: string;
  email: string;
  location: string;
  status: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export default function HeroSection({ profile }: { profile: ProfileData | null }) {
  if (!profile) return null;

  const bgImage = profile.heroBgUrl || "/hero-bg.jpg";

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-black">
      
      {/* 1. BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Studio Background"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.endsWith(".png")) {
              target.src = "/hero-bg.jpg";
            }
          }}
        />
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0a0a0a] z-10" />
      </div>

      {/* 2. GIANT BACKDROP TEXT (DEVELOPER) */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-10 w-full text-center">
        <span className="text-[23vw] sm:text-[19vw] lg:text-[220px] font-black tracking-tighter text-[#e5d2b8]/20 font-mono uppercase leading-none drop-shadow-2xl">
          DEVELOPER
        </span>
      </div>

      {/* 3. CENTER: CUTOUT PERSON PNG (Anchored to bottom) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[68vh] sm:h-[78vh] max-h-[880px] flex justify-center items-end z-20 pointer-events-none">
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.fullName}
            className="w-auto h-full object-contain object-bottom filter drop-shadow-[0_40px_60px_rgba(0,0,0,0.95)]"
          />
        ) : (
          <div className="h-72 w-56 rounded-2xl bg-black/70 border border-zinc-700 flex items-center justify-center p-4 text-center backdrop-blur-md pointer-events-auto mb-10">
            <span className="text-xs text-amber-300 font-mono">Upload Person PNG</span>
          </div>
        )}
        
        {/* Shadow fade at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
      </div>

      {/* 4. BOTTOM ROW: Social Links & Giant Role Title */}
      <div className="absolute bottom-8 sm:bottom-12 inset-x-0 z-30 pointer-events-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          
          <div className="md:col-span-6 flex items-center gap-3 justify-center md:justify-start">
            {profile.socialLinks?.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#205ec9]/90 hover:bg-[#1a4ea8] text-white rounded-md text-xs sm:text-sm font-mono transition-colors shadow-xl">
                <GithubIcon /><span>GitHub</span>
              </a>
            )}
            {profile.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#a32279]/90 hover:bg-[#881a64] text-white rounded-md text-xs sm:text-sm font-mono transition-colors shadow-xl">
                <LinkedinIcon /><span>LinkedIn</span>
              </a>
            )}
          </div>

          <div className="md:col-span-6 text-center md:text-right">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#f5ea3d]/90 font-mono uppercase drop-shadow-lg">
              FULL-STACK DEV.
            </h2>
          </div>

        </div>
      </div>

    </section>
  );
}