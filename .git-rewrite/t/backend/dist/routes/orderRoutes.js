import express from 'express';
import { placeOrder, getAllOrders, updateOrderStatus } from '../controllers/orders.js';
const router = express.Router();
router.post('/orders', placeOrder);
router.get('/orders', getAllOrders);
router.patch('/orders/:id/status', updateOrderStatus);
export default router;
