
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders, Order as OrderType, OrderItem } from '../hooks/useOrders';
import { useAdmin } from '../hooks/useAdmin';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDistance } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Orders = () => {
  const navigate = useNavigate();
  const { user, isLoading: isLoadingAuth } = useAuth();
  const { isAdmin, isLoading: isLoadingAdmin, error: adminError } = useAdmin();
  const { orders, isLoadingOrders, updateOrderStatus } = useOrders();
  
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Wait until both auth and admin checks are complete
    if (isLoadingAuth || isLoadingAdmin) {
      return;
    }

    // Check if user is authenticated
    if (!user) {
      toast.error('Please sign in to access this page');
      navigate('/auth');
      return;
    }

    // If authenticated but not admin, redirect
    if (!isAdmin) {
      toast.error('You need administrator access for this page');
      navigate('/');
    }

    // Show admin errors if any
    if (adminError) {
      console.error('Admin check error:', adminError);
    }
  }, [isAdmin, isLoadingAdmin, isLoadingAuth, user, adminError, navigate]);

  const handleViewOrderDetails = (order: OrderType) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleMarkAsCompleted = async (orderId: string) => {
    try {
      await updateOrderStatus.mutateAsync({ orderId, status: 'completed' });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Show loading until both auth and admin status are confirmed
  if (isLoadingAuth || isLoadingAdmin) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-20">
          <div className="container-wide">
            <p>Loading authentication status...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Don't render orders content if not admin
  if (!isAdmin) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-20">
          <div className="container-wide">
            <p>You need administrator access to view this page.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20">
        <div className="container-wide">
          <h1 className="text-4xl font-bold mb-8">Admin Orders Dashboard</h1>
          
          {isLoadingOrders ? (
            <p>Loading orders...</p>
          ) : orders?.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders?.map((order) => (
                    <TableRow 
                      key={order.id}
                      className={order.order_status === 'completed' ? 'bg-gray-50' : ''}
                    >
                      <TableCell className="font-medium">
                        {order.id.slice(0, 8)}...
                      </TableCell>
                      <TableCell>{order.customer_name}</TableCell>
                      <TableCell>{order.customer_email}</TableCell>
                      <TableCell>
                        {formatDistance(new Date(order.created_at), new Date(), { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                          ${order.order_status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            order.order_status === 'completed' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {order.order_status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {order.order_items?.length || 0} items
                      </TableCell>
                      <TableCell className="text-right">
                        ${order.total_amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewOrderDetails(order)}
                          >
                            View Details
                          </Button>
                          {order.order_status !== 'completed' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="bg-green-50 text-green-700 hover:bg-green-100"
                              onClick={() => handleMarkAsCompleted(order.id)}
                            >
                              Mark Completed
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order ID: {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sm text-gray-500">Customer</h3>
                <p>{selectedOrder?.customer_name}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-500">Email</h3>
                <p>{selectedOrder?.customer_email}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-500">Phone</h3>
                <p>{selectedOrder?.customer_phone || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-500">Date</h3>
                <p>{selectedOrder?.created_at ? new Date(selectedOrder.created_at).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold text-sm text-gray-500">Shipping Address</h3>
                <p>{selectedOrder?.shipping_address}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Order Items</h3>
              <ul className="divide-y">
                {selectedOrder?.order_items?.map((item: OrderItem) => (
                  <li key={item.id} className="py-2 flex justify-between">
                    <div>
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <p className="font-semibold">Total</p>
              <p className="font-semibold">${selectedOrder?.total_amount.toFixed(2)}</p>
            </div>
            
            {selectedOrder?.order_status !== 'completed' && (
              <div className="pt-2">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    if (selectedOrder) {
                      handleMarkAsCompleted(selectedOrder.id);
                      setIsDialogOpen(false);
                    }
                  }}
                >
                  Mark as Completed
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
};

export default Orders;
