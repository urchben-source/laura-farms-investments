import { Link, useLocation } from "react-router-dom";
import { Sprout, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Sprout className="h-8 w-8 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">Laura Farms</span>
        </Link>

        {!isAuthPage && (
          <>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link to="/packages" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Packages</Link>
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
            <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </>
        )}
      </div>

      {mobileOpen && !isAuthPage && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          <Link to="/" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/packages" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Packages</Link>
          <Link to="/dashboard" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Dashboard</Link>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" asChild className="flex-1">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
