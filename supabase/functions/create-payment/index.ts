
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Client, Environment } from "https://cdn.skypack.dev/square@25.0.0?dts";

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
    // Parse request body
    const { items, customerInfo } = await req.json();
    
    console.log("Payment request received:", { items, customerInfo });
    
    // Square API credentials
    const accessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    const locationId = Deno.env.get("SQUARE_LOCATION_ID");
    
    console.log("Square credentials check:");
    console.log("- Access Token exists:", !!accessToken);
    console.log("- Location ID exists:", !!locationId);
    
    // Validate credentials
    if (!accessToken || !locationId) {
      console.error("Missing Square API credentials");
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Missing payment processor credentials" 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }
    
    // Initialize Square client
    const squareClient = new Client({
      accessToken,
      environment: Environment.Production, // Use Environment.Sandbox for testing
    });
    
    // Create a new customer in Square
    console.log("Creating new customer");
    const customerResponse = await squareClient.customersApi.createCustomer({
      emailAddress: customerInfo.email,
      givenName: customerInfo.firstName || "",
      familyName: customerInfo.lastName || "",
      phoneNumber: customerInfo.phone || undefined,
      referenceId: `order_${Date.now()}`,
    });
    
    if (customerResponse.statusCode !== 200) {
      console.error("Error creating Square customer:", customerResponse);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to create customer record",
          details: customerResponse
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500
        }
      );
    }
    
    const customerId = customerResponse.result.customer?.id;
    console.log("Customer created with ID:", customerId);
    
    // Generate idempotency key
    const idempotencyKey = crypto.randomUUID();
    
    // Format line items for Square checkout
    const lineItems = items.map(item => ({
      quantity: item.quantity.toString(),
      basePriceMoney: {
        amount: BigInt(Math.round(item.price * 100)), // Convert to cents and to BigInt
        currency: "USD"
      },
      name: item.name
    }));
    
    console.log("Creating order with line items:", JSON.stringify(lineItems, (_, v) => 
      typeof v === 'bigint' ? v.toString() : v));

    const origin = req.headers.get("origin") || "http://localhost:5173";
    console.log(`- Origin for redirect URL: ${origin}`);
    
    // Create order
    const orderInput = {
      order: {
        locationId,
        customerId,
        lineItems,
      },
      idempotencyKey
    };
    
    console.log("Creating Square order...");
    const orderResponse = await squareClient.ordersApi.createOrder(orderInput);
    
    if (!orderResponse.result.order?.id) {
      console.error("Failed to create Square order:", orderResponse);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to create order",
          details: orderResponse
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500
        }
      );
    }
    
    const orderId = orderResponse.result.order.id;
    console.log("Order created successfully with ID:", orderId);
    
    // Create checkout link
    console.log("Creating checkout link for order:", orderId);
    const checkoutResponse = await squareClient.checkoutApi.createPaymentLink({
      idempotencyKey: `checkout_${idempotencyKey}`,
      order: {
        orderId
      },
      checkoutOptions: {
        redirectUrl: `${origin}/payment-success?order_id=${orderId}`,
        merchantSupportEmail: "info@flavourunit.com",
        askForShippingAddress: true
      }
    });

    console.log("Checkout response status:", checkoutResponse.status);
    
    if (!checkoutResponse.result.paymentLink?.url) {
      console.error("Failed to create checkout link:", checkoutResponse);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to create checkout link",
          details: checkoutResponse
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500
        }
      );
    }
    
    console.log("Checkout link created successfully:", checkoutResponse.result.paymentLink.url);
    
    // Return the checkout URL and order info
    return new Response(
      JSON.stringify({
        success: true,
        checkoutUrl: checkoutResponse.result.paymentLink.url,
        orderId: orderId
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );
  } catch (error) {
    console.error("Error processing payment:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});
