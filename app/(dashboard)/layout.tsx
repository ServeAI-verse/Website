import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import AIChatDialog from "@/components/ai-assistant/ai-chat-dialog";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Protect all dashboard routes - redirect to sign-in if not authenticated
  const user = await stackServerApp.getUser();
  
  if (!user) {
    redirect("/handler/sign-in");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-secondary/20">{children}</main>
      </div>
      <AIChatDialog />
    </div>
  );
}
