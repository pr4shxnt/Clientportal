import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import NavigationMiddleware from "../lib/NavigationMiddleware";
import ProfileTag from "./components/ProfileTag";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="antialiased">
      
      <NavigationMiddleware/>
      <SidebarProvider>
        <AppSidebar />
        <section className="w-full">
          <div className="md:hidden fixed z-10 left-2 top-2"><SidebarTrigger /></div>
          <div className="text-end p-3 flex justify-end"><ProfileTag/></div>
          {children}
        </section>
      </SidebarProvider>
    </main>
  );
}

