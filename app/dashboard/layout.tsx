// app/dashboard/layout.tsx
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex lg:flex-row flex-col-reverse">
      <Sidebar />
      <div className="flex-1">
        <Header />  
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
