import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import TodaysFocus from "./components/TodaysFocus";
import PerformanceRadar from "./components/PerformanceRadar";
import MarketIntelligence from "./components/MarketIntelligence";
import CRMHub from "./components/CRMHub";
import AgencyModeToggle from "./components/AgencyModeToggle";
import { EmptyListingState } from "./components/command-center/EmptyListingState";
import { AddListingModal } from "./components/add-listing-modal/AddListingModal";
import { AgentSidebarContent } from "../../components/AgentSidebar";
import { ModeToggle } from "@/components/mode-toggle";

export default function NewAgentDashboard() {
  const [loading, setLoading] = useState(true);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    /*
     * Outer container:
     *   h-screen          → locks height to viewport (no page scroll)
     *   overflow-hidden   → prevents the page from growing past screen
     *   flex              → sidebar + main side by side
     */
    <div className="flex h-screen bg-background overflow-hidden">

      {/* ── Desktop Sidebar ── visible only on lg+ screens */}
      <aside className="hidden lg:block shrink-0">
        <AgentSidebarContent />
      </aside>

      {/* ── Mobile / Tablet Sheet Sidebar ── overlay on < lg */}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent
          side="left"
          className="w-64 p-0 border-r"
          // Hide the default Sheet close button — sidebar has its own nav
        >
          {/* Remove SheetHeader to eliminate extra padding */}
          <AgentSidebarContent onNavigate={() => setMobileSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* ── Main Content Column ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Sticky header — never scrolls */}
        <header className="sticky top-0 z-40 shrink-0 flex items-center gap-3 px-4 md:px-6 py-3 border-b bg-background/95 backdrop-blur-sm">
          {/* Hamburger: only shown on mobile + tablet */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Title block */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight truncate">
              Command Center
            </h1>
            <p className="hidden sm:block text-xs md:text-sm text-muted-foreground">
              Track your performance and manage your deals.
            </p>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <AgencyModeToggle />
            <ModeToggle />
          </div>
        </header>

        {/*
         * Scrollable content area — this is the ONLY scroll on the page.
         * flex-1           → takes all remaining vertical space
         * overflow-y-auto  → scrolls internally (not the whole page)
         */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">

            {/* 1. Today's Focus */}
            <section>
              <TodaysFocus />
            </section>

            {/* 2. Performance & Intelligence Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:h-[400px]">
              <PerformanceRadar />
              <MarketIntelligence />
            </div>

            {/* 3. CRM Hub */}
            <section>
              <CRMHub />
            </section>

            {/* 4. Agent Success Roadmap */}
            <section>
              <EmptyListingState
                onAddListing={() => setIsAddListingOpen(true)}
              />
            </section>

          </div>
        </main>
      </div>

      {/* Listing modal — rendered outside the scroll container */}
      <AddListingModal
        open={isAddListingOpen}
        onOpenChange={setIsAddListingOpen}
      />
    </div>
  );
}