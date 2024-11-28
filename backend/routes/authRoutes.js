import express from 'express';
import { login, register, adminLogin, verifyUser } from '../controller/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// User login
router.post('/login', login);

// Admin Login
router.post('/admin', adminLogin);

// User registration
router.post('/register', register);

///verfiy user
router.get('/verify', authenticate, verifyUser);

export default router;
