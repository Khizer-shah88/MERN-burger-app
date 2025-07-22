import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';
import restaurantsRoutes from './routes/restaurantRoutes.js';

import orderRoutes from './routes/orderRoutes.js'; // New import
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware for JSON parsing
app.use(express.json());

// CORS configuration with dynamic frontend URL or fallback
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true, // Allow cookies/credentials if needed
}));

// Serve static files for images (optional, since you’re using default URLs now)
// Fix for __dirname not defined in ES module scope
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../public/images')));
   
// Connect to MongoDB and start server
connectDB()
  .then(() => {
    console.log('Connected to MongoDB');

    // Routes
    app.use('/api', restaurantsRoutes);
    app.use('/api', authRoutes);
    app.use('/api', orderRoutes); // Mount order routes

    // Error handling middleware
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Something broke!' });
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit with failure if MongoDB connection fails
  });

export default app;



