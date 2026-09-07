import express from 'express';
import FeaturedMeal from '../models/FeaturedMeal.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const meals = await FeaturedMeal.findAll();
    res.json(meals.map((meal) => { const item = meal.toJSON(); 
    return { ...item, imageUrl: item.imageId ? cloudinary.url(item.imageId, { secure: true }) : null }; }));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch featured meals' });
  }
});

export default router;