import express from 'express';
import { createData, getDataByCountry, getAllCountry, updateData, deleteData } from '../controller/dataController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create new data entry (Admin only)
router.post('/create', authenticate, createData);

// Get data for a specific country
router.get('/data', authenticate, getDataByCountry);

// Get data for all country
router.get('/all-data', authenticate, getAllCountry);

// Update data (Admin only)
router.put('/update/:id', authenticate, updateData);

// Delete data (Admin only)
router.delete('/delete/:id', authenticate, deleteData);

export default router;
