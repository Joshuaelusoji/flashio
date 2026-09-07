import express from 'express';
import Drink from '../models/Drink.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const drinks = await Drink.findAll();
    res.json(drinks.map((drink) => { const item = drink.toJSON();
    return { ...item, imageUrl: item.imageId ? cloudinary.url(item.imageId, { secure: true }) : null }; }));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drinks' });
  }
});

export default router;