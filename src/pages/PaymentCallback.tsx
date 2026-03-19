import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");

  useEffect(() => {
    const verify = async () => {
      const txRef = searchParams.get("tx_ref");
      const transactionId = searchParams.get("transaction_id");
      const flwStatus = searchParams.get("status");

      if (flwStatus !== "successful" || !transactionId || !txRef) {
        setStatus("failed");
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke("flutterwave-payment", {
          body: { action: "verify", transaction_id: transactionId, tx_ref: txRef },
        });

        if (error || data?.status !== "success") {
          setStatus("failed");
        } else {
          setStatus("success");
        }
      } catch {
        setStatus("failed");
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-elevated)] p-10 text-center max-w-md w-full">
        {status === "verifying" && (
          <>
            <Loader2 className="h-16 w-16 text-primary mx-auto mb-6 animate-spin" />
            <h1 className="text-2xl font-bold text-foreground font-display mb-2">Verifying Payment</h1>
            <p className="text-muted-foreground">Please wait while we confirm your transaction...</p>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-foreground font-display mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground mb-8">Your investment is now active. You can track it on your dashboard.</p>
            <Button asChild size="lg" className="w-full">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </>
        )}
        {status === "failed" && (
          <>
            <XCircle className="h-16 w-16 text-destructive mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-foreground font-display mb-2">Payment Failed</h1>
            <p className="text-muted-foreground mb-8">Something went wrong. Please try again or contact support.</p>
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link to="/packages">Back to Packages</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback;
