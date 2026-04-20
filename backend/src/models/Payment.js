// src/models/Payment.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  orderId: DataTypes.UUID,
  amount: DataTypes.FLOAT,

  status: {
    type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED", "REFUNDED"),
    defaultValue: "PENDING",
  },

  stripeSessionId: DataTypes.STRING,
});

export default Payment;