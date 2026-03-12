import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import restaurantsRoutes from './routes/restaurantRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
// Load environment variables
dotenv.config();
// Initialize Express app
const app = express();
const PORT = Number(process.env.PORT) || 5000; // standardize to 5000
const JSON_LIMIT = process.env.JSON_LIMIT || '1mb';
app.set('trust proxy', 1);
// Middleware for JSON parsing
app.use(express.json({ limit: JSON_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: JSON_LIMIT }));
// CORS configuration with dynamic frontend URL or fallback
const defaultAllowedOrigins = [
    'http://localhost:5173', // Local dev
    'http://burgerbite.duckdns.org', // Deployed frontend
    'https://burgerbite.duckdns.org', // Deployed frontend (HTTPS)
];
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
    : defaultAllowedOrigins;
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('CORS not allowed for this origin'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
// Fix for __dirname in ES module scope
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files for images with a URL prefix
app.use('/images', express.static(path.join(__dirname, '../public/images'), {
    maxAge: '7d',
    immutable: true,
}));
// Health check endpoint for Render
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});
// Routes
app.use('/api', restaurantsRoutes);
app.use('/api', authRoutes);
app.use('/api', orderRoutes);
// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error(err.stack || err.message);
    const isProduction = process.env.NODE_ENV === 'production';
    res.status(500).json({
        error: 'Internal Server Error',
        ...(isProduction ? {} : { details: err.message }),
    });
});
let serverInstance = null;
const gracefulShutdown = (signal) => {
    console.log(`${signal} received. Starting graceful shutdown...`);
    if (!serverInstance) {
        process.exit(0);
        return;
    }
    serverInstance.close(async () => {
        try {
            await mongoose.connection.close();
            console.log('MongoDB connection closed');
            process.exit(0);
        }
        catch (error) {
            console.error('Error while closing MongoDB connection:', error);
            process.exit(1);
        }
    });
    setTimeout(() => {
        console.error('Graceful shutdown timed out. Forcing exit.');
        process.exit(1);
    }, 10000).unref();
};
// Connect to MongoDB and start server
connectDB()
    .then(() => {
    console.log('MongoDB connected');
    serverInstance = app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
})
    .catch((err) => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
});
export default app;
