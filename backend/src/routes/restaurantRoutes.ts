import express, { Router, Request, Response, RequestHandler } from 'express';
import { addRestaurant, getRestaurants, createInitialRestaurants } from '../controllers/restaurants.js';

const router: Router = express.Router();

// GET /api/restaurants - Fetch all restaurants
router.get('/restaurants', getRestaurants as RequestHandler);

// POST /api/restaurants - Add a new restaurant
router.post('/restaurants', addRestaurant as RequestHandler);

// POST /api/restaurants/initialize - Create initial restaurants
router.post('/restaurants/initialize', createInitialRestaurants as RequestHandler);

export default router;
