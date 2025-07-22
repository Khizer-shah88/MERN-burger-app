import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Expect "Bearer <token>"
    if (!token)
        return res.status(401).json({ error: 'Authentication token required' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'b6f9c7a2e4d5b8f1a3c9e7d2b4f6a8e0');
        req.user = decoded; // Attach user to request object
        next();
    }
    catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};
