import express from 'express';
import Restaurant from '../models/Restaurant.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

export default router;