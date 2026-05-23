import express from "express";
import Rider from "../models/Rider.js";
import RiderStatus from "../models/RiderStatus.js";
import Order from "../models/Order.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { updateRiderLocation } from "../helpers/riderLocation.js"; // NEW

const router = express.Router();

/* =========================
   GET ALL RIDERS (ADMIN ONLY)
========================= */
router.get("/", authMiddleware, roleMiddleware("ADMIN"), async (req, res) => {
  try {
    const riders = await Rider.findAll();
    res.json({ riders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching riders" });
  }
});

/* =========================
   ASSIGN RIDER TO ORDER
========================= */
router.put(
  "/assign/:orderId/:riderId",
  authMiddleware,
  roleMiddleware("VENDOR", "ADMIN"),
  async (req, res) => {
    const { orderId, riderId } = req.params;
    try {
      const order = await Order.findByPk(orderId);
      if (!order) return res.status(404).json({ message: "Order not found" });

      const rider = await Rider.findByPk(riderId);
      if (!rider) return res.status(404).json({ message: "Rider not found" });

      order.riderId = rider.id;
      await order.save();

      // Mark rider as unavailable when assigned
      await RiderStatus.update(
        { is_available: false, current_order_id: order.id },
        { where: { riderId: rider.id } }
      );

      res.json({ message: "Rider assigned to order", order });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error assigning rider" });
    }
  }
);

/* =========================
   RIDER GETS OWN ORDERS
========================= */
router.get(
  "/my-orders",
  authMiddleware,
  roleMiddleware("RIDER"),
  async (req, res) => {
    try {
      const rider = await Rider.findOne({ where: { userId: req.user.id } });
      if (!rider) return res.status(404).json({ message: "Rider profile not found" });

      const orders = await Order.findAll({ where: { riderId: rider.id } });
      res.json({ orders });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching orders" });
    }
  }
);

/* =========================
   UPDATE RIDER LOCATION (NEW)
========================= */
router.post(
  "/location",
  authMiddleware,
  roleMiddleware("RIDER"),
  async (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "latitude and longitude are required" });
    }

    try {
      const rider = await Rider.findOne({ where: { userId: req.user.id } });
      if (!rider) return res.status(404).json({ message: "Rider profile not found" });

      await updateRiderLocation(rider.id, latitude, longitude);

      res.json({ message: "Location updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating location" });
    }
  }
);

/* =========================
   TOGGLE RIDER AVAILABILITY (NEW)
========================= */
router.patch(
  "/availability",
  authMiddleware,
  roleMiddleware("RIDER"),
  async (req, res) => {
    const { is_available } = req.body;

    try {
      const rider = await Rider.findOne({ where: { userId: req.user.id } });
      if (!rider) return res.status(404).json({ message: "Rider profile not found" });

      await RiderStatus.update(
        { is_available },
        { where: { riderId: rider.id } }
      );

      res.json({ message: `Rider is now ${is_available ? "available" : "unavailable"}` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating availability" });
    }
  }
);

/* =========================
   VERIFY DELIVERY CODE
========================= */
router.post(
  "/verify-delivery",
  authMiddleware,
  roleMiddleware("RIDER"),
  async (req, res) => {
    const { orderId, code } = req.body;
    try {
      const order = await Order.findByPk(orderId);
      if (!order) return res.status(404).json({ message: "Order not found" });

      const rider = await Rider.findOne({ where: { userId: req.user.id } });
      if (!rider) return res.status(404).json({ message: "Rider profile not found" });

      if (order.riderId !== rider.id) return res.status(403).json({ message: "Not allowed for this order" });
      if (order.deliveryCodeUsed) return res.status(400).json({ message: "Delivery already confirmed" });
      if (order.deliveryCode !== code) return res.status(400).json({ message: "Invalid delivery code" });

      order.status = "DELIVERED";
      order.deliveryCodeUsed = true;
      await order.save();

      // Free up the rider after delivery
      await RiderStatus.update(
        { is_available: true, current_order_id: null },
        { where: { riderId: rider.id } }
      );

      res.json({ message: "Delivery confirmed successfully", order });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error verifying delivery" });
    }
  }
);

export default router;