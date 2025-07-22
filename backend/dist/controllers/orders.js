import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Restaurant from '../models/Restaurant.js';
export const getAllOrders = async (req, res) => {
    try {
        console.log('Step 1: Starting to fetch all orders...');
        const rawOrders = await Order.find().sort({ createdAt: -1 });
        console.log('Step 2: Raw orders fetched:', JSON.stringify(rawOrders, null, 2));
        const restaurantCount = await Restaurant.countDocuments();
        console.log('Step 3: Number of restaurants in collection:', restaurantCount);
        const orders = await Order.find()
            .populate({
            path: 'items.restaurantId',
            select: 'name price image',
            model: 'Restaurant',
            options: { strictPopulate: false },
        })
            .sort({ createdAt: -1 })
            .catch((err) => {
            console.warn('Populate failed, using raw orders:', err.message);
            return rawOrders;
        });
        console.log('Step 4: Orders after populate attempt:', JSON.stringify(orders, null, 2));
        const sanitizedOrders = orders.map(order => {
            const sanitizedItems = order.items.map(item => {
                if (!mongoose.Types.ObjectId.isValid(item.restaurantId)) {
                    console.warn(`Invalid restaurantId found: ${item.restaurantId}`);
                    return {
                        ...item,
                        restaurantId: null,
                        name: item.name || 'Unknown Item',
                        price: item.price || 0,
                    };
                }
                return item;
            });
            return { ...order.toObject(), items: sanitizedItems };
        });
        console.log('Step 5: Final sanitized orders:', JSON.stringify(sanitizedOrders, null, 2));
        res.status(200).json(sanitizedOrders.length > 0 ? sanitizedOrders : []);
    }
    catch (err) {
        console.error('Critical error in getAllOrders:', {
            message: err.message,
            stack: err.stack,
        });
        res.status(500).json({
            error: 'Internal server error',
            details: err.message,
        });
    }
};
export const placeOrder = async (req, res) => {
    try {
        const { name, phoneNumber, items, deliveryOption, address } = req.body;
        console.log('Received order payload:', JSON.stringify(req.body, null, 2)); // Debug log
        // Validate required fields
        if (!name || !phoneNumber || !items || !deliveryOption) {
            return res.status(400).json({ error: 'Name, phone number, items, and delivery option are required' });
        }
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Items must be a non-empty array' });
        }
        if (deliveryOption === 'delivery' && !address) {
            return res.status(400).json({ error: 'Address is required for delivery' });
        }
        let total = 0;
        for (const item of items) {
            console.log('Processing item:', JSON.stringify(item, null, 2)); // Debug log
            if (!item.restaurantId || !item.quantity || item.quantity < 1) {
                return res.status(400).json({ error: 'Each item must have a valid restaurantId and quantity' });
            }
            let itemPrice = item.price || 0;
            let itemName = item.name || 'Unknown Item';
            if (!item.isDeal) {
                // Validate restaurant items
                if (!mongoose.Types.ObjectId.isValid(item.restaurantId)) {
                    return res.status(400).json({ error: `Invalid restaurantId: ${item.restaurantId}` });
                }
                const restaurant = await Restaurant.findById(item.restaurantId);
                if (!restaurant) {
                    return res.status(404).json({ error: `Restaurant not found for ID: ${item.restaurantId}` });
                }
                itemPrice = restaurant.price + (item.extraCheese ? 1 : 0) +
                    (item.drink === 'cola' ? 2.5 : item.drink === 'lemonade' ? 2 : item.drink === 'water' ? 1.5 : 0);
                itemName = restaurant.name;
                item.name = restaurant.name;
                item.price = restaurant.price;
            }
            else {
                // Handle deal items
                if (!item.price || !item.name) {
                    return res.status(400).json({ error: 'Deal items must include price and name' });
                }
                itemPrice = item.price + (item.extraCheese ? 1 : 0) +
                    (item.drink === 'cola' ? 2.5 : item.drink === 'lemonade' ? 2 : item.drink === 'water' ? 1.5 : 0);
            }
            total += itemPrice * item.quantity;
        }
        const order = new Order({
            name,
            phoneNumber,
            items,
            total,
            status: 'pending',
            paymentMethod: 'cash on delivery',
            deliveryOption,
            address: deliveryOption === 'delivery' ? address : undefined,
        });
        const savedOrder = await order.save();
        console.log('Order saved:', JSON.stringify(savedOrder, null, 2)); // Debug log
        res.status(201).json({
            message: 'Order placed successfully',
            order: savedOrder,
        });
    }
    catch (err) {
        console.error('Error placing order:', {
            message: err.message,
            stack: err.stack,
        });
        res.status(500).json({ error: 'Internal server error: ' + err.message });
    }
};
export const updateOrderStatus = async (req, res) => {
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
    }
    catch (err) {
        console.error('Error updating order status:', err);
        res.status(500).json({ error: 'Internal server error: ' + err.message });
    }
};
