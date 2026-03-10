import { useEffect, useState } from "react";
import TodaysFocus from "./components/TodaysFocus";
import PerformanceRadar from "./components/PerformanceRadar";
import MarketIntelligence from "./components/MarketIntelligence";
import CRMHub from "./components/CRMHub";
import AgencyModeToggle from "./components/AgencyModeToggle";
import { EmptyListingState } from "./components/command-center/EmptyListingState";
import { AddListingModal } from "./components/add-listing-modal/AddListingModal";
import { AgentSidebar } from '../../components/AgentSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/mode-toggle';

export default function NewAgentDashboard() {
  const [loading, setLoading] = useState(true);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <AgentSidebar />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <header className="sticky top-0 z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4 border-b bg-background/95 backdrop-blur-sm">
            <div>
              <h1 className="text-3xl font-bold mb-1">Command Center</h1>
              <p className="text-muted-foreground">Track your performance and manage your deals.</p>
            </div>
            <div className="flex items-center gap-4">
              <AgencyModeToggle />
              <ModeToggle />
            </div>
          </header>

          <main className="p-6">
            <div className="space-y-8 max-w-7xl mx-auto">
              <section><TodaysFocus /></section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[400px]">
                <PerformanceRadar />
                <MarketIntelligence />
              </div>
              <section><CRMHub /></section>
              <section><EmptyListingState onAddListing={() => setIsAddListingOpen(true)} /></section>
              <AddListingModal open={isAddListingOpen} onOpenChange={setIsAddListingOpen} />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
