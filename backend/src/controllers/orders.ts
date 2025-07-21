import { Request, Response } from 'express';
import Order, { IOrder } from '../models/Order.js';
import Restaurant from '../models/Restaurant.js';

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { cart } = req.body; // Expect an array of { restaurantId, quantity }
    const guestId = req.ip || 'guest'; // Use IP as guest identifier

    // Validate cart
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is required with at least one item' });
    }

    let total = 0;
    const orderItems = [];

    for (const item of cart) {
      const { restaurantId, quantity } = item;
      if (!restaurantId || quantity == null || quantity < 1) {
        return res.status(400).json({ error: 'Each cart item must have a valid restaurantId and quantity (minimum 1)' });
      }

      const restaurant = await Restaurant.findOne({ _id: restaurantId });
      if (!restaurant) {
        return res.status(404).json({ error: `Restaurant not found for ID: ${restaurantId}` });
      }

      const itemQuantity = Math.max(1, Number(quantity)); // Ensure quantity is at least 1, no upper limit
      const itemTotal = restaurant.price * itemQuantity;
      total += itemTotal;
      orderItems.push({ restaurantId, quantity: itemQuantity, price: restaurant.price, itemTotal });
    }

    const order: IOrder = new Order({
      userId: guestId,
      restaurantId: orderItems[0].restaurantId, // Use first restaurantId as reference
      quantity: orderItems.reduce((sum, item) => sum + item.quantity, 0),
      total,
      status: 'pending',
      items: orderItems, // Store detailed items
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Internal server error: ' + (err as Error).message });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const guestId = req.ip || 'guest';
    const orders: IOrder[] = await Order.find({ userId: guestId }).populate('restaurantId', 'name price image');
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal server error: ' + (err as Error).message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({ error: 'Order ID and status are required' });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    if (!['pending', 'confirmed', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    order.status = status;
    const updatedOrder = await order.save();
    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ error: 'Internal server error: ' + (err as Error).message });
  }
};