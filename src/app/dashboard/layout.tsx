import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main
        className={` antialiased`}
      >
        <SidebarProvider>
      <AppSidebar />
      <main>
        <div className="md:hidden fixed top-3 right-3"><SidebarTrigger></SidebarTrigger></div>
        {children}
      </main>
    </SidebarProvider>
      </main>
  );
}

