import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AccountSidebar from "@/components/account-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AccountSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
    </SidebarProvider>
  )
}