
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
    
    // Square API credentials - get from environment variables
    const appId = Deno.env.get("SQUARE_APP_ID");
    const accessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    const locationId = Deno.env.get("SQUARE_LOCATION_ID");
    
    // Validate credentials
    if (!appId || !accessToken || !locationId) {
      console.error("Missing Square API credentials");
      return new Response(
        JSON.stringify({ error: "Missing payment processor credentials" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }
    
    // Generate random idempotency key
    const idempotencyKey = crypto.randomUUID();
    
    // Calculate the total amount with shipping if provided
    const totalAmount = shippingCost ? amount + (shippingCost * 100) : amount;
    
    console.log("Creating Square payment with the following details:");
    console.log(`- Service: ${service || "Legacy Kitchen Solutions"}`);
    console.log(`- Amount: ${totalAmount} cents (${totalAmount/100} USD)`);
    console.log(`- Customer: ${customerName}, ${customerEmail}`);
    console.log(`- Using location ID: ${locationId}`);
    
    // Create a checkout URL using Square's API
    const response = await fetch("https://connect.squareup.com/v2/online-checkout/payment-links", {
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
          merchant_support_email: "info@chefgang.com", // Use a valid email address
          ask_for_shipping_address: true
        },
        order: {
          location_id: locationId,
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

    console.log(`Square API response status: ${response.status}`);
    
    const responseText = await response.text();
    console.log(`Square API response body: ${responseText}`);
    
    // Try to parse the response
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse Square API response:", e);
      return new Response(
        JSON.stringify({ error: "Invalid response from payment provider" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    // Handle error responses
    if (!response.ok) {
      console.error("Square API error:", JSON.stringify(responseData));
      
      // Return a more user-friendly error message
      return new Response(
        JSON.stringify({ 
          error: "Payment processing error", 
          details: responseData?.errors?.[0]?.detail || "Unknown error occurred"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }
    
    // Log success
    console.log("Payment link created successfully:", responseData.payment_link.id);
    console.log("Redirecting customer to:", responseData.payment_link.url);
    
    // Return the checkout URL for the frontend to redirect to
    return new Response(
      JSON.stringify({ 
        url: responseData.payment_link.url,
        id: responseData.payment_link.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating payment link:", error);
    return new Response(
      JSON.stringify({ 
        error: "Payment processing failed", 
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
