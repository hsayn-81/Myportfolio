import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // تحويل صريح لصفحة اللوجن الخارجية
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      <AdminSidebar />
      <main className="flex-1 p-8 max-w-6xl overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}