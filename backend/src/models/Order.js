// src/models/Order.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Order = sequelize.define(
  "Orders",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "IN_PROGRESS", "DELIVERED", "CANCELLED"),
      defaultValue: "PENDING",
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    deliveryAddress: {        // ← added
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    riderId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    deliveryCode: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    deliveryCodeUsed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {               // ← was already here
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,           // ← deletedAt now backed by migration
  }
);

export default Order;