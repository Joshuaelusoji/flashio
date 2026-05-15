import express from 'express';
import FeaturedMeal from '../models/FeaturedMeal.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const meals = await FeaturedMeal.findAll();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch featured meals' });
  }
});

export default router;