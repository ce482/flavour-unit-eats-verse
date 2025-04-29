import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  created_at: string;
};

export type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string;
  order_status: string;
  payment_status: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[]; 
};

export const useOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      console.log('Fetching orders from database...');
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('order_status', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) {
        toast.error('Failed to fetch orders');
        throw error;
      }
      
      console.log('Orders fetched successfully:', data);
      return data;
    },
    // Force refetch on focus to ensure we always have the latest data
    refetchOnWindowFocus: true,
    staleTime: 0, // Consider data always stale to encourage refetching
  });

  const createOrder = useMutation({
    mutationFn: async ({ orderData, items }: { 
      orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>, 
      items: Omit<OrderItem, 'id' | 'order_id' | 'created_at'>[] 
    }) => {
      // Create the order without requiring user_id
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      // Create the order items
      const orderItems = items.map(item => ({
        ...item,
        order_id: order.id
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create order');
      console.error('Order creation error:', error);
    }
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string, status: string }) => {
      console.log(`⚙️ DEBUG: Starting to update order ${orderId} to status "${status}"`);
      
      try {
        // Step 1: Directly perform the update with explicit fields
        console.log(`Updating order in database...`);
        const { data: updateData, error: updateError } = await supabase
          .from('orders')
          .update({ 
            order_status: status,
            updated_at: new Date().toISOString()
          })
          .eq('id', orderId)
          .select();
        
        if (updateError) {
          console.error('❌ ERROR: Update failed:', updateError);
          throw updateError;
        }
        
        console.log('✅ DEBUG: Database update response:', updateData);
        
        if (!updateData || updateData.length === 0) {
          console.error('❌ ERROR: No data returned after update');
          throw new Error('No data returned after update');
        }
        
        // Step 2: Make a separate fetch to get the complete updated order with items
        console.log(`Fetching complete updated order...`);
        const { data: fetchedOrder, error: fetchError } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .eq('id', orderId)
          .single();
        
        if (fetchError) {
          console.error('❌ ERROR: Error fetching updated order:', fetchError);
          throw fetchError;
        }
        
        console.log('📦 DEBUG: Complete updated order data:', fetchedOrder);
        
        if (fetchedOrder.order_status !== status) {
          console.error(`❌ ERROR: Updated status mismatch! Expected: ${status}, Got: ${fetchedOrder.order_status}`);
        }
        
        return fetchedOrder;
      } catch (error) {
        console.error('❌ ERROR: Exception during order update:', error);
        throw error;
      }
    },
    onSuccess: (updatedOrder) => {
      console.log('✅ DEBUG: Order status update mutation succeeded with data:', updatedOrder);
      
      // Approach 1: Force complete cache invalidation
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      
      // Approach 2: Also manually update the cache to ensure immediate UI update
      queryClient.setQueryData(['orders'], (oldData: Order[] | undefined) => {
        if (!oldData) {
          console.log('No existing orders in cache, returning array with just the updated order');
          return [updatedOrder];
        }
        
        console.log('Current orders in cache before update:', oldData.map(o => ({
          id: o.id.slice(0,8), 
          status: o.order_status
        })));
        
        const newData = oldData.map(order => {
          if (order.id === updatedOrder.id) {
            console.log(`🔄 DEBUG: Replacing order ${order.id.slice(0,8)} in cache:`);
            console.log(`   OLD STATUS = "${order.order_status}", NEW STATUS = "${updatedOrder.order_status}"`);
            // Return the complete updated order object
            return updatedOrder;
          }
          return order;
        });
        
        console.log('Updated orders in cache after update:', newData.map(o => ({
          id: o.id.slice(0,8), 
          status: o.order_status
        })));
        
        return newData;
      });
      
      toast.success(`Order marked as ${updatedOrder.order_status}`);
    },
    onError: (error) => {
      toast.error('Failed to update order status');
      console.error('Order status update error:', error);
    }
  });

  return {
    orders,
    isLoadingOrders,
    createOrder,
    updateOrderStatus
  };
};
