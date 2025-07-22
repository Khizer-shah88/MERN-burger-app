import Restaurant from '../models/Restaurant.js';
// Add a new restaurant (single restaurant with default image)
export const addRestaurant = async (req, res) => {
    try {
        const { name, description, price, popular } = req.body;
        // Validate required fields
        if (!name || !description || !price) {
            return res.status(400).json({ error: 'Name, description, and price are required' });
        }
        // Use a default image URL (Unsplash) since no upload is needed
        const image = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3'; // Default burger image
        const newRestaurant = new Restaurant({
            name,
            description,
            price: parseFloat(price), // Ensure price is a number
            image,
            popular: popular || false, // Default to false if not provided
        });
        const savedRestaurant = await newRestaurant.save();
        res.status(201).json(savedRestaurant);
    }
    catch (err) {
        console.error('Error adding restaurant:', err);
        res.status(500).json({ error: 'Internal server error: ' + err.message });
    }
};
// Get all restaurants
export const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find(); // Fetch all restaurants
        res.status(200).json(restaurants); // Return the array of restaurants
    }
    catch (err) {
        console.error('Error fetching restaurants:', err);
        res.status(500).json({ error: 'Internal server error: ' + err.message });
    }
};
// Create initial restaurants (for setup, with default images)
export const createInitialRestaurants = async (req, res) => {
    try {
        await Restaurant.deleteMany({}); // Clear existing data
        const restaurants = [
            {
                name: 'Classic Cheese',
                description: 'Beef patty, cheddar cheese, lettuce, tomato, onion, special sauce',
                price: 12.99, // Price as a number
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3',
                popular: false,
            },
            {
                name: 'BBQ Bacon',
                description: 'Beef patty, bacon, cheddar, onion rings, BBQ sauce',
                price: 14.99, // Price as a number
                image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3',
                popular: true,
            },
            {
                name: 'Mushroom Swiss',
                description: 'Beef patty, swiss cheese, sautéed mushrooms, caramelized onions',
                price: 13.99, // Price as a number
                image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3',
                popular: false,
            },
            {
                name: 'Spicy Jalapeño',
                description: 'Beef patty, jalapeños, pepper jack cheese, spicy mayo',
                price: 15.99, // Price as a number
                image: 'https://images.unsplash.com/photo-1525059696032-d9f5e4e6da2d?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3',
                popular: true,
            },
            {
                name: 'Veggie Delight',
                description: 'Vegetarian patty, lettuce, tomato, onion, avocado, special sauce',
                price: 14.99, // Price as a number
                image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3',
                popular: false,
            },
            {
                name: 'Double Trouble',
                description: 'Double beef patty, double cheese, bacon, pickles, special sauce',
                price: 16.99, // Price as a number
                image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3',
                popular: true,
            },
        ];
        const savedRestaurants = await Restaurant.insertMany(restaurants); // Insert 6 burgers
        res.status(201).json(savedRestaurants); // Return the inserted data
    }
    catch (err) {
        console.error('Error creating initial restaurants:', err);
        res.status(500).json({ error: 'Internal server error: ' + err.message });
    }
};
