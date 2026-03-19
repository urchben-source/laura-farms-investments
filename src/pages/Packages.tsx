import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const packages = [
  {
    name: "Seedling",
    price: 500,
    duration: "6 months",
    durationMonths: 6,
    returns: "15%",
    returnsNum: 15,
    features: [
      "Minimum $500 investment",
      "15% ROI over 6 months",
      "Monthly progress reports",
      "Crop insurance included",
      "Withdraw after maturity",
    ],
    popular: false,
  },
  {
    name: "Harvest",
    price: 2000,
    duration: "12 months",
    durationMonths: 12,
    returns: "22%",
    returnsNum: 22,
    features: [
      "Minimum $2,000 investment",
      "22% ROI over 12 months",
      "Bi-weekly progress reports",
      "Full crop insurance",
      "Farm visit access",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Estate",
    price: 10000,
    duration: "18 months",
    durationMonths: 18,
    returns: "30%",
    returnsNum: 30,
    features: [
      "Minimum $10,000 investment",
      "30% ROI over 18 months",
      "Weekly detailed reports",
      "Premium insurance coverage",
      "Exclusive farm tours",
      "Dedicated account manager",
      "Early withdrawal option",
    ],
    popular: false,
  },
];

const Packages = () => {
  const [loadingPkg, setLoadingPkg] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInvest = async (pkg: typeof packages[0]) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({ title: "Please log in first", description: "You need an account to invest.", variant: "destructive" });
      navigate("/signup");
      return;
    }

    setLoadingPkg(pkg.name);

    try {
      const { data, error } = await supabase.functions.invoke("flutterwave-payment", {
        body: {
          action: "initialize",
          amount: pkg.price,
          package_name: pkg.name,
          returns_percent: pkg.returnsNum,
          duration_months: pkg.durationMonths,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || "Investor",
          redirect_url: `${window.location.origin}/payment-callback`,
        },
      });

      if (error) throw error;
      if (data?.payment_link) {
        window.location.href = data.payment_link;
      }
    } catch (err: any) {
      toast({ title: "Payment error", description: err.message || "Something went wrong", variant: "destructive" });
    } finally {
      setLoadingPkg(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground font-display mb-4">
              Investment Packages
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Choose the plan that matches your investment goals. All packages include crop insurance and transparent reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`relative rounded-2xl p-8 border transition-shadow ${
                  pkg.popular
                    ? "border-primary bg-card shadow-[var(--shadow-elevated)] scale-105"
                    : "border-border bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)]"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Most Popular
                  </span>
                )}

                <h3 className="text-2xl font-bold font-display text-foreground mb-1">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{pkg.duration} cycle</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">${pkg.price.toLocaleString()}</span>
                  <span className="text-muted-foreground ml-1">min</span>
                </div>

                <div className="mb-2 inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  {pkg.returns} Returns
                </div>

                <ul className="space-y-3 my-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={pkg.popular ? "default" : "outline"}
                  size="lg"
                  disabled={loadingPkg === pkg.name}
                  onClick={() => handleInvest(pkg)}
                >
                  {loadingPkg === pkg.name ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                  ) : (
                    <>Invest Now <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
