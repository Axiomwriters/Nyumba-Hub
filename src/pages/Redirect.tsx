
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resolveDashboard } from "@/utils/roleRedirect";
import { Loader2 } from "lucide-react";

export default function RedirectPage() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user) {
      const role = user.unsafeMetadata.role as string;
      console.log(`Detected role: ${role}`);
      const destination = resolveDashboard(role);
      console.log(`Redirecting → ${destination}`);
      navigate(destination, { replace: true });
    }
  }, [isLoaded, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}
