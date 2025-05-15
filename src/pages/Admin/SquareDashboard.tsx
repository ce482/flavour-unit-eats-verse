
import { useState, useEffect } from 'react';
import { squareClient, LOCATION_ID, listAllSquareOrders } from '@/integrations/square/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Define proper types for Square entities
type SquareCustomer = {
  id: string;
  companyName?: string | null;
  givenName?: string | null;
  familyName?: string | null;
  emailAddress?: string | null;
  phoneNumber?: string | null;
  createdAt?: string;
  referenceId?: string | null;
};

type SquareOrder = {
  id: string;
  customerId?: string | null;
  createdAt?: string;
  state?: string;
  metadata?: Record<string, string>;
  customer?: SquareCustomer;
  source?: { name?: string } | null;
};

const SquareDashboard = () => {
  const [customers, setCustomers] = useState<SquareCustomer[]>([]);
  const [orders, setOrders] = useState<SquareOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllOrders, setShowAllOrders] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch wholesale customers (with reference ID starting with "wholesale_")
      const customersResponse = await squareClient.customersApi.listCustomers();
      
      // Cast and filter customers
      const allCustomers = customersResponse.result.customers || [];
      const wholesaleCustomers = allCustomers
        .filter(customer => customer.referenceId?.startsWith('wholesale_'))
        .map(customer => ({
          id: customer.id || '',  // Ensure id is always a string
          companyName: customer.companyName,
          givenName: customer.givenName,
          familyName: customer.familyName,
          emailAddress: customer.emailAddress,
          phoneNumber: customer.phoneNumber,
          createdAt: customer.createdAt,
          referenceId: customer.referenceId
        }));
      
      setCustomers(wholesaleCustomers);
      
      // Fetch orders - either all orders or just wholesale ones
      let ordersResponse;
      
      if (showAllOrders) {
        // Get all orders
        const allOrdersResult = await listAllSquareOrders();
        if (!allOrdersResult.success) throw new Error("Failed to fetch all orders");
        ordersResponse = { result: { orders: allOrdersResult.orders } };
      } else {
        // Get just wholesale web form orders
        ordersResponse = await squareClient.ordersApi.searchOrders({
          locationIds: [LOCATION_ID],
          query: {
            filter: {
              sourceFilter: {
                sourceNames: ["Wholesale Web Form"]
              }
            }
          }
        });
      }
      
      // Map customers to orders and ensure they match our type
      const squareOrders = ordersResponse.result.orders || [];
      const ordersWithCustomers = squareOrders.map(order => {
        const customer = wholesaleCustomers.find(c => c.id === order.customerId);
        return {
          id: order.id || '',  // Ensure id is always a string
          customerId: order.customerId,
          createdAt: order.createdAt,
          state: order.state,
          metadata: order.metadata,
          source: order.source,
          customer: customer
        };
      });
      
      setOrders(ordersWithCustomers);
    } catch (err) {
      console.error("Error fetching data from Square:", err);
      setError("Failed to load data from Square. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showAllOrders]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString() + ' ' +
      new Date(dateString).toLocaleTimeString();
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container-wide">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Square Dashboard</h1>
            <p className="text-gray-600">View and manage your wholesale inquiries and orders.</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <strong>Error:</strong> {error}
              <p>Make sure you've set the correct Square API credentials in src/integrations/square/client.ts</p>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <Button 
                onClick={() => setShowAllOrders(!showAllOrders)}
                variant={showAllOrders ? "default" : "outline"}
                className="mr-2"
              >
                {showAllOrders ? "Show Only Wholesale Orders" : "Show All Orders"}
              </Button>
              
              <Button 
                onClick={fetchData}
                variant="outline"
              >
                Refresh Data
              </Button>
            </div>
          </div>

          <Tabs defaultValue="inquiries">
            <TabsList className="mb-6">
              <TabsTrigger value="inquiries">Wholesale Inquiries</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inquiries">
              <h2 className="text-xl font-bold mb-4">
                {showAllOrders ? "All Orders" : "Wholesale Inquiries"}
                {!loading && <span className="text-sm font-normal ml-2">({orders.length} found)</span>}
              </h2>
              {loading ? (
                <p>Loading orders...</p>
              ) : orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Business</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Product Line</TableHead>
                        <TableHead>Minimum Order</TableHead>
                        <TableHead>Pickup Issue</TableHead>
                        <TableHead>Volume</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{formatDate(order.metadata?.form_submission_date || order.createdAt)}</TableCell>
                          <TableCell>{order.source?.name || 'N/A'}</TableCell>
                          <TableCell>
                            {order.customer?.companyName || 'N/A'}
                            <div className="text-xs text-gray-500">{order.metadata?.business_type}</div>
                          </TableCell>
                          <TableCell>
                            {order.customer?.givenName} {order.customer?.familyName}
                            <div className="text-xs">{order.customer?.emailAddress}</div>
                            {order.customer?.phoneNumber && (
                              <div className="text-xs">{order.customer.phoneNumber}</div>
                            )}
                          </TableCell>
                          <TableCell>{order.metadata?.interested_product_line || 'N/A'}</TableCell>
                          <TableCell>{order.metadata?.accepts_minimum_order || 'N/A'}</TableCell>
                          <TableCell>{order.metadata?.pickup_issue || 'N/A'}</TableCell>
                          <TableCell>
                            <div>Daily/Weekly: {order.metadata?.daily_weekly_volume || 'N/A'}</div>
                            <div>Expected: {order.metadata?.expected_ordering_volume || 'N/A'}</div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p>No orders found. {!showAllOrders && "Try clicking 'Show All Orders' to see if there are any non-wholesale orders."}</p>
              )}
            </TabsContent>
            
            <TabsContent value="customers">
              <h2 className="text-xl font-bold mb-4">
                Wholesale Customers
                {!loading && <span className="text-sm font-normal ml-2">({customers.length} found)</span>}
              </h2>
              {loading ? (
                <p>Loading customers...</p>
              ) : customers.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business Name</TableHead>
                        <TableHead>Contact Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Created</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>{customer.companyName || 'N/A'}</TableCell>
                          <TableCell>{customer.givenName} {customer.familyName}</TableCell>
                          <TableCell>{customer.emailAddress || 'N/A'}</TableCell>
                          <TableCell>{customer.phoneNumber || 'N/A'}</TableCell>
                          <TableCell>{formatDate(customer.createdAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p>No wholesale customers found.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SquareDashboard;
