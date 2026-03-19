import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const packages = [
  {
    name: "Seedling",
    price: 500,
    duration: "6 months",
    returns: "15%",
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
    returns: "22%",
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
    returns: "30%",
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
            {packages.map((pkg) => (
              <div
                key={pkg.name}
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
                  asChild
                  className="w-full"
                  variant={pkg.popular ? "default" : "outline"}
                  size="lg"
                >
                  <Link to="/signup">
                    Invest Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
