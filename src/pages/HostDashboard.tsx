import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HostSidebarContent } from "@/components/HostSidebar";
import { HeaderWrapper } from "@/components/HeaderWrapper";

import DashboardOverview from "./HostDashboard/DashboardOverview";
import Properties from "./HostDashboard/Properties";
import AddProperty from "./HostDashboard/AddProperty";
import CalendarSync from "./HostDashboard/CalendarSync";
import Reservations from "./HostDashboard/Reservations";
import AutoReply from "./HostDashboard/AutoReply";
import Operations from "./HostDashboard/Operations";
import Financials from "./HostDashboard/Financials";
import Insights from "./HostDashboard/Insights";
import Integrations from "./HostDashboard/Integrations";
import Guidebook from "./HostDashboard/Guidebook";
import Team from "./HostDashboard/Team";

// Placeholder sub-pages
const UnifiedInbox = () => <div className="p-6">Inbox Page</div>;
const SettingsPage  = () => <div className="p-6">Settings Page</div>;

export default function HostDashboard() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    /*
     * h-screen + overflow-hidden → no page-level scroll;
     * all scrolling happens inside <main>.
     */
    <div className="flex h-screen bg-background overflow-hidden">

      {/* ── Desktop Sidebar ── always visible on lg+ */}
      <aside className="hidden lg:block shrink-0">
        <HostSidebarContent />
      </aside>

      {/* ── Mobile / Tablet Sheet Sidebar ── overlay on < lg */}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-60 p-0 border-r">
          <HostSidebarContent onNavigate={() => setMobileSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* ── Main Content Column ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Sticky top bar */}
        <div className="sticky top-0 z-40 shrink-0 flex items-center gap-2 border-b bg-background/95 backdrop-blur-sm">
          {/* Hamburger: mobile + tablet only */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden ml-2 shrink-0"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Reuse existing HeaderWrapper */}
          <div className="flex-1 min-w-0">
            <HeaderWrapper />
          </div>
        </div>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route index                   element={<DashboardOverview />} />
            <Route path="properties"       element={<Properties />} />
            <Route path="properties/new"   element={<AddProperty />} />
            <Route path="properties/edit/:id" element={<AddProperty />} />
            <Route path="calendar"         element={<CalendarSync />} />
            <Route path="inbox"            element={<UnifiedInbox />} />
            <Route path="reservations"     element={<Reservations />} />
            <Route path="automation"       element={<AutoReply />} />
            <Route path="operations"       element={<Operations />} />
            <Route path="financials"       element={<Financials />} />
            <Route path="insights"         element={<Insights />} />
            <Route path="integrations"     element={<Integrations />} />
            <Route path="guidebook"        element={<Guidebook />} />
            <Route path="team"             element={<Team />} />
            <Route path="settings"         element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}