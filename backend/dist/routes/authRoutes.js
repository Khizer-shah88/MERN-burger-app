import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.js';
const router = express.Router();
/**
 * POST /api/auth/register
 * Register a new user.
 * @route POST /api/auth/register
 * @body {email: string, password: string, name: string}
 * @returns {object} Success message and user data
 * @throws {Error} 400 - Validation error
 * @throws {Error} 500 - Internal server error
 */
router.post('/auth/register', registerUser);
/**
 * POST /api/auth/login
 * Login a user and return a JWT token.
 * @route POST /api/auth/login
 * @body {email: string, password: string}
 * @returns {object} Success message, token, and user data
 * @throws {Error} 401 - Invalid credentials
 * @throws {Error} 500 - Internal server error
 */
router.post('/auth/login', loginUser);
export default router;
//# sourceMappingURL=authRoutes.js.map