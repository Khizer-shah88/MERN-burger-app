import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
const toNumber = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        await mongoose.connect(uri, {
            retryWrites: true,
            w: 'majority',
            maxPoolSize: toNumber(process.env.MONGODB_MAX_POOL_SIZE, 25),
            minPoolSize: toNumber(process.env.MONGODB_MIN_POOL_SIZE, 5),
            serverSelectionTimeoutMS: toNumber(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS, 5000),
            socketTimeoutMS: toNumber(process.env.MONGODB_SOCKET_TIMEOUT_MS, 45000),
        });
        mongoose.connection.on('error', (error) => {
            console.error('MongoDB runtime error:', error);
        });
        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected');
        });
        console.log('MongoDB Connected Successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
export default connectDB;
