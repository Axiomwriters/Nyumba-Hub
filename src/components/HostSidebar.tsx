import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  Home,
  Calendar,
  MessageSquare,
  ClipboardList,
  DollarSign,
  BarChart,
  Settings,
  ArrowLeft,
  LogOut,
  Globe,
  BookOpen,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const mainItems = [
  { title: "Dashboard",    url: "/host",               icon: LayoutDashboard },
  { title: "Properties",   url: "/host/properties",    icon: Home },
  { title: "Calendar",     url: "/host/calendar",      icon: Calendar },
  { title: "Reservations", url: "/host/reservations",  icon: ClipboardList },
  { title: "Inbox",        url: "/host/inbox",         icon: MessageSquare, badge: 2 },
  { title: "Automation",   url: "/host/automation",    icon: MessageSquare },
  { title: "Operations",   url: "/host/operations",    icon: ClipboardList },
  { title: "Financials",   url: "/host/financials",    icon: DollarSign },
  { title: "Insights",     url: "/host/insights",      icon: BarChart },
  { title: "Integrations", url: "/host/integrations",  icon: Globe },
  { title: "Guidebook",    url: "/host/guidebook",     icon: BookOpen },
  { title: "Team",         url: "/host/team",          icon: Users },
  { title: "Settings",     url: "/host/settings",      icon: Settings },
];

interface HostSidebarContentProps {
  onNavigate?: () => void;
}

/**
 * HostSidebarContent — pure sidebar UI, works in both
 * desktop (inline) and mobile/tablet (Sheet overlay) contexts.
 */
export function HostSidebarContent({ onNavigate }: HostSidebarContentProps = {}) {
  const location = useLocation();
  const { signOut } = useAuth();
  const [unreadCount] = useState(2);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
  };

  return (
    <div className="w-60 border-r bg-background flex flex-col h-full overflow-hidden">
      {/* ── Logo ── */}
      <div className="flex justify-center px-6 py-5 border-b shrink-0">
        <img
          src="/Savanahdwell.png"
          alt="Savanah Dwelling"
          className="h-14 object-contain"
        />
      </div>

      {/* ── Scrollable Navigation ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="px-3 pb-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
          Host Dashboard
        </p>

        {mainItems.map((item) => {
          const isActive =
            location.pathname === item.url ||
            location.pathname.startsWith(`${item.url}/`);

          return (
            <Link
              key={item.title}
              to={item.url}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/15 border-l-4 border-primary text-primary"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 truncate">{item.title}</span>
              {item.title === "Inbox" && unreadCount > 0 && (
                <Badge className="ml-auto bg-primary text-primary-foreground text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Footer Actions ── */}
      <div className="shrink-0 border-t px-3 py-3 space-y-0.5">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors text-foreground/70 hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Back to Main Site</span>
        </Link>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 py-2 h-auto text-sm font-medium hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}

/**
 * HostSidebar — backward-compatible default export.
 * Only used by HostDashboard's desktop layout.
 */
export function HostSidebar() {
  return <HostSidebarContent />;
}