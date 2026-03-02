// src/pages/Auth.tsx
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 bg-background animate-fade-in">
        <div className="max-w-md mx-auto w-full">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-12 group w-fit">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Home className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">Kenya Prime Dwellings</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to your account or create a new one to get started.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              type="button"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 text-base transition-all duration-300"
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 text-base transition-all duration-300"
              onClick={() => navigate('/sign-up')}
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex w-1/2 bg-[#0a0a0a] relative overflow-hidden items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="relative z-10 text-center p-12 max-w-lg">
          <div className="w-16 h-16 bg-primary rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-primary/30 rotate-12 hover:rotate-0 transition-all duration-500">
            <Home className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            Find your dream property with confidence
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Join thousands of users, agents, and certified professionals in the most trusted real estate ecosystem in Kenya.
          </p>
        </div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>
    </div>
  );
}
