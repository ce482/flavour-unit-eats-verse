
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

// Function to create Square checkout session
export async function createCheckout(data: {
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  customerInfo: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  };
  shippingOption?: string;
}) {
  try {
    console.log("Creating Square checkout with data:", data);
    
    // Calculate total amount in cents (Square requires integer amounts in the smallest unit)
    const totalAmountCents = Math.round(
      data.items.reduce((acc, item) => acc + (item.price * item.quantity * 100), 0)
    );
    
    // Create a unique idempotency key to prevent duplicate checkouts
    const idempotencyKey = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    
    console.log("Calculated total amount (cents):", totalAmountCents);
    console.log("Using idempotency key:", idempotencyKey);
    
    // Create checkout request using quickPay for simplicity
    const checkoutResponse = await squareClient.checkoutApi.createPaymentLink({
      idempotencyKey: idempotencyKey,
      quickPay: {
        name: "The Flavour Unit Order",
        priceMoney: {
          amount: BigInt(totalAmountCents), // Square requires BigInt for amount
          currency: 'USD'
        },
        locationId: LOCATION_ID
      },
      checkoutOptions: {
        redirectUrl: `${window.location.origin}/payment-success`,
        merchantSupportEmail: "orders@flavouregg.com",
        askForShippingAddress: true
      },
      prePopulatedData: {
        buyerEmail: data.customerInfo.email,
        buyerAddress: {
          firstName: data.customerInfo.firstName,
          lastName: data.customerInfo.lastName
        }
      }
    });

    console.log("Square checkout response:", checkoutResponse.result);

    if (checkoutResponse.result.paymentLink?.url) {
      // Store checkout details in session for the success page
      try {
        const checkoutDetails = {
          customerEmail: data.customerInfo.email,
          items: data.items,
          shippingMethod: data.shippingOption,
          orderTotal: data.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        };
        sessionStorage.setItem('checkout_details', JSON.stringify(checkoutDetails));
      } catch (e) {
        console.warn("Failed to save checkout details to session storage:", e);
      }
      
      return {
        success: true,
        checkoutUrl: checkoutResponse.result.paymentLink.url
      };
    } else {
      throw new Error("Failed to create checkout URL");
    }
  } catch (error) {
    console.error("Square checkout error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error creating checkout"
    };
  }
}
