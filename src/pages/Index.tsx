import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Leaf, ArrowRight, Users, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-farm.jpg";

const stats = [
  { label: "Active Investors", value: "2,400+" },
  { label: "Total Returns Paid", value: "$4.8M" },
  { label: "Farm Projects", value: "120+" },
];

const features = [
  {
    icon: TrendingUp,
    title: "High Returns",
    description: "Earn up to 25% annual returns on your agricultural investments with proven track records.",
  },
  {
    icon: Shield,
    title: "Secure & Insured",
    description: "All investments are insured and backed by real agricultural assets for maximum security.",
  },
  {
    icon: Leaf,
    title: "Sustainable Growth",
    description: "Support sustainable farming practices while growing your wealth responsibly.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Lush farmland at sunset" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        </div>
        <div className="relative container mx-auto px-4 py-32 md:py-44">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-6 backdrop-blur-sm border border-secondary/30">
              🌱 Trusted by 2,400+ investors
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Grow Your Wealth with <span className="text-gradient-gold">Agriculture</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg font-body">
              Invest in sustainable farm projects and earn consistent returns. Laura Farms connects you to verified agricultural opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-base px-8">
                <Link to="/signup">Start Investing <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/packages">View Packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-12 z-10">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-2xl shadow-[var(--shadow-elevated)] p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold font-display text-primary">{stat.value}</p>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Invest with Laura Farms?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We combine agricultural expertise with financial transparency to deliver reliable investment returns.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow border border-border">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 font-display">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Start Growing?</h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
            Join thousands of investors earning consistent returns from sustainable agriculture.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-base px-8">
            <Link to="/signup">Create Your Account <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-secondary" />
              <span className="font-display text-lg font-bold text-primary-foreground">Laura Farms</span>
            </div>
            <p className="text-primary-foreground/50 text-sm">© 2026 Laura Farms. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
