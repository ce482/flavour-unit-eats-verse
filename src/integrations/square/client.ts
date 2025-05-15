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

// Helper function to create a customer in Square
export async function createSquareCustomer(data: {
  businessName?: string;
  contactEmail: string;
  contactName: string;
  contactPhone?: string;
}) {
  try {
    console.log("Creating Square customer with data:", data);
    
    // Extract first and last name
    const nameParts = data.contactName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    // Fix: Make sure phone number is formatted correctly or omitted if empty
    const phoneNumber = data.contactPhone && data.contactPhone.trim() !== '' ? data.contactPhone : undefined;
    
    const customerData: any = {
      emailAddress: data.contactEmail,
      givenName: firstName,
      familyName: lastName,
    };
    
    // Only add phone if it's provided and not empty
    if (phoneNumber) {
      customerData.phoneNumber = phoneNumber;
    }
    
    // Only add company name for wholesale customers
    if (data.businessName) {
      customerData.companyName = data.businessName;
      customerData.referenceId = `wholesale_${Date.now()}`;
    } else {
      customerData.referenceId = `retail_${Date.now()}`;
    }
    
    console.log("Square customer data being sent:", customerData);
    const response = await squareClient.customersApi.createCustomer(customerData);

    console.log("Square customer creation response:", response);

    if (!response.result.customer?.id) {
      throw new Error("Failed to create customer: No customer ID returned");
    }

    return {
      success: true,
      customerId: response.result.customer.id,
      data: response.result
    };
  } catch (error: any) {
    // Enhanced error logging
    console.error("Error creating Square customer:", error);
    console.error("Error details:", error?.errors || error?.message || "Unknown error");
    return {
      success: false,
      error: error?.errors || error?.message || "Unknown error",
      details: error
    };
  }
}

// Helper function to create a wholesale inquiry as a Square order
export async function createSquareOrder(data: {
  customerId: string;
  businessName: string;
  businessType: string;
  interestedProductLine: string;
  acceptsMinimumOrder: boolean;
  pickupIssue: boolean;
  dailyWeeklyVolume: string;
  expectedOrderingVolume: string;
  comments: string;
}) {
  try {
    console.log("Creating Square order with data:", data);
    
    // Ensure all required fields are present
    if (!data.customerId) {
      throw new Error("Customer ID is required");
    }
    
    const response = await squareClient.ordersApi.createOrder({
      order: {
        locationId: LOCATION_ID,
        customerId: data.customerId,
        source: {
          name: "Wholesale Web Form"
        },
        metadata: {
          business_name: data.businessName,
          business_type: data.businessType,
          interested_product_line: data.interestedProductLine,
          accepts_minimum_order: data.acceptsMinimumOrder ? "Yes" : "No",
          pickup_issue: data.pickupIssue ? "Yes" : "No", 
          daily_weekly_volume: data.dailyWeeklyVolume,
          expected_ordering_volume: data.expectedOrderingVolume,
          comments: data.comments || "None",
          form_submission_date: new Date().toISOString(),
          form_type: "wholesale_inquiry"
        }
      }
    });

    console.log("Square order creation response:", response);

    return {
      success: true,
      orderId: response.result.order?.id,
      data: response.result
    };
  } catch (error) {
    console.error("Error creating Square order:", error);
    return {
      success: false,
      error
    };
  }
}

// Helper function to create a checkout link directly with our edge function
export async function createCheckout(data: {
  customerId?: string;
  items: Array<{name: string; quantity: number; price: number;}>;
  customerInfo: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone?: string;
  };
  shippingMethod: string;
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
        customerId: data.customerId, // This can now be undefined, and the edge function will create a customer
        items: data.items,
        customerInfo: data.customerInfo,
        shippingMethod: data.shippingMethod,
        metadata: {
          shippingAddress: `${data.customerInfo.address}, ${data.customerInfo.city}, ${data.customerInfo.state} ${data.customerInfo.zipCode}`,
          orderSource: "website"
        }
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error("Error creating checkout:", result);
      throw new Error(result.error || "Failed to create checkout");
    }
    
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

// Function to create a checkout payment link with Square
export async function createSquareCheckoutLink(items: Array<{name: string; quantity: number; price: number;}>, customerInfo: {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}) {
  try {
    console.log("Creating Square checkout link");
    
    // Format line items for Square checkout
    const lineItems = items.map(item => ({
      quantity: item.quantity.toString(),
      basePriceMoney: {
        amount: BigInt(Math.round(item.price * 100)), // Convert to cents and to BigInt
        currency: "USD"
      },
      name: item.name
    }));
    
    // Calculate total amount
    const totalAmount = Math.round(items.reduce((total, item) => total + (item.price * item.quantity), 0) * 100);
    console.log("Total amount for checkout:", totalAmount);
    
    // Create the checkout
    const response = await squareClient.checkoutApi.createPaymentLink({
      idempotencyKey: `payment_${Date.now()}`,
      quickPay: {
        name: "Flavour Unit Order",
        priceMoney: {
          amount: BigInt(totalAmount),
          currency: "USD"
        },
        locationId: LOCATION_ID
      },
      checkoutOptions: {
        redirectUrl: window.location.origin + "/payment-success",
        merchantSupportEmail: "support@flavourunit.com",
        askForShippingAddress: true
      }
    });

    console.log("Square checkout response:", response);

    if (!response.result.paymentLink?.url) {
      throw new Error("Failed to create checkout link");
    }

    return {
      success: true,
      url: response.result.paymentLink.url,
      data: response.result
    };
  } catch (error: any) {
    // Enhanced error logging
    console.error("Error creating Square checkout link:", error);
    console.error("Error details:", error?.errors || error?.message || "Unknown error");
    return {
      success: false,
      error: error?.errors || error?.message || "Unknown error",
      details: error
    };
  }
}

// New function to create a retail customer order in Square
export async function createRetailOrder(data: {
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  shippingMethod: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}) {
  try {
    console.log("Creating retail Square order with data:", data);
    
    // Ensure all required fields are present
    if (!data.customerId) {
      throw new Error("Customer ID is required");
    }

    // Format line items for Square
    const lineItems = data.items.map(item => ({
      quantity: item.quantity.toString(),
      basePriceMoney: {
        amount: BigInt(Math.round(item.price * 100)), // Convert to cents and to BigInt
        currency: "USD"
      },
      name: item.name
    }));
    
    // Calculate the total
    const total = data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const response = await squareClient.ordersApi.createOrder({
      order: {
        locationId: LOCATION_ID,
        customerId: data.customerId,
        lineItems,
        source: {
          name: "Online Store"
        },
        metadata: {
          customer_name: data.customerName,
          customer_email: data.customerEmail,
          customer_phone: data.customerPhone || "Not provided",
          shipping_address: data.shippingAddress,
          shipping_method: data.shippingMethod,
          total_amount: total.toFixed(2),
          order_date: new Date().toISOString(),
          order_type: "retail_order"
        },
        state: "OPEN"
      }
    });

    console.log("Square retail order creation response:", response);

    return {
      success: true,
      orderId: response.result.order?.id,
      data: response.result
    };
  } catch (error) {
    console.error("Error creating Square retail order:", error);
    return {
      success: false,
      error
    };
  }
}

// Create a test order with fake data for demo purposes
export async function createTestOrder() {
  try {
    // First create a test customer
    const customerResponse = await createSquareCustomer({
      businessName: "Test Bakery",
      contactEmail: "test@example.com",
      contactName: "John Doe",
      contactPhone: "555-555-5555"
    });

    if (!customerResponse.success || !customerResponse.customerId) {
      throw new Error("Failed to create test customer");
    }

    // Then create a test order
    const orderResponse = await createSquareOrder({
      customerId: customerResponse.customerId,
      businessName: "Test Bakery",
      businessType: "Bakery",
      interestedProductLine: "Egg Rolls",
      acceptsMinimumOrder: true,
      pickupIssue: false,
      dailyWeeklyVolume: "50 units weekly",
      expectedOrderingVolume: "200 units monthly",
      comments: "This is a test order created from the admin dashboard"
    });

    return {
      success: orderResponse.success,
      orderId: orderResponse.orderId,
      customerId: customerResponse.customerId,
      message: "Test order created successfully",
      data: orderResponse.data
    };
  } catch (error) {
    console.error("Error creating test order:", error);
    return {
      success: false,
      error
    };
  }
}

// Helper function to list all orders from Square
export async function listAllSquareOrders() {
  try {
    const response = await squareClient.ordersApi.searchOrders({
      locationIds: [LOCATION_ID],
      query: {
        filter: {
          sourceFilter: {
            sourceNames: ["Wholesale Web Form", "Online Store"]
          }
        }
      }
    });
    
    return {
      success: true,
      orders: response.result.orders || [],
    };
  } catch (error) {
    console.error("Error listing all Square orders:", error);
    return {
      success: false,
      error
    };
  }
}

// Function to get the Square dashboard URL
export function getSquareDashboardUrl() {
  return "https://squareup.com/dashboard/orders";
}
