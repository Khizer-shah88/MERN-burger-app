import express from 'express';
import { placeOrder, getUserOrders, updateOrderStatus } from '../controllers/orders.js';
const router = express.Router();
router.post('/orders', placeOrder); // Removed authenticateToken
router.get('/orders', getUserOrders); // Removed authenticateToken
router.patch('/orders/:id/status', updateOrderStatus); // Removed authenticateToken
export default router;
//# sourceMappingURL=orderRoutes.js.map