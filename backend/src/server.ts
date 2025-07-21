import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from './config/db.js';
import restaurantsRoutes from './routes/restaurantRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware for JSON parsing
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Your frontend IP:port
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Serve static files for images
app.use('/images', express.static(join(__dirname, '../public/images')));

// Admin password (store in .env for security)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Default for testing

// Admin login route
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  // Generate a simple token (in production, use JWT)
  const token = Buffer.from(password).toString('base64');
  res.status(200).json({ message: 'Login successful', token });
});

// Serve admin page (protected route) - Adjusted to serve a static HTML file
app.get('/admin', (req: Request, res: Response) => {
  const tokenRaw = req.headers['authorization']?.split(' ')[1] || req.query.token;
  const token = Array.isArray(tokenRaw) ? tokenRaw[0] : tokenRaw;
  if (!token || typeof token !== 'string') {
    return res.status(401).json({ error: 'Admin token required' });
  }
  try {
    const decodedPassword = Buffer.from(token, 'base64').toString();
    if (decodedPassword !== ADMIN_PASSWORD) {
      return res.status(403).json({ error: 'Invalid admin token' });
    }
    // Serve a static HTML file instead of .tsx (create admin.html if needed)
    res.sendFile(join(__dirname, '../public/admin.html')); // Adjust path to an existing HTML file
  } catch (err) {
    return res.status(403).json({ error: 'Invalid admin token' });
  }
});

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    console.log('Connected to MongoDB');

    // Routes
    app.use('/api', restaurantsRoutes);
    app.use('/api', authRoutes);
    app.use('/api', orderRoutes);

    // Error handling middleware
    app.use(((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Something broke!' });
    }) as ErrorRequestHandler);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

export default app;