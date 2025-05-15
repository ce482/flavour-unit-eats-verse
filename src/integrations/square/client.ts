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
  businessName: string;
  contactEmail: string;
  contactName: string;
  contactPhone?: string;
}) {
  try {
    const response = await squareClient.customersApi.createCustomer({
      companyName: data.businessName,
      emailAddress: data.contactEmail,
      givenName: data.contactName.split(' ')[0] || '',
      familyName: data.contactName.split(' ').slice(1).join(' ') || '',
      phoneNumber: data.contactPhone,
      referenceId: `wholesale_${Date.now()}`, // Fixed: referenceId not reference_id
    });

    return {
      success: true,
      customerId: response.result.customer?.id,
      data: response.result
    };
  } catch (error) {
    console.error("Error creating Square customer:", error);
    return {
      success: false,
      error
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
  comments?: string;
}) {
  try {
    const response = await squareClient.ordersApi.createOrder({
      order: {
        locationId: LOCATION_ID,
        customerId: data.customerId,
        source: {
          name: "Wholesale Web Form"
        },
        metadata: {
          business_type: data.businessType,
          interested_product_line: data.interestedProductLine,
          accepts_minimum_order: data.acceptsMinimumOrder ? "Yes" : "No",
          pickup_issue: data.pickupIssue ? "Yes" : "No", 
          daily_weekly_volume: data.dailyWeeklyVolume,
          expected_ordering_volume: data.expectedOrderingVolume,
          comments: data.comments || "None",
          form_submission_date: new Date().toISOString(),
        }
      }
    });

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
