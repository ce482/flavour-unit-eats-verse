
// List of states we don't ship to due to extreme heat
export const EXCLUDED_STATES = [
  'AK', // Alaska
  'HI', // Hawaii
  'AZ', // Arizona
  'FL', // Florida
  'CA', // California
  'NV', // Nevada
  'TX', // Texas
  'GA', // Georgia
  'MS'  // Mississippi
];

// Full names mapping for better user experience
export const STATE_NAMES: Record<string, string> = {
  'AK': 'Alaska',
  'HI': 'Hawaii',
  'AZ': 'Arizona',
  'FL': 'Florida',
  'CA': 'California',
  'NV': 'Nevada',
  'TX': 'Texas',
  'GA': 'Georgia',
  'MS': 'Mississippi',
  // Add other US states here
  'AL': 'Alabama',
  'AR': 'Arkansas',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'DC': 'District of Columbia',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PA': 'Pennsylvania',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming'
};

// Shipping methods configuration
export const SHIPPING_METHODS = {
  standard: { 
    name: 'Standard Shipping', 
    price: 10, 
    description: '$10.00 - 5-7 business days' 
  },
  fedex_2day: { 
    name: 'FedEx 2-Day Shipping', 
    price: 19.99, 
    description: 'Guaranteed delivery in 2 business days' 
  },
};

// Convert state full name to abbreviation
export const getStateAbbreviation = (fullName: string): string | null => {
  const entry = Object.entries(STATE_NAMES).find(([_, name]) => 
    name.toLowerCase() === fullName.toLowerCase()
  );
  return entry ? entry[0] : null;
};

// Check if shipping is allowed to a state
export const isShippingAllowed = (stateCode: string): boolean => {
  return !EXCLUDED_STATES.includes(stateCode.toUpperCase());
};
