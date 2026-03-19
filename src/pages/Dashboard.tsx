import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sprout,
  TrendingUp,
  Wallet,
  Clock,
  ArrowRight,
  LogOut,
  BarChart3,
  Leaf,
} from "lucide-react";

const investments = [
  { id: 1, package: "Harvest", amount: 5000, returns: "22%", status: "Active", progress: 65, maturity: "Aug 2026" },
  { id: 2, package: "Seedling", amount: 1000, returns: "15%", status: "Active", progress: 40, maturity: "Nov 2026" },
  { id: 3, package: "Estate", amount: 15000, returns: "30%", status: "Matured", progress: 100, maturity: "Jan 2026" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">Laura Farms</span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="text-muted-foreground">
              <LogOut className="h-4 w-4 mr-2" /> Log out
            </Link>
          </Button>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Greeting */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-foreground font-display mb-1">Welcome back, Investor 👋</h1>
            <p className="text-muted-foreground">Here's an overview of your agricultural portfolio.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Total Invested", value: "$21,000", icon: Wallet, color: "text-primary" },
              { label: "Expected Returns", value: "$5,310", icon: TrendingUp, color: "text-accent" },
              { label: "Active Plans", value: "2", icon: BarChart3, color: "text-primary" },
              { label: "Next Maturity", value: "Aug 2026", icon: Clock, color: "text-muted-foreground" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl p-6 border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground font-display">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Investments */}
          <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground font-display">My Investments</h2>
              <Button size="sm" asChild>
                <Link to="/packages">
                  <Leaf className="h-4 w-4 mr-2" /> New Investment
                </Link>
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-3 uppercase tracking-wider">Package</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-3 uppercase tracking-wider">Amount</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-3 uppercase tracking-wider">Returns</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-3 uppercase tracking-wider">Maturity</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-3 uppercase tracking-wider">Progress</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-3 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map((inv) => (
                    <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{inv.package}</td>
                      <td className="px-6 py-4 text-foreground">${inv.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-primary font-semibold">{inv.returns}</td>
                      <td className="px-6 py-4 text-muted-foreground">{inv.maturity}</td>
                      <td className="px-6 py-4">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${inv.progress}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            inv.status === "Active"
                              ? "bg-primary/10 text-primary"
                              : "bg-accent/20 text-accent-foreground"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
