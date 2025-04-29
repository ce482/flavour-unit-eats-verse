
import { Order } from '@/hooks/useOrders';
import { formatDistance } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from 'lucide-react';

interface OrdersTableProps {
  orders: Order[] | null;
  isLoading: boolean;
  onViewDetails: (order: Order) => void;
  onMarkCompleted: (orderId: string) => void;
  isPendingUpdate: boolean;
  refreshKey?: number;
  orderBeingUpdated: string | null;
}

const OrdersTable = ({ 
  orders, 
  isLoading, 
  onViewDetails, 
  onMarkCompleted,
  isPendingUpdate,
  refreshKey,
  orderBeingUpdated
}: OrdersTableProps) => {
  if (isLoading) {
    return <p>Loading orders...</p>;
  }

  if (!orders || orders.length === 0) {
    return <p>No orders found.</p>;
  }

  console.log("🔍 DEBUG: Orders in OrdersTable (refreshKey:", refreshKey, "):", orders.map(o => ({ 
    id: o.id.slice(0, 8), 
    status: o.order_status,
    customer: o.customer_name
  })));

  const handleMarkCompleted = (orderId: string) => {
    console.log(`🔍 DEBUG: OrdersTable - Mark completed clicked for order: ${orderId.slice(0, 8)}`);
    onMarkCompleted(orderId);
  };

  return (
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
          {orders.map((order) => {
            console.log(`Rendering order row ${order.id.slice(0, 8)} with status: ${order.order_status}`);
            const isUpdatingThisOrder = orderBeingUpdated === order.id;
            
            return (
              <TableRow 
                key={`${order.id}-${order.order_status}-${refreshKey || 0}`} 
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
                  <OrderStatusBadge status={order.order_status} />
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
                      onClick={() => onViewDetails(order)}
                      disabled={isUpdatingThisOrder}
                    >
                      View Details
                    </Button>
                    {order.order_status !== 'completed' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-green-50 text-green-700 hover:bg-green-100"
                        onClick={() => handleMarkCompleted(order.id)}
                        disabled={isPendingUpdate || isUpdatingThisOrder}
                      >
                        {isUpdatingThisOrder ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          'Mark Completed'
                        )}
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

// Helper component for order status badge
const OrderStatusBadge = ({ status }: { status: string }) => {
  console.log(`🏷️ DEBUG: Rendering badge for status: "${status}"`);
  
  return (
    <Badge
      variant="outline"
      className={`${
        status === 'pending' 
          ? 'bg-yellow-100 text-yellow-800 border-yellow-200' 
          : status === 'completed'
          ? 'bg-green-100 text-green-800 border-green-200'
          : 'bg-gray-100 text-gray-800 border-gray-200'
      }`}
    >
      {status}
    </Badge>
  );
};

export default OrdersTable;
