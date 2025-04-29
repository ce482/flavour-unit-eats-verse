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
      console.log(`⚙️ Starting to update order ${orderId} to status "${status}"`);
      
      // CRITICAL FIX: Make sure we're explicitly setting order_status and using .select()
      const { data: updateData, error } = await supabase
        .from('orders')
        .update({ 
          order_status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select('*');  // Make sure we get the updated data back
      
      if (error) {
        console.error('❌ Error updating order status:', error);
        throw error;
      }
      
      console.log('✅ Database update successful, response:', updateData);
      
      // Fetch the full updated order with its items
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('id', orderId)
        .single();
      
      if (fetchError) {
        console.error('❌ Error fetching updated order:', fetchError);
        throw fetchError;
      }
      
      console.log('📦 Complete updated order from database:', data);
      return data;
    },
    onSuccess: (updatedOrder) => {
      console.log('✅ Order status update mutation complete with data:', updatedOrder);
      
      // CRITICAL FIX: Properly update the cache with the new order data
      queryClient.setQueryData(['orders'], (oldData: Order[] | undefined) => {
        if (!oldData) return [];
        
        console.log('Current orders in cache before update:', oldData.map(o => ({id: o.id.slice(0,8), status: o.order_status})));
        
        const newData = oldData.map(order => {
          if (order.id === updatedOrder.id) {
            console.log(`🔄 Replacing order ${order.id.slice(0,8)} in cache: OLD STATUS = "${order.order_status}", NEW STATUS = "${updatedOrder.order_status}"`);
            // Return the complete updated order object
            return updatedOrder;
          }
          return order;
        });
        
        console.log('Updated orders in cache after update:', newData.map(o => ({id: o.id.slice(0,8), status: o.order_status})));
        return newData;
      });
      
      // CRITICAL FIX: Force invalidate and refetch to ensure UI is updated
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      
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
