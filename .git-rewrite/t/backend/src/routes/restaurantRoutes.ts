import express, { Router, Request, Response, RequestHandler } from 'express';
import {
  addRestaurant,
  getRestaurants,
  createInitialRestaurants,
} from '../controllers/restaurants.js';
import Restaurant from '../models/Restaurant.js';

const router: Router = express.Router();

// GET /api/restaurants - Fetch all restaurants
router.get('/restaurants', getRestaurants);

// POST /api/restaurants - Add a new restaurant (no image upload needed)
router.post('/restaurants', addRestaurant as RequestHandler);

// POST /api/restaurants/initialize - Create initial restaurants (for setup, optional)
router.post('/restaurants/initialize', createInitialRestaurants);


router.post('/restaurants/initialize', async (req: Request, res: Response) => {
  await Restaurant.create({
    name: "Test Burger",
    description: "A test burger",
    price: 5,
    image: "test.jpg",
  });
  res.status(201).json({ message: 'Restaurant initialized' });
});

export default router;