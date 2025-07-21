import express from 'express';
import { addRestaurant, getRestaurants, createInitialRestaurants } from '../controllers/restaurants.js';
const router = express.Router();
// GET /api/restaurants - Fetch all restaurants
router.get('/restaurants', getRestaurants);
// POST /api/restaurants - Add a new restaurant
router.post('/restaurants', addRestaurant);
// POST /api/restaurants/initialize - Create initial restaurants
router.post('/restaurants/initialize', createInitialRestaurants);
export default router;
//# sourceMappingURL=restaurantRoutes.js.map