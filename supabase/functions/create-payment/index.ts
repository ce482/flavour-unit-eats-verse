
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
    const { 
      customerId,
      items,
      customerInfo,
      shippingMethod,
      metadata = {}
    } = await req.json();
    
    console.log("Payment request received:", { customerId, items, customerInfo, shippingMethod });
    
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
    
    // First, create or retrieve the customer
    let customerId_to_use = customerId;
    
    if (!customerId_to_use) {
      console.log("No customer ID provided, creating new customer");
      try {
        // Extract first and last name
        const nameParts = customerInfo.firstName && customerInfo.lastName ? 
          [customerInfo.firstName, customerInfo.lastName] : 
          (customerInfo.name ? customerInfo.name.split(' ') : ['Guest']);
        
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        // Fix: Make sure phone number is formatted correctly or omitted if empty
        const phoneNumber = customerInfo.phone && customerInfo.phone.trim() !== '' ? 
          customerInfo.phone : undefined;
        
        const customerData = {
          emailAddress: customerInfo.email,
          givenName: firstName,
          familyName: lastName,
          ...(phoneNumber && { phoneNumber }),
          referenceId: `retail_${Date.now()}`
        };
        
        console.log("Creating Square customer with data:", customerData);
        
        const response = await squareClient.customersApi.createCustomer(customerData);
        console.log("Square customer creation response:", response);
        
        if (!response.result.customer?.id) {
          throw new Error("Failed to create customer: No customer ID returned");
        }
        
        customerId_to_use = response.result.customer.id;
        console.log("New customer created with ID:", customerId_to_use);
      } catch (error) {
        console.error("Error creating Square customer:", error);
        return new Response(
          JSON.stringify({
            success: false,
            error: "Failed to create customer record",
            details: error instanceof Error ? error.message : "Unknown error"
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500
          }
        );
      }
    }
    
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
    
    // Create order input for the API
    const orderInput = {
      order: {
        locationId,
        customerId: customerId_to_use,
        lineItems,
        metadata: {
          ...metadata,
          origin: origin
        }
      },
      idempotencyKey
    };
    
    console.log("Creating Square order...");
    const orderResponse = await squareClient.ordersApi.createOrder(orderInput);
    
    if (!orderResponse.result.order?.id) {
      console.error("Failed to create Square order:", orderResponse);
      return new Response(
        JSON.stringify({
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
    
    // Create checkout link with the order
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
      },
      prePopulatedData: {
        buyerEmail: customerInfo.email,
        buyerName: `${customerInfo.firstName} ${customerInfo.lastName}`
      }
    });

    console.log("Checkout response status:", checkoutResponse.status);
    
    if (!checkoutResponse.result.paymentLink?.url) {
      console.error("Failed to create checkout link:", checkoutResponse);
      return new Response(
        JSON.stringify({
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
