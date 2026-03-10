import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from '@clerk/clerk-react';
import { LayoutDashboard, User, Home as HomeIcon, Map, Bell, Settings, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SponsoredSpotlight } from "./agent-sidebar-widgets/SponsoredSpotlight";
import { AccountTierWidget } from "./agent-sidebar-widgets/AccountTierWidget";

const mainItems = [
  { title: "Dashboard", url: "/agent/dashboard", icon: LayoutDashboard },
  { title: "My Profile", url: "/agent/profile", icon: User },
  { title: "My Listings", url: "/agent/listings", icon: HomeIcon },
  { title: "Trips & Viewings", url: "/agent/trips", icon: Map },
  { title: "Notifications", url: "/agent/notifications", icon: Bell, badge: 3 },
  { title: "Settings", url: "/agent/settings", icon: Settings },
];

export function AgentSidebar() {
  const location = useLocation();
  const { user, isLoaded } = useUser();
  const [pendingCount, setPendingCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) fetchCounts();
  }, [user]);

  const fetchCounts = async () => {
    try {
      const { count: pending } = await supabase.from("agent_listings").select("*", { count: "exact", head: true }).eq("agent_id", user!.id).eq("status", "pending");
      const { count: unread } = await supabase.from("notifications").select("*", { count: "exact", head: true }).eq("user_id", user!.id).eq("read", false);
      setPendingCount(pending || 0);
      setUnreadCount(unread || 0);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="w-64 border-r bg-background flex flex-col">
      <div className="flex justify-center p-6">
        <img src="/Savanahdwell.png" alt="Savanah Dwelling" className="h-16" />
      </div>
      <nav className="flex-grow px-4 space-y-2">
        <p className="px-4 text-xs font-semibold text-muted-foreground tracking-wider">Agent Dashboard</p>
        {mainItems.map((item) => {
          const isActive = location.pathname.startsWith(item.url);
          return (
            <Link
              key={item.title}
              to={item.url}
              className={cn(
                "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-primary/20 text-primary" : "hover:bg-muted"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.title}</span>
              {item.title === "My Listings" && pendingCount > 0 && (
                <Badge className="ml-auto bg-yellow-500">{pendingCount}</Badge>
              )}
              {item.title === "Notifications" && unreadCount > 0 && (
                <Badge className="ml-auto bg-primary">{unreadCount}</Badge>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4 space-y-4">
        <SponsoredSpotlight />
        <AccountTierWidget />
        <Link to="/" className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Site</span>
        </Link>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <UserButton />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user?.fullName || user?.firstName || 'Agent'}</span>
            <span className="truncate text-xs text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
