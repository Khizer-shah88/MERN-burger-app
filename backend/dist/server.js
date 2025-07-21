import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from './config/db.js';
import restaurantsRoutes from './routes/restaurantRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
console.log('Environment variables:', process.env); // Debug environment vars
app.use(express.json());
app.use(cors({
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:5173', // Development
        'http://localhost:4173', // Vite preview port
        'https://mern-burger-app-frontend.onrender.com' // Deployed frontend (once deployed)
    ],
    credentials: true,
}));
app.use('/images', express.static(join(__dirname, 'public/images')));
app.use('/api/restaurants', restaurantsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use(((err, req, res, next) => {
    console.error('Error middleware:', err.stack);
    res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
}));
// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});
// Start server
const startServer = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        await connectDB();
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Server startup error:', error);
        process.exit(1); // Exit with error code
    }
};
startServer().catch((error) => {
    console.error('Uncaught error during server start:', error);
    process.exit(1);
});
export default app; // Export for testing
//# sourceMappingURL=server.js.map