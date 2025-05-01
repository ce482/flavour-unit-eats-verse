
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address, city, state, zipCode } = await req.json();

    // Basic validation first
    if (!address || !city || !state || !zipCode) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: "All address fields are required" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Basic US zip code format validation (5 digits or 5+4)
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(zipCode)) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: "Invalid ZIP code format" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // State validation (US States and territories)
    const validStates = [
      "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
      "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
      "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
      "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
      "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
      "DC", "AS", "GU", "MP", "PR", "VI"
    ];
    
    if (!validStates.includes(state.toUpperCase())) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: "Invalid state code" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Simple length checks
    if (address.length < 5) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: "Address seems too short" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (city.length < 2) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: "City name seems too short" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // In a real implementation, you would call an actual address verification API here
    // For now, we'll simulate an API call and consider addresses valid if they pass basic validation
    
    // Simulate checking for commonly invalid addresses
    if (
      address.toLowerCase().includes("test") || 
      address.toLowerCase().includes("invalid") ||
      address.toLowerCase().includes("123 fake")
    ) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: "This appears to be a test address" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return success with formatted address
    return new Response(
      JSON.stringify({
        valid: true,
        message: "Address appears to be valid",
        formattedAddress: {
          address: address.trim(),
          city: city.trim(),
          state: state.toUpperCase().trim(),
          zipCode: zipCode.trim()
        }
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        valid: false, 
        message: `Error validating address: ${error.message}` 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );
  }
});
