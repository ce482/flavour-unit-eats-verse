
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { service, customerName, customerEmail, amount = 7700, shippingMethod, shippingCost } = await req.json();
    
    // Square API credentials
    const appId = Deno.env.get("SQUARE_APP_ID") || "";
    const accessToken = Deno.env.get("SQUARE_ACCESS_TOKEN") || "";
    const locationId = Deno.env.get("SQUARE_LOCATION_ID") || "";
    
    // Remove any potential whitespace from the location ID
    const cleanLocationId = locationId.trim();
    
    console.log(`Creating payment session for ${service || "Legacy Kitchen Solutions"} - ${amount}`);
    console.log(`Using location ID: "${cleanLocationId}"`);
    
    // Generate random idempotency key to ensure uniqueness for this payment attempt
    const idempotencyKey = crypto.randomUUID();
    
    // Calculate the total amount with shipping if provided
    const totalAmount = shippingCost ? amount + (shippingCost * 100) : amount;
    
    // Create a checkout URL using Square's API
    const response = await fetch("https://connect.squareupsandbox.com/v2/online-checkout/payment-links", {
      method: "POST",
      headers: {
        "Square-Version": "2023-09-25",
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idempotency_key: idempotencyKey,
        checkout_options: {
          redirect_url: `${req.headers.get("origin")}/payment-success?link_id={link_id}`,
          merchant_support_email: "support@example.com", // Use a default support email
          ask_for_shipping_address: true
        },
        order: {
          location_id: cleanLocationId,
          line_items: [
            {
              name: service || "Legacy Kitchen Solutions",
              quantity: "1",
              base_price_money: {
                amount: totalAmount,
                currency: "USD"
              }
            }
          ]
        },
        pre_populated_data: {
          buyer_email: customerEmail,
          buyer_name: customerName
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Square API error:", JSON.stringify(errorData));
      throw new Error(`Square API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    console.log("Square payment link created successfully:", result.payment_link.id);
    
    // Return the checkout URL for the frontend to redirect to
    return new Response(
      JSON.stringify({ 
        url: result.payment_link.url,
        id: result.payment_link.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating Square payment link:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
