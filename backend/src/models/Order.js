// src/models/Order.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Rider from "./Rider.js";

const Order = sequelize.define(
  "Order",
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

    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },

    riderId: {
      type: DataTypes.UUID,
      references: {
        model: "Riders",
        key: "id",
      },
    },

    deliveryCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    deliveryCodeUsed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true }
);

// Relationships
User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

Rider.hasMany(Order, { foreignKey: "riderId", onDelete: "SET NULL" });
Order.belongsTo(Rider, { foreignKey: "riderId", onDelete: "SET NULL" });

export default Order;