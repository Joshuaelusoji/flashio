import express from 'express';
import Vendor from '../models/Vendor.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();


// ================= GET ALL VENDORS =================
router.get('/', async (req, res) => {
  try {
    const { category, includeProducts } = req.query;

    const include = [
      {
        model: Category,
        attributes: ['id','name','slug','icon','color','textColor']
      },
    ];

    if (includeProducts === 'true') {
      include.push({
        model: Product,
        attributes: ['id','name','description','price','imageId','stock','isAvailable']
      });
    }

    const where = {};

    if (category) {
      const categoryRecord = await Category.findOne({
        where: { slug: category }
      });

      if (!categoryRecord) {
        return res.json([]);
      }

      where.categoryId = categoryRecord.id;
    }

    const vendors = await Vendor.findAll({
      where,
      include,
      order: [['name', 'ASC']]
    });

    // Convert Cloudinary imageId into an actual image URL
    const data = vendors.map((vendor) => {
      const item = vendor.toJSON();

      return {
        ...item,
        imageUrl: item.imageId
          ? cloudinary.url(item.imageId, {
              secure: true
            })
          : null,
      };
    });

    res.json(data);

  } catch (err) {
    console.error('Failed to fetch vendors', err);
    res.status(500).json({
      error: 'Failed to fetch vendors'
    });
  }
});


// ================= GET SINGLE VENDOR =================
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ['id','name','slug','icon','color','textColor']
        },
        {
          model: Product,
          attributes: ['id','name','description','price','imageId','stock','isAvailable']
        },
      ],
    });

    if (!vendor) {
      return res.status(404).json({
        error: 'Vendor not found'
      });
    }

    const data = vendor.toJSON();

    res.json({
      ...data,
      imageUrl: data.imageId
        ? cloudinary.url(data.imageId, {
            secure: true
          })
        : null,
    });

  } catch (err) {
    console.error('Failed to fetch vendor details', err);
    res.status(500).json({
      error: 'Failed to fetch vendor details'
    });
  }
});


export default router;