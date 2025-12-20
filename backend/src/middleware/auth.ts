import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Expect "Bearer <token>"
  if (!token) return res.status(401).json({ error: 'Authentication token required' });

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET environment variable is not set.');
      return res.status(500).json({ error: 'Server configuration error' });
    }
    const decoded: any = jwt.verify(token, secret);
    (req as any).user = decoded; // Attach user to request object
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};