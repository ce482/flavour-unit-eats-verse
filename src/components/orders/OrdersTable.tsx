
import { useState } from 'react';
import { formatDistance } from 'date-fns';
import { Order } from '@/hooks/useOrders';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface OrdersTableProps {
  orders: Order[] | null;
  isLoading: boolean;
  onViewDetails: (order: Order) => void;
  onMarkCompleted: (orderId: string) => void;
  isPendingUpdate: boolean;
}

const OrdersTable = ({ 
  orders, 
  isLoading, 
  onViewDetails, 
  onMarkCompleted,
  isPendingUpdate
}: OrdersTableProps) => {
  if (isLoading) {
    return <p>Loading orders...</p>;
  }

  if (!orders || orders.length === 0) {
    return <p>No orders found.</p>;
  }

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
          {orders.map((order) => (
            <TableRow 
              key={order.id}
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
                  >
                    View Details
                  </Button>
                  {order.order_status !== 'completed' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-green-50 text-green-700 hover:bg-green-100"
                      onClick={() => onMarkCompleted(order.id)}
                      disabled={isPendingUpdate}
                    >
                      {isPendingUpdate ? 'Updating...' : 'Mark Completed'}
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Helper component for order status badge
const OrderStatusBadge = ({ status }: { status: string }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle()}`}>
      {status}
    </span>
  );
};

export default OrdersTable;
