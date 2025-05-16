
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OrdersTable from '@/components/orders/OrdersTable';
import OrderDetails from '@/components/orders/OrderDetails';
import { useOrders, Order } from '@/hooks/useOrders';
import { toast } from 'sonner';

const AdminOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const { 
    orders, 
    isLoadingOrders, 
    updateOrderStatus 
  } = useOrders();

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleMarkCompleted = async (orderId: string) => {
    try {
      console.log(`Attempting to mark order ${orderId} as completed...`);
      
      await updateOrderStatus.mutateAsync({ 
        orderId, 
        status: 'completed' 
      });
      
      console.log('Update mutation completed successfully');
      toast.success('Order marked as completed');
      
      // Force refresh of the data
      setRefreshKey(prev => prev + 1);
      
      // If the details modal for this order is open, close it
      if (selectedOrder && selectedOrder.id === orderId) {
        setIsDetailsOpen(false);
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container-wide">
          <h1 className="text-3xl font-bold mb-6">Order Management</h1>
          
          <div className="mb-8">
            <OrdersTable 
              orders={orders} 
              isLoading={isLoadingOrders}
              onViewDetails={handleViewDetails}
              onMarkCompleted={handleMarkCompleted}
              isPendingUpdate={updateOrderStatus.isPending}
              refreshKey={refreshKey}
              orderBeingUpdated={updateOrderStatus.variables?.orderId || null}
            />
          </div>
          
          <OrderDetails
            order={selectedOrder}
            isOpen={isDetailsOpen}
            onOpenChange={setIsDetailsOpen}
            onMarkCompleted={handleMarkCompleted}
            isPendingUpdate={updateOrderStatus.isPending}
            orderBeingUpdated={updateOrderStatus.variables?.orderId || null}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminOrders;
