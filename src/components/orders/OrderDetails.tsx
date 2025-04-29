
import { Order, OrderItem } from '@/hooks/useOrders';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface OrderDetailsProps {
  order: Order | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkCompleted: (orderId: string) => void;
  isPendingUpdate: boolean;
}

const OrderDetails = ({
  order,
  isOpen,
  onOpenChange,
  onMarkCompleted,
  isPendingUpdate,
}: OrderDetailsProps) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Order ID: {order.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm text-gray-500">Customer</h3>
              <p>{order.customer_name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">Email</h3>
              <p>{order.customer_email}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">Phone</h3>
              <p>{order.customer_phone || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">Date</h3>
              <p>{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div className="col-span-2">
              <h3 className="font-semibold text-sm text-gray-500">Shipping Address</h3>
              <p>{order.shipping_address}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Order Items</h3>
            <ul className="divide-y">
              {order.order_items?.map((item: OrderItem) => (
                <li key={item.id} className="py-2 flex justify-between">
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">${order.total_amount.toFixed(2)}</p>
          </div>
          
          {order.order_status !== 'completed' && (
            <div className="pt-2">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => {
                  if (order) {
                    onMarkCompleted(order.id);
                  }
                }}
                disabled={isPendingUpdate}
              >
                {isPendingUpdate ? 'Updating...' : 'Mark as Completed'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
