
import { useState, useEffect } from 'react';
import { useOrders, Order as OrderType } from '../hooks/useOrders';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AdminCheck from '../components/orders/AdminCheck';
import OrdersTable from '../components/orders/OrdersTable';
import OrderDetails from '../components/orders/OrderDetails';
import { toast } from 'sonner';

const Orders = () => {
  const { orders, isLoadingOrders, updateOrderStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Add refresh trigger

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update selectedOrder if it's in view and has been updated
  useEffect(() => {
    if (selectedOrder && orders) {
      const updatedOrder = orders.find(order => order.id === selectedOrder.id);
      if (updatedOrder) {
        console.log(`Checking selected order ${selectedOrder.id.slice(0, 8)}:`);
        console.log(`Current status: ${selectedOrder.order_status}, New status: ${updatedOrder.order_status}`);
        
        if (updatedOrder.order_status !== selectedOrder.order_status) {
          console.log('🔄 Updating selected order with new status:', updatedOrder);
          setSelectedOrder(updatedOrder);
        }
      }
    }
  }, [orders, selectedOrder]);

  const handleViewOrderDetails = (order: OrderType) => {
    console.log('Opening order details for:', order.id.slice(0, 8), 'status:', order.order_status);
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleMarkAsCompleted = async (orderId: string) => {
    try {
      console.log('⚙️ Marking order as completed:', orderId);
      const updatedOrder = await updateOrderStatus.mutateAsync({ 
        orderId, 
        status: 'completed' 
      });
      
      console.log('✅ Order marked as completed, response:', updatedOrder);
      
      // Force update the selected order if it's the one being updated
      if (selectedOrder?.id === orderId) {
        console.log('🔄 Updating selected order state with new data:', updatedOrder);
        setSelectedOrder(updatedOrder);
      }
      
      // Force a refresh by incrementing the trigger counter
      setRefreshTrigger(prev => prev + 1);
      toast.success('Order marked as completed!');
      
    } catch (error) {
      console.error('❌ Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  // Debug the current orders data
  useEffect(() => {
    if (orders) {
      console.log('🔍 Current orders in Orders component:', orders.map(o => ({
        id: o.id.slice(0, 8),
        status: o.order_status,
        customer: o.customer_name
      })));
    }
  }, [orders, refreshTrigger]); // Add refreshTrigger as a dependency

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
              refreshKey={refreshTrigger} // Add refresh key prop
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
