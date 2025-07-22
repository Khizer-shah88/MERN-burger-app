import express from 'express';
import { addRestaurant, getRestaurants, createInitialRestaurants, } from '../controllers/restaurants.js';
import Restaurant from '../models/Restaurant.js';
const router = express.Router();
// GET /api/restaurants - Fetch all restaurants
router.get('/restaurants', getRestaurants);
// POST /api/restaurants - Add a new restaurant (no image upload needed)
router.post('/restaurants', addRestaurant);
// POST /api/restaurants/initialize - Create initial restaurants (for setup, optional)
router.post('/restaurants/initialize', createInitialRestaurants);
router.post('/restaurants/initialize', async (req, res) => {
    await Restaurant.create({
        name: "Test Burger",
        description: "A test burger",
        price: 5,
        image: "test.jpg",
    });
    res.status(201).json({ message: 'Restaurant initialized' });
});
export default router;
