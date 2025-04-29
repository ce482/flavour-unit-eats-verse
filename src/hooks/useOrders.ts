
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  created_at: string;
};

export const useOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('order_status', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) {
        toast.error('Failed to fetch orders');
        throw error;
      }
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
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          order_status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated successfully');
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
