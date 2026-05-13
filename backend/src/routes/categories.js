import express from 'express';
import { Category } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

export default router;