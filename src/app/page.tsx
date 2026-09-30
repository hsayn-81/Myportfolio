import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import PageLoader from "@/components/portfolio/PageLoader";
import { getProfile, getProjects, getExperience, getSkills } from "@/lib/data";

// تجديد البيانات فوري مع كل فتحة صفحة
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PortfolioPage() {
  const profile = await getProfile();
  const projects = await getProjects();
  const experience = await getExperience();
  const skills = await getSkills();

  return (
    <main id="top" className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-amber-500/20 selection:text-amber-200">
      <PageLoader />

      <Navbar profile={profile} />
      <HeroSection profile={profile} />
      <ProjectsSection projects={projects} />
      <ExperienceSection items={experience} />
      <SkillsSection categories={skills} />
      <ContactSection profile={profile} />

      <footer className="py-8 bg-black border-t border-white/5 text-center">
        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          © {new Date().getFullYear()} {profile?.fullName || "Portfolio"}. All rights reserved.
        </p>
      </footer>
    </main>
  );
}