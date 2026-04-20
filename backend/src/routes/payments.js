import express from "express";
import axios from "axios";
import authMiddleware from "../middleware/authMiddleware.js";

import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import Wallet from "../models/Wallet.js";
import WalletTransaction from "../models/WalletTransaction.js";

const router = express.Router();

/* =========================
   INITIATE PAYMENT (PAYSTACK)
========================= */
router.post("/initialize", authMiddleware, async (req, res) => {
  const { orderId, location } = req.body;

  try {
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!order.totalAmount || order.totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid order amount" });
    }

    if (order.status === "PAID") {
      return res.status(400).json({ message: "Order already paid" });
    }

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: req.user.email,
        amount: Math.round(order.totalAmount * 100),
        metadata: {
          orderId,
          userId: req.user.id,
          location,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return res.json({
      url: response.data.data.authorization_url,
      reference: response.data.data.reference,
    });
  } catch (err) {
    console.error("INIT ERROR:", err.response?.data || err.message);
    res.status(500).json({ message: "Payment initialization failed" });
  }
});

/* =========================
   VERIFY PAYMENT
========================= */
router.get("/verify/:reference", authMiddleware, async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = response.data.data;

    if (data.status !== "success") {
      return res.status(400).json({ message: "Payment not successful" });
    }

    const { orderId, userId } = data.metadata;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "PAID") {
      return res.json({ message: "Already processed" });
    }

    /* =========================
       UPDATE ORDER
    ========================= */
    order.status = "PAID";
    await order.save();

    /* =========================
       PAYMENT RECORD
    ========================= */
    await Payment.create({
      orderId,
      amount: data.amount / 100,
      status: "SUCCESS",
      reference,
    });

    /* =========================
       WALLET UPDATE
    ========================= */
    let wallet = await Wallet.findOne({ where: { userId } });

    if (!wallet) {
      wallet = await Wallet.create({ userId, balance: 0 });
    }

    const amount = data.amount / 100;

    wallet.balance += amount;
    await wallet.save();

    await WalletTransaction.create({
      walletId: wallet.id,
      type: "CREDIT",
      amount,
      reference: `ORDER_${orderId}`,
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("VERIFY ERROR:", err.response?.data || err.message);
    res.status(500).json({ message: "Verification failed" });
  }
});

export default router;