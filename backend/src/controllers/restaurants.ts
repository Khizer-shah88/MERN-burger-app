import Restaurant, { IRestaurant } from '../models/Restaurant.js';
import { Request, Response } from 'express';

export const addRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, description, price, popular } = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({ error: 'Name, description, and price are required' });
    }
    const numericPrice = Number(price.replace('$', '').replace(',', '')) || 0;
    if (numericPrice <= 0) {
      return res.status(400).json({ error: 'Invalid price format' });
    }
    const image = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3';
    const newRestaurant = new Restaurant({
      _id: require('crypto').randomBytes(12).toString('hex'),
      name,
      description,
      price: numericPrice,
      image,
      popular: popular || false,
    });
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (err) {
    console.error('Error adding restaurant:', err);
    res.status(500).json({ error: 'Internal server error: ' + (err as Error).message });
  }
};

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    console.log('Fetching restaurants from MongoDB');
    const restaurants: IRestaurant[] = await Restaurant.find().lean();
    console.log('Restaurants found count:', restaurants.length);
    console.log('Restaurants found:', JSON.stringify(restaurants, null, 2));
    res.status(200).json(restaurants);
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).json({ error: 'Internal server error: ' + (err as Error).message });
  }
};

export const createInitialRestaurants = async (req: Request, res: Response) => {
  try {
    console.log('Initializing restaurants...');
    const restaurants = [
      { _id: "67d2f1bb71c206ebc4100023", name: 'Classic Cheese', description: 'Beef patty, cheddar...', price: 12.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3', popular: true },
      { _id: "67d2f1bb71c206ebc4100024", name: 'BBQ Bacon', description: 'Beef patty, bacon...', price: 14.99, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3', popular: true },
      { _id: "67d2f1bb71c206ebc4100025", name: 'Mushroom Swiss', description: 'Beef patty, swiss...', price: 13.99, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3', popular: true },
      { _id: "67d2f1bb71c206ebc4100026", name: 'Spicy Jalapeño', description: 'Beef patty, jalapeños...', price: 15.99, image: 'https://images.unsplash.com/photo-1525059696032-d9f5e4e6da2d?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3', popular: true },
      { _id: "67d2f1bb71c206ebc4100027", name: 'Veggie Delight', description: 'Veggie patty, lettuce...', price: 11.99, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3', popular: true },
      { _id: "67d2f1bb71c206ebc4100028", name: 'Double Decker', description: 'Double patty, cheese...', price: 16.99, image: 'https://images.unsplash.com/photo-1553979459-d2229ba46b75?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3', popular: true },
      { _id: "670d4f5b8f8b8e8b8e8b8e8c", name: 'Cheeseburger', description: 'Cheeseburger with fries...', price: 10.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3', popular: true },
    ];
    const savedRestaurants = await Restaurant.insertMany(restaurants, { ordered: false });
    console.log('Restaurants initialized/updated:', JSON.stringify(savedRestaurants, null, 2));
    res.status(201).json({ message: 'Restaurants initialized/updated successfully', restaurants: savedRestaurants });
  } catch (err) {
    console.error('Error creating initial restaurants:', err);
    res.status(500).json({ error: 'Internal server error: ' + (err as Error).message });
  }
}
