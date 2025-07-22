import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Expect "Bearer <token>"
  if (!token) return res.status(401).json({ error: 'Authentication token required' });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'b6f9c7a2e4d5b8f1a3c9e7d2b4f6a8e0');
    (req as any).user = decoded; // Attach user to request object
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};