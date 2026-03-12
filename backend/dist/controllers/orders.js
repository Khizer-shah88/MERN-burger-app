import Order from '../models/Order.js';
import Restaurant from '../models/Restaurant.js';
const DRINK_PRICE_MAP = {
    cola: 2.5,
    lemonade: 2,
    water: 1.5,
};
const getAddonsCost = (drink, extraCheese) => {
    const drinkCost = drink ? DRINK_PRICE_MAP[drink] ?? 0 : 0;
    return drinkCost + (extraCheese ? 1 : 0);
};
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }).lean();
        res.set('Cache-Control', 'no-store');
        res.status(200).json(orders);
    }
    catch (err) {
        console.error('Error in getAllOrders:', err.message);
        res.status(500).json({
            error: 'Internal server error',
        });
    }
};
export const placeOrder = async (req, res) => {
    try {
        const { name, phoneNumber, items, deliveryOption, address } = req.body;
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
        const incomingItems = items;
        const restaurantIds = Array.from(new Set(incomingItems
            .filter((item) => !item.isDeal)
            .map((item) => String(item.restaurantId))));
        const restaurants = await Restaurant.find({ _id: { $in: restaurantIds } })
            .select('name price')
            .lean();
        const restaurantMap = new Map(restaurants.map((restaurant) => [String(restaurant._id), restaurant]));
        let total = 0;
        for (const item of incomingItems) {
            if (!item.restaurantId || !item.quantity || item.quantity < 1) {
                return res.status(400).json({ error: 'Each item must have a valid restaurantId and quantity' });
            }
            let itemPrice = item.price || 0;
            let itemName = item.name || 'Unknown Item';
            const addonsCost = getAddonsCost(item.drink, item.extraCheese);
            if (!item.isDeal) {
                const restaurant = restaurantMap.get(String(item.restaurantId));
                if (!restaurant) {
                    return res.status(404).json({ error: `Restaurant not found for ID: ${item.restaurantId}` });
                }
                itemPrice = restaurant.price + addonsCost;
                itemName = restaurant.name;
                item.name = restaurant.name;
                item.price = restaurant.price;
            }
            else {
                // Handle deal items
                if (!item.price || !item.name) {
                    return res.status(400).json({ error: 'Deal items must include price and name' });
                }
                itemPrice = item.price + addonsCost;
            }
            total += itemPrice * item.quantity;
        }
        const order = new Order({
            name,
            phoneNumber,
            items: incomingItems,
            total,
            status: 'pending',
            paymentMethod: 'cash on delivery',
            deliveryOption,
            address: deliveryOption === 'delivery' ? address : undefined,
        });
        const savedOrder = await order.save();
        res.status(201).json({
            message: 'Order placed successfully',
            order: savedOrder,
        });
    }
    catch (err) {
        console.error('Error placing order:', err.message);
        res.status(500).json({ error: 'Internal server error: ' + err.message });
    }
};
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const orderId = req.params.id || req.body.orderId;
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
