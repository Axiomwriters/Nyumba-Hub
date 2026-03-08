import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  TrendingUp,
  FileText,
  ChevronRight,
  GraduationCap,
  Baby,
  Coins,
  Shield,
  Sparkles,
  Crown,
  Warehouse,
  Building2,
  Compass,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { UserProfileCard } from "@/components/UserProfileCard";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "./ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Explore",
    url: "/explore",
    icon: Compass,
    isCollapsible: true,
    items: [
      {
        title: "Student Housing",
        url: "/explore/student-housing",
        icon: GraduationCap,
      },
      {
        title: "Family Homes",
        url: "/explore/family-homes",
        icon: Baby,
      },
      {
        title: "Investment",
        url: "/explore/investment",
        icon: Coins,
      },
      {
        title: "Gated Communities",
        url: "/explore/gated-communities",
        icon: Shield,
      },
      {
        title: "First-Time Buyers",
        url: "/explore/first-time-buyers",
        icon: Sparkles,
      },
      {
        title: "Luxury Living",
        url: "/explore/luxury-living",
        icon: Crown,
      },
      {
        title: "Warehouses",
        url: "/explore/warehouses",
        icon: Warehouse,
      },
      {
        title: "Mixed-Use",
        url: "/explore/mixed-use",
        icon: Building2,
      },
    ],
  },
  {
    title: "Short Stay",
    url: "/short-stay",
    icon: Home,
  },
  {
    title: "Agents",
    url: "/agent",
    icon: Users,
  },
  {
    title: "Market Trends",
    url: "/market",
    icon: TrendingUp,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
];

interface AppSidebarProps {
  onOpenProfile: () => void;
}

export function AppSidebar({ onOpenProfile }: AppSidebarProps) {
  const location = useLocation();
  const { open: isSidebarOpen } = useSidebar();

  return (
    <Sidebar collapsible variant="inset">
      <SidebarHeader className="h-14 justify-between px-3">
        <img src="/logo.svg" alt="PataHome" className={cn("h-6", !isSidebarOpen && "-ml-1 h-8 w-8")} />
        <SidebarTrigger className="[&>svg]:size-5" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.url) && item.url !== "/";
            const isDashboardActive = item.url === "/" && location.pathname === "/";

            if (item.isCollapsible && item.items) {
              return (
                <SidebarMenuItem key={item.title} asChild>
                  <Collapsible defaultOpen={isActive}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        <item.icon />
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent asChild>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubButton key={subItem.title} isActive={location.pathname === subItem.url} asChild>
                            <Link to={subItem.url}>
                              <subItem.icon />
                              {subItem.title}
                            </Link>
                          </SidebarMenuSubButton>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuItem>
              );
            }

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isDashboardActive || (isActive && !item.isCollapsible)}
                  tooltip={item.title}
                >
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <UserProfileCard onOpenProfile={onOpenProfile} isCollapsed={!isSidebarOpen} />
      </SidebarFooter>
    </Sidebar>
  );
}
