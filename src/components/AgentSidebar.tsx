import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/clerk-react";
import {
  LayoutDashboard,
  User,
  Home as HomeIcon,
  Map,
  Bell,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SponsoredSpotlight } from "./agent-sidebar-widgets/SponsoredSpotlight";
import { AccountTierWidget } from "./agent-sidebar-widgets/AccountTierWidget";

const mainItems = [
  { title: "Dashboard", url: "/agent/dashboard", icon: LayoutDashboard },
  { title: "My Profile", url: "/agent/profile", icon: User },
  { title: "My Listings", url: "/agent/listings", icon: HomeIcon },
  { title: "Trips & Viewings", url: "/agent/trips", icon: Map },
  { title: "Notifications", url: "/agent/notifications", icon: Bell },
  { title: "Settings", url: "/agent/settings", icon: Settings },
];

interface AgentSidebarContentProps {
  onNavigate?: () => void;
}

/**
 * AgentSidebarContent — the actual sidebar UI used in both
 * desktop (inline) and mobile/tablet (Sheet overlay) contexts.
 */
export function AgentSidebarContent({ onNavigate }: AgentSidebarContentProps = {}) {
  const location = useLocation();
  const { user, isLoaded } = useUser();
  const [pendingCount, setPendingCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) fetchCounts();
  }, [user]);

  const fetchCounts = async () => {
    try {
      const { count: pending } = await supabase
        .from("agent_listings")
        .select("*", { count: "exact", head: true })
        .eq("agent_id", user!.id)
        .eq("status", "pending");

      const { count: unread } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id)
        .eq("read", false);

      setPendingCount(pending || 0);
      setUnreadCount(unread || 0);
    } catch (error) {
      console.error("Error fetching sidebar counts:", error);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="w-64 border-r bg-background flex flex-col h-full overflow-hidden">
      {/* ── Logo ── fixed at top, never scrolls */}
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
          Agent Dashboard
        </p>

        {mainItems.map((item) => {
          const isActive = location.pathname.startsWith(item.url);
          return (
            <Link
              key={item.title}
              to={item.url}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 truncate">{item.title}</span>
              {item.title === "My Listings" && pendingCount > 0 && (
                <Badge className="ml-auto bg-yellow-500 text-white text-xs">
                  {pendingCount}
                </Badge>
              )}
              {item.title === "Notifications" && unreadCount > 0 && (
                <Badge className="ml-auto bg-primary text-primary-foreground text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Widgets + Back Link ── fixed, never scrolls */}
      <div className="shrink-0 border-t px-3 py-4 space-y-3">
        <SponsoredSpotlight />
        <AccountTierWidget />
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors text-foreground/70 hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Back to Main Site</span>
        </Link>
      </div>

      {/* ── User Button ── fixed at very bottom */}
      <div className="shrink-0 border-t px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <UserButton />
          <div className="flex-1 min-w-0 text-left text-sm leading-tight">
            <p className="truncate font-semibold">
              {user?.fullName || user?.firstName || "Agent"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * AgentSidebar — backward-compatible named export.
 * Used by AgentDashboard.tsx (the /dashboard/agent route).
 */
export function AgentSidebar() {
  return <AgentSidebarContent />;
}