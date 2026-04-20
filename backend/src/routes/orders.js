import express from "express";
import sequelize from "../config/database.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   UNIQUE DELIVERY CODE
========================= */
const generateCode = async () => {
  let code;
  let exists = true;

  while (exists) {
    code = Math.floor(100000 + Math.random() * 900000).toString();

    const found = await Order.findOne({
      where: { deliveryCode: code },
    });

    exists = !!found;
  }

  return code;
};

/* =========================
   CREATE ORDER (ATOMIC + SAFE)
========================= */
router.post("/", authMiddleware, async (req, res) => {
  const { items, total, deliveryAddress } = req.body;

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

    await transaction.commit();

    return res.status(201).json({
      order,
      deliveryCode, // ONLY TIME USER SEES IT
    });

  } catch (err) {
    await transaction.rollback();
    console.error(err);

    return res.status(500).json({
      message: "Error creating order",
    });
  }
});

/* =========================
   GET USER ORDERS (SECURE)
========================= */
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [OrderItem],
      order: [["createdAt", "DESC"]],
    });

    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

/* =========================
   GET SINGLE ORDER (SECURE)
========================= */
router.get("/:orderId", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [OrderItem],
    });

    if (!order || order.userId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const orderData = order.toJSON();

    // hide sensitive fields
    delete orderData.deliveryCode;
    delete orderData.deliveryCodeUsed;

    res.json({ order: orderData });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching order" });
  }
});

export default router;