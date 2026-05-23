import express from "express";
import sequelize from "../config/database.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Rider from "../models/Rider.js";
import RiderStatus from "../models/RiderStatus.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { findNearestRider } from "../helpers/riderLocation.js"; // NEW

const router = express.Router();

const generateCode = async () => {
  let code;
  let exists = true;
  while (exists) {
    code = Math.floor(100000 + Math.random() * 900000).toString();
    const found = await Order.findOne({ where: { deliveryCode: code } });
    exists = !!found;
  }
  return code;
};

/* =========================
   CREATE ORDER — AUTO ASSIGN NEAREST RIDER
========================= */
router.post("/", authMiddleware, async (req, res) => {
  const { items, total, deliveryAddress, customerLat, customerLng } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const deliveryCode = await generateCode();

    const order = await Order.create(
      {
        userId: req.user.id,
        total_amount: total,
        deliveryAddress,
        status: "PENDING",
        deliveryCode,
        deliveryCodeUsed: false,
      },
      { transaction }
    );

    for (let item of items) {
      await OrderItem.create(
        {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        },
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

        // Lock rider as unavailable
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
      assignedRider, // null if no rider was nearby
    });

  } catch (err) {
    await transaction.rollback();
    console.error(err);
    return res.status(500).json({ message: "Error creating order" });
  }
});

// ... rest of your routes stay exactly the same
export default router;