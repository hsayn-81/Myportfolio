"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Mail, 
  ExternalLink,
  LogOut
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/profile", label: "Profile & Hero", icon: User },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/experience", label: "Experience & Edu", icon: GraduationCap },
  { href: "/admin/skills", label: "Skills", icon: Code2 },
  { href: "/admin/messages", label: "Inbox Messages", icon: Mail },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <span className="font-mono font-bold text-sm tracking-widest text-zinc-100">
          PORTFOLIO<span className="text-emerald-500">.ADMIN</span>
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-zinc-800 text-zinc-100 border border-zinc-700/50"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-850"
              )}
            >
              <Icon className={clsx("w-4 h-4", active ? "text-emerald-400" : "text-zinc-400")} />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Quick links & Sign out */}
      <div className="p-3 border-t border-zinc-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 rounded-lg hover:bg-zinc-800/50 transition-colors"
        >
          <span>View Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 rounded-lg hover:bg-red-950/30 transition-colors text-left cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}