
import { useState, useEffect } from 'react';
import { useOrders, Order as OrderType } from '../hooks/useOrders';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AdminCheck from '../components/orders/AdminCheck';
import OrdersTable from '../components/orders/OrdersTable';
import OrderDetails from '../components/orders/OrderDetails';

const Orders = () => {
  const { orders, isLoadingOrders, updateOrderStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleViewOrderDetails = (order: OrderType) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleMarkAsCompleted = async (orderId: string) => {
    try {
      await updateOrderStatus.mutateAsync({ orderId, status: 'completed' });
      
      // If the selected order is the one being updated, close the dialog
      if (selectedOrder?.id === orderId) {
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20">
        <div className="container-wide">
          <h1 className="text-4xl font-bold mb-8">Admin Orders Dashboard</h1>
          
          <AdminCheck>
            <OrdersTable 
              orders={orders} 
              isLoading={isLoadingOrders}
              onViewDetails={handleViewOrderDetails}
              onMarkCompleted={handleMarkAsCompleted}
              isPendingUpdate={updateOrderStatus.isPending}
            />
            
            <OrderDetails
              order={selectedOrder}
              isOpen={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              onMarkCompleted={handleMarkAsCompleted}
              isPendingUpdate={updateOrderStatus.isPending}
            />
          </AdminCheck>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Orders;
