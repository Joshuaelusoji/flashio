import express from "express";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/* =========================
   GET ALL PRODUCTS (PUBLIC)
========================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching products" });
  }
});

/* =========================
   CREATE PRODUCT (VENDOR ONLY)
========================= */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("VENDOR"),
  async (req, res) => {
    const { name, description, price, imageUrl, category } = req.body;

    try {
      const product = await Product.create({
        name,
        description,
        price,
        imageUrl,
        category,

        // ⚠️ IMPORTANT: using USER ID as vendor reference
        vendorId: req.user.id,
      });

      res.status(201).json({ product });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error creating product" });
    }
  }
);

/* =========================
   UPDATE PRODUCT (OWNERSHIP SAFE)
========================= */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("VENDOR"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // 🔒 ownership check
      if (product.vendorId !== req.user.id) {
        return res.status(403).json({ message: "Not allowed" });
      }

      await product.update(req.body);

      res.json({ product });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error updating product" });
    }
  }
);

/* =========================
   DELETE PRODUCT (OWNERSHIP SAFE)
========================= */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("VENDOR"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.vendorId !== req.user.id) {
        return res.status(403).json({ message: "Not allowed" });
      }

      await product.destroy();

      res.json({ message: "Product deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error deleting product" });
    }
  }
);

export default router;