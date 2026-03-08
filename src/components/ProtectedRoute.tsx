
import { useAuth, useUser } from "@clerk/clerk-react";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { resolveDashboard } from "@/utils/roleRedirect";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  const role = user?.unsafeMetadata?.role as string;

  // If the user is on a page that is not their dashboard, redirect them.
  const currentPath = location.pathname;
  const destination = resolveDashboard(role);

  if (currentPath !== destination) {
    console.log(`Detected role: ${role}`)
    console.log(`Redirecting to ${destination}`)
    return <Navigate to={destination} replace />;
  }

  return <>{children}</>;
}
