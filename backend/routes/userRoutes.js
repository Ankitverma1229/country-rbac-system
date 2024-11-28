import express from 'express';
import { getUsersProfile, updateUserProfile, sendRequestForAdminRole } from '../controller/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all users' profiles (Admin only)
router.get('/profiles', authenticate, getUsersProfile);

// Update user profile
router.put('/update/:id', authenticate, updateUserProfile);

// request for admin role
router.post('/request-admin', authenticate, sendRequestForAdminRole);

export default router;
