import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sprout, TrendingUp, Wallet, Clock, LogOut, BarChart3, Leaf, Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth("/login");

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
      return data;
    },
  });

  const { data: investments = [], isLoading: investmentsLoading } = useQuery({
    queryKey: ["investments", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("investments").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const activeInvestments = investments.filter((i: any) => i.status === "active");
  const totalInvested = activeInvestments.reduce((sum: number, i: any) => sum + Number(i.amount), 0);
  const totalReturns = activeInvestments.reduce(
    (sum: number, i: any) => sum + Number(i.amount) * (Number(i.returns_percent) / 100),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">Laura Farms</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" /> Log out
          </Button>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-3xl font-bold text-foreground font-display mb-1">
              Welcome back, {profile?.full_name || "Investor"} 👋
            </h1>
            <p className="text-muted-foreground">Here's an overview of your agricultural portfolio.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Total Invested", value: `$${totalInvested.toLocaleString()}`, icon: Wallet, color: "text-primary" },
              { label: "Expected Returns", value: `$${totalReturns.toLocaleString()}`, icon: TrendingUp, color: "text-accent" },
              { label: "Active Plans", value: String(activeInvestments.length), icon: BarChart3, color: "text-primary" },
              { label: "Total Investments", value: String(investments.length), icon: Clock, color: "text-muted-foreground" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-[var(--shadow-card)]"
              >
                <stat.icon className={`h-6 w-6 ${stat.color} mb-4`} />
                <p className="text-2xl font-bold text-foreground font-display">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground font-display">My Investments</h2>
              <Button size="sm" asChild>
                <Link to="/packages"><Leaf className="h-4 w-4 mr-2" /> New Investment</Link>
              </Button>
            </div>
            {investmentsLoading ? (
              <div className="p-12 text-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
              </div>
            ) : investments.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                <p>No investments yet. Start by choosing a package!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-3 uppercase tracking-wider">Package</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-3 uppercase tracking-wider">Amount</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-3 uppercase tracking-wider">Returns</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-3 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investments.map((inv: any) => (
                      <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">{inv.package_name}</td>
                        <td className="px-6 py-4 text-foreground">${Number(inv.amount).toLocaleString()}</td>
                        <td className="px-6 py-4 text-primary font-semibold">{inv.returns_percent}%</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            inv.status === "active" ? "bg-primary/10 text-primary" : inv.status === "pending" ? "bg-secondary/20 text-secondary-foreground" : "bg-muted text-muted-foreground"
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
