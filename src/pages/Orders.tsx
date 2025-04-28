
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import { useAdmin } from '../hooks/useAdmin';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from 'date-fns';

const Orders = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: isLoadingAdmin } = useAdmin();
  const { orders, isLoadingOrders } = useOrders();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLoadingAdmin && !isAdmin) {
      navigate('/auth');
    }
  }, [isAdmin, isLoadingAdmin, navigate]);

  if (isLoadingAdmin || !isAdmin) {
    return null;
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders?.map((order) => (
                    <TableRow key={order.id}>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Orders;
