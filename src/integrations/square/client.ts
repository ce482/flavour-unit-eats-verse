
// Square API integration client
import { Client, Environment } from 'square';

// Square credentials from your developer dashboard
const SQUARE_ACCESS_TOKEN = "EAAAI_K8NORSKj_4gd-Dnk-IIcHHKI2u0NQ36HSfoUaOdU2tMfgc1Xx8m2dzL1tL";
const SQUARE_LOCATION_ID = "LX4QR03YJRQ76";

// Initialize Square client
export const squareClient = new Client({
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: Environment.Production, // Use Environment.Sandbox for testing
});

export const LOCATION_ID = SQUARE_LOCATION_ID;

// Helper function to create a checkout link directly with our edge function
export async function createCheckout(data: {
  items: Array<{name: string; quantity: number; price: number;}>;
  customerInfo: {
    email: string;
    firstName: string;
    lastName: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    phone?: string;
  };
}) {
  try {
    console.log("Creating checkout with data:", data);
    
    // Call our edge function to create the checkout
    const response = await fetch(`${window.location.origin}/functions/v1/create-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: data.items,
        customerInfo: data.customerInfo
      })
    });
    
    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      let errorData;
      
      // Properly handle different response types
      if (contentType && contentType.includes("application/json")) {
        errorData = await response.json();
      } else {
        // Handle non-JSON responses (like HTML error pages)
        const text = await response.text();
        errorData = { error: `Server returned non-JSON response: ${text.substring(0, 100)}...` };
      }
      
      console.error("Error creating checkout:", errorData);
      throw new Error(errorData.error || "Failed to create checkout");
    }
    
    const result = await response.json();
    
    return {
      success: true,
      checkoutUrl: result.checkoutUrl,
      orderId: result.orderId
    };
  } catch (error: any) {
    console.error("Error creating checkout:", error);
    return {
      success: false,
      error: error.message || "Unknown error"
    };
  }
}
