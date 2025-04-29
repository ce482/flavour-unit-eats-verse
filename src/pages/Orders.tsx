
import { useState, useEffect } from 'react';
import { useOrders, Order as OrderType } from '../hooks/useOrders';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AdminCheck from '../components/orders/AdminCheck';
import OrdersTable from '../components/orders/OrdersTable';
import OrderDetails from '../components/orders/OrderDetails';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const Orders = () => {
  const { orders, isLoadingOrders, updateOrderStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [orderBeingUpdated, setOrderBeingUpdated] = useState<string | null>(null);

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
      console.log('⚙️ DEBUG: Marking order as completed in Orders.tsx:', orderId.slice(0, 8));
      
      // Track which order is being updated to show UI feedback
      setOrderBeingUpdated(orderId);
      
      // Display an immediate feedback toast
      const loadingToast = toast.loading('Updating order status...');
      
      const updatedOrder = await updateOrderStatus.mutateAsync({ 
        orderId, 
        status: 'completed' 
      });
      
      console.log('✅ DEBUG: Order mutation completed, response:', updatedOrder);
      toast.dismiss(loadingToast);
      
      // Force update the selected order if it's the one being updated
      if (selectedOrder?.id === orderId) {
        console.log('🔄 DEBUG: Updating selected order state with new data:', updatedOrder);
        setSelectedOrder(updatedOrder);
      }
      
      // Force a refresh by incrementing the trigger counter
      console.log('🔄 DEBUG: Triggering UI refresh');
      setRefreshTrigger(prev => prev + 1);
      
      // Show success toast
      toast.success('Order marked as completed!');
      
      // Log final confirmation
      console.log('✅ DEBUG: Update process completed successfully');
      
    } catch (error) {
      console.error('❌ ERROR: Error updating order status:', error);
      toast.error('Failed to update order status');
    } finally {
      // Ensure we always clear the updating state
      setOrderBeingUpdated(null);
    }
  };

  // Debug the current orders data
  useEffect(() => {
    if (orders) {
      console.log('🔍 DEBUG: Current orders in Orders component:', orders.map(o => ({
        id: o.id.slice(0, 8),
        status: o.order_status,
        customer: o.customer_name
      })));
    }
  }, [orders, refreshTrigger]);

  // Debug helper function - this button lets you check the current state
  const debugCheckState = () => {
    console.log('------------- DEBUG STATE CHECK -------------');
    console.log('Current orders:', orders);
    console.log('Is loading orders:', isLoadingOrders);
    console.log('Is pending update:', updateOrderStatus.isPending);
    console.log('Selected order:', selectedOrder);
    console.log('Refresh trigger:', refreshTrigger);
    console.log('Order being updated:', orderBeingUpdated);
    console.log('------------------------------------------');
    toast.info('State checked - see console logs');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20">
        <div className="container-wide">
          <h1 className="text-4xl font-bold mb-8">Admin Orders Dashboard</h1>
          
          <AdminCheck>
            <div className="mb-4 flex justify-between items-center">
              <div className="flex gap-2">
                <Button 
                  onClick={debugCheckState}
                  size="sm"
                  variant="outline"
                  className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Debug: Check Orders State
                </Button>
                
                <Button 
                  onClick={() => setRefreshTrigger(prev => prev + 1)}
                  size="sm"
                  variant="outline"
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Force UI Refresh
                </Button>
              </div>
            </div>
            
            <OrdersTable 
              orders={orders} 
              isLoading={isLoadingOrders}
              onViewDetails={handleViewOrderDetails}
              onMarkCompleted={handleMarkAsCompleted}
              isPendingUpdate={updateOrderStatus.isPending}
              refreshKey={refreshTrigger}
              orderBeingUpdated={orderBeingUpdated}
            />
            
            <OrderDetails
              order={selectedOrder}
              isOpen={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              onMarkCompleted={handleMarkAsCompleted}
              isPendingUpdate={updateOrderStatus.isPending}
              orderBeingUpdated={orderBeingUpdated}
            />
          </AdminCheck>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Orders;
