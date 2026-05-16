import express from 'express';
import Drink from '../models/Drink.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const drinks = await Drink.findAll();
    res.json(drinks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drinks' });
  }
});

export default router;