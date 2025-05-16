
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
    
    // Format line items for Square
    const lineItems = data.items.map(item => ({
      quantity: item.quantity.toString(),
      basePriceMoney: {
        amount: BigInt(Math.round(item.price * 100)), // Convert to cents and then to BigInt
        currency: 'USD'
      },
      name: item.name
    }));

    // Calculate total amount in cents and convert to BigInt
    const totalAmount = BigInt(
      data.items.reduce((acc, item) => acc + Math.round(item.price * item.quantity * 100), 0)
    );

    // Create checkout request
    const checkoutResponse = await squareClient.checkoutApi.createPaymentLink({
      idempotencyKey: `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`,
      quickPay: {
        name: "The Flavour Unit Order",
        priceMoney: {
          amount: totalAmount,
          currency: 'USD'
        },
        locationId: LOCATION_ID
      },
      checkoutOptions: {
        redirectUrl: `${window.location.origin}/payment-success`,
        merchantSupportEmail: "orders@flavouregg.com"
      }
    });

    console.log("Square checkout response:", checkoutResponse.result);

    if (checkoutResponse.result.paymentLink?.url) {
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
