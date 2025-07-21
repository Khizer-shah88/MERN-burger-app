import express, { Router, Request, Response, RequestHandler } from 'express';
import { placeOrder, getUserOrders, updateOrderStatus } from '../controllers/orders.js';

const router: Router = express.Router();

router.post('/orders', placeOrder as RequestHandler); // Removed authenticateToken
router.get('/orders', getUserOrders as RequestHandler); // Removed authenticateToken
router.patch('/orders/:id/status', updateOrderStatus as RequestHandler); // Removed authenticateToken

export default router;