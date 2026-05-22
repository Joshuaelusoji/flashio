import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Orders",
        key: "id",
      },
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    currency: {
      type: DataTypes.STRING,
      defaultValue: "NGN",
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "PROCESSING",
        "SUCCESS",
        "FAILED",
        "REFUNDED",
        "CANCELLED"
      ),
      defaultValue: "PENDING",
      allowNull: false,
    },

    paymentMethod: {
      type: DataTypes.ENUM("PAYSTACK"),
      defaultValue: "PAYSTACK",
      allowNull: false,
    },

    paystackReference: {
      type: DataTypes.STRING,
      unique: true,
    },

    paystackAccessCode: {
      type: DataTypes.STRING,
    },

    paidAt: {
      type: DataTypes.DATE,
    },

    metadata: {
      type: DataTypes.JSONB,
    },
  },
  {
    timestamps: true,
    indexes: [
      { fields: ["orderId"] },
      { fields: ["status"] },
      { fields: ["paystackReference"] },
    ],
  }
);

export default Payment;