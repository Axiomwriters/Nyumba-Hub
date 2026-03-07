import { useState, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { HeaderWrapper } from "@/components/HeaderWrapper";
import { ProfileDrawer } from "@/components/ProfileDrawer";
import { LocationAgentWidget } from "@/components/LocationAgentWidget";

export default function MainLayout() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useLayoutEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0;
            setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen w-full bg-background">
                <AppSidebar
                    isScrolled={isScrolled}
                    onOpenProfile={() => setIsProfileOpen(true)}
                />
                <div className="flex flex-1 flex-col">
                    <header className="sticky top-0 z-40 border-b">
                        <HeaderWrapper
                            isScrolled={isScrolled}
                            onOpenTrip={() => setIsProfileOpen(true)}
                        />
                    </header>
                    <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        <Outlet />
                    </main>
                </div>
                <ProfileDrawer
                    open={isProfileOpen}
                    onOpenChange={setIsProfileOpen}
                />
                <LocationAgentWidget />
            </div>
        </SidebarProvider>
    );
}
