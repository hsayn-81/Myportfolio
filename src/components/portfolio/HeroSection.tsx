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

  const bgImage = profile.heroBgUrl || "/hero-bg.png";

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Studio Background"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.endsWith(".png")) target.src = "/hero-bg.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-[#0a0a0a]" />
      </div>

      {/* DEVELOPER text - smaller on mobile, less cramped */}
      <div className="absolute top-[42%] sm:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-10 w-full text-center px-2">
        <span className="text-[16vw] sm:text-[14vw] lg:text-[180px] font-black tracking-tighter text-[#e5d2b8]/15 font-mono uppercase leading-none">
          DEVELOPER
        </span>
      </div>

      {/* Mobile top identity (since desktop name is in navbar) */}
      <div className="relative z-20 pt-20 sm:pt-28 md:pt-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="md:hidden text-center space-y-1 mb-4">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#f5ea3d]/90 uppercase font-mono">
            {profile.fullName}
          </h1>
          <p className="text-xs font-mono text-[#dcc2a3] font-semibold">
            {profile.title}
          </p>
          <p className="text-[11px] text-zinc-300 max-w-xs mx-auto leading-relaxed pt-1">
            {profile.tagline}
          </p>
        </div>
      </div>

      {/* Person image - less cramped height on mobile */}
      <div className="relative z-20 flex justify-center items-end min-h-[48vh] sm:min-h-[58vh] lg:min-h-[68vh] pointer-events-none mt-2 sm:mt-0">
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.fullName}
            className="w-auto h-[48vh] sm:h-[62vh] lg:h-[72vh] max-h-[760px] object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)]"
          />
        ) : (
          <div className="h-56 w-44 rounded-2xl bg-black/70 border border-zinc-700 flex items-center justify-center mb-8">
            <span className="text-xs text-amber-300 font-mono">Upload Person PNG</span>
          </div>
        )}
      </div>

      {/* Bottom row */}
      <div className="relative z-30 -mt-2 sm:mt-0 pb-6 sm:pb-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            {profile.socialLinks?.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#205ec9]/90 hover:bg-[#1a4ea8] text-white rounded-md text-xs font-mono transition-colors shadow-xl"
              >
                <GithubIcon />
                <span>GitHub</span>
              </a>
            )}
            {profile.socialLinks?.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#a32279]/90 hover:bg-[#881a64] text-white rounded-md text-xs font-mono transition-colors shadow-xl"
              >
                <LinkedinIcon />
                <span>LinkedIn</span>
              </a>
            )}
          </div>

          <div className="text-center sm:text-right">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#f5ea3d]/90 font-mono uppercase drop-shadow-lg">
              FULL-STACK DEV.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}