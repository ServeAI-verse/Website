import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import AIChatDialog from "@/components/ai-assistant/ai-chat-dialog";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
