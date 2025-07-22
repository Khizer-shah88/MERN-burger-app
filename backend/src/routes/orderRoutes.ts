import express, { Router, RequestHandler } from 'express';
import { placeOrder, getAllOrders, updateOrderStatus } from '../controllers/orders.js';

const router: Router = express.Router();

router.post('/orders', placeOrder as RequestHandler);
router.get('/orders', getAllOrders as RequestHandler);
router.patch('/orders/:id/status', updateOrderStatus as RequestHandler);

export default router;