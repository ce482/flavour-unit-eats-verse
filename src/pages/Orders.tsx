
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

  // Update selectedOrder if it's in view and has been updated
  useEffect(() => {
    if (selectedOrder && orders) {
      const updatedOrder = orders.find(order => order.id === selectedOrder.id);
      if (updatedOrder) {
        setSelectedOrder(updatedOrder);
      }
    }
  }, [orders, selectedOrder]);

  const handleViewOrderDetails = (order: OrderType) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleMarkAsCompleted = async (orderId: string) => {
    try {
      const updatedOrder = await updateOrderStatus.mutateAsync({ 
        orderId, 
        status: 'completed' 
      });
      
      // If the selected order is the one being updated, update it in the state
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(updatedOrder);
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
