import { LayoutDashboard, View, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Membresia",
    url: "/dashboard/summaries",
    icon: View,
  },
  {
    title: "Cuenta",
    url: "/dashboard/account",
    icon: User,
  },
]

const AccountSidebar = () => {
    return ( 
    <Sidebar className="w-[240px] shrink-0" >
        <SidebarContent>
        <SidebarGroup>
            <SidebarGroupLabel>
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
                </Link>
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <Link href={item.url} className="flex items-center gap-2">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
    );
}
 
export default AccountSidebar;