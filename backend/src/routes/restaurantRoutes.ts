import express, { Router, RequestHandler } from 'express';
import {
  addRestaurant,
  getRestaurants,
  createInitialRestaurants,
} from '../controllers/restaurants.js';

const router: Router = express.Router();

// GET /api/restaurants - Fetch all restaurants
router.get('/restaurants', getRestaurants);

// POST /api/restaurants - Add a new restaurant (no image upload needed)
router.post('/restaurants', addRestaurant as RequestHandler);

// POST /api/restaurants/initialize - Create initial restaurants (for setup, optional)
router.post('/restaurants/initialize', createInitialRestaurants);

export default router;