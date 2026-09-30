import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import Experience from "@/models/Experience";
import Message from "@/models/Message";
import Skill from "@/models/Skill";
import Link from "next/link";
import { Briefcase, GraduationCap, Mail, Code2, ArrowUpRight } from "lucide-react";

async function getStats() {
  await dbConnect();
  const [projectsCount, expCount, unreadMessages, skillsCount] = await Promise.all([
    Project.countDocuments(),
    Experience.countDocuments(),
    Message.countDocuments({ read: false }),
    Skill.countDocuments(),
  ]);

  return { projectsCount, expCount, unreadMessages, skillsCount };
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  const cards = [
    { label: "Projects", count: stats.projectsCount, href: "/admin/projects", icon: Briefcase },
    { label: "Work & Education", count: stats.expCount, href: "/admin/experience", icon: GraduationCap },
    { label: "Skill Categories", count: stats.skillsCount, href: "/admin/skills", icon: Code2 },
    { label: "Unread Messages", count: stats.unreadMessages, href: "/admin/messages", icon: Mail, alert: stats.unreadMessages > 0 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-zinc-400 mt-1">Manage and update your public portfolio CV content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group p-5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-zinc-400 group-hover:text-zinc-200">
                <Icon className="w-5 h-5" />
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold font-mono text-zinc-100 flex items-center gap-2">
                  {card.count}
                  {card.alert && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>
                <div className="text-xs text-zinc-400 mt-1">{card.label}</div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-6 bg-zinc-900/50 border border-zinc-800/80 rounded-xl">
        <h2 className="text-base font-medium text-zinc-200 mb-2">Quick Navigation</h2>
        <p className="text-xs text-zinc-400 leading-relaxed mb-4">
          All modifications made in this dashboard update your live portfolio instantly. Make sure URLs for live demos and GitHub repos are valid.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/profile" className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors">
            Edit Hero & Bio
          </Link>
          <Link href="/admin/projects" className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors">
            Add New Project
          </Link>
          <Link href="/admin/experience" className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors">
            Update Experience
          </Link>
        </div>
      </div>
    </div>
  );
}