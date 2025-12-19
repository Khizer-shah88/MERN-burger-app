import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';
import restaurantsRoutes from './routes/restaurantRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
// Load environment variables
dotenv.config();
// Initialize Express app
const app = express();
const PORT = Number(process.env.PORT) || 5000; 
// Middleware for JSON parsing
app.use(express.json());
// CORS configuration with dynamic frontend URL or fallback
const allowedOrigins = [
    'http://localhost:5173', // Local dev
    'https://mern-burger-app-1.onrender.com', // Deployed frontend
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('CORS not allowed for this origin'));
        }
    },
    credentials: true,
}));
// Fix for __dirname in ES module scope
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files for images with a URL prefix
app.use('/images', express.static(path.join(__dirname, '../public/images')));
// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Server is up and running' });
});
// Routes
app.use('/api', restaurantsRoutes);
app.use('/api', authRoutes);
app.use('/api', orderRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});
// Connect to MongoDB and start server
connectDB()
  .then(() => {
    console.log('MongoDB connected');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });
export default app;
