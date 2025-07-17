import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import NavigationMiddleware from "../lib/NavigationMiddleware";

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
          <div className="text-end pr-3 pt-3 flex justify-end">Hi Prashant <div className="md:hidden"><SidebarTrigger /></div></div>
          {children}
        </section>
      </SidebarProvider>
    </main>
  );
}

