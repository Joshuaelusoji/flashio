import express from "express";
import sequelize from "../config/database.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import Rider from "../models/Rider.js";
import RiderStatus from "../models/RiderStatus.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { findNearestRider } from "../helpers/riderLocation.js";

const router = express.Router();

const generateCode = async () => {
  let code;
  let exists = true;
  while (exists) {
    code = Math.floor(1000 + Math.random() * 9000).toString();
    const found = await Order.findOne({ where: { deliveryCode: code } });
    exists = !!found;
  }
  return code;
};

/* =========================
   CREATE ORDER — AUTO ASSIGN NEAREST RIDER
========================= */
router.post("/", authMiddleware, async (req, res) => {
  const { items, deliveryAddress, customerLat, customerLng } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const deliveryCode = await generateCode();

    // Merge duplicate productIds before inserting
    const mergedItems = Object.values(
      items.reduce((acc, item) => {
        if (acc[item.productId]) {
          acc[item.productId].quantity += item.quantity;
        } else {
          acc[item.productId] = { ...item };
        }
        return acc;
      }, {})
    );

    // Fetch prices from DB and build order items
    let totalAmount = 0; // ← renamed from total_amount
    const orderItemsData = [];

    for (let item of mergedItems) {
      const product = await Product.findByPk(item.productId, { transaction });
      if (!product) throw new Error(`Product ${item.productId} not found`);

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal; // ← consistent

      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await Order.create(
      {
        userId: req.user.id,
        totalAmount, // ← now correctly matches variable
        deliveryAddress,
        status: "PENDING",
        deliveryCode,
        deliveryCodeUsed: false,
      },
      { transaction }
    );

    // Insert order items now that we have order.id
    for (let itemData of orderItemsData) {
      await OrderItem.create(
        { orderId: order.id, ...itemData },
        { transaction }
      );
    }

    // Auto-assign nearest rider if customer sends coordinates
    let assignedRider = null;
    if (customerLat && customerLng) {
      const nearest = await findNearestRider(customerLat, customerLng);

      if (nearest) {
        order.riderId = nearest.riderId;
        await order.save({ transaction });

        await RiderStatus.update(
          { is_available: false, current_order_id: order.id },
          { where: { riderId: nearest.riderId }, transaction }
        );

        assignedRider = nearest.riderId;
      }
    }

    await transaction.commit();

    return res.status(201).json({
      order,
      deliveryCode,
      assignedRider,
    });

  } catch (err) {
    await transaction.rollback();
    console.error(err);
    return res.status(500).json({ message: "Error creating order" });
  }
});

export default router;