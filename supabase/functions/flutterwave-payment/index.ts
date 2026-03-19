import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const FLW_SECRET_KEY = Deno.env.get("FLUTTERWAVE_SECRET_KEY");
  if (!FLW_SECRET_KEY) {
    return new Response(JSON.stringify({ error: "Flutterwave secret key not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const token = authHeader.replace("Bearer ", "");
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
  if (claimsError || !claimsData?.claims) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const userId = claimsData.claims.sub;

  try {
    const { action, ...body } = await req.json();

    if (action === "initialize") {
      const { amount, package_name, returns_percent, duration_months, email, name, redirect_url } = body;
      const tx_ref = `LF-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

      // Create pending investment
      const { error: insertError } = await supabase.from("investments").insert({
        user_id: userId,
        package_name,
        amount,
        returns_percent,
        duration_months,
        status: "pending",
        flutterwave_tx_ref: tx_ref,
        maturity_date: new Date(Date.now() + duration_months * 30 * 24 * 60 * 60 * 1000).toISOString(),
      });

      if (insertError) {
        throw new Error(`Failed to create investment: ${insertError.message}`);
      }

      // Initialize Flutterwave payment
      const flwResponse = await fetch("https://api.flutterwave.com/v3/payments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tx_ref,
          amount,
          currency: "USD",
          redirect_url,
          customer: { email, name },
          customizations: {
            title: "Laura Farms Investment",
            description: `${package_name} package - ${returns_percent}% returns over ${duration_months} months`,
            logo: "https://laurafarms.com/logo.png",
          },
        }),
      });

      const flwData = await flwResponse.json();
      if (flwData.status !== "success") {
        throw new Error(`Flutterwave error: ${JSON.stringify(flwData)}`);
      }

      return new Response(JSON.stringify({ payment_link: flwData.data.link, tx_ref }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "verify") {
      const { transaction_id, tx_ref } = body;

      const verifyResponse = await fetch(
        `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
        {
          headers: { Authorization: `Bearer ${FLW_SECRET_KEY}` },
        }
      );

      const verifyData = await verifyResponse.json();

      if (
        verifyData.status === "success" &&
        verifyData.data.status === "successful" &&
        verifyData.data.tx_ref === tx_ref
      ) {
        // Use service role to update investment status
        const serviceClient = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );

        await serviceClient
          .from("investments")
          .update({
            status: "active",
            flutterwave_tx_id: transaction_id,
          })
          .eq("flutterwave_tx_ref", tx_ref);

        return new Response(JSON.stringify({ status: "success", message: "Payment verified" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ status: "failed", message: "Payment verification failed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Flutterwave payment error:", error);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
