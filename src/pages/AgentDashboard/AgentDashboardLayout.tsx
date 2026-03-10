
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { AgentSidebarContent } from '@/components/AgentSidebar';
import { ModeToggle } from '@/components/mode-toggle';
import AgencyModeToggle from './components/AgencyModeToggle';

export default function AgentDashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block shrink-0">
        <AgentSidebarContent />
      </aside>

      {/* Mobile / Tablet Sheet Sidebar */}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 border-r">
          <AgentSidebarContent onNavigate={() => setMobileSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Sticky header */}
        <header className="sticky top-0 z-40 shrink-0 flex items-center gap-3 px-4 md:px-6 py-3 border-b bg-background/95 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1 min-w-0"></div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <AgencyModeToggle />
            <ModeToggle />
          </div>
        </header>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
