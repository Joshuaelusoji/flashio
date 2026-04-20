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
      type: DataTypes.ENUM(
        "PENDING",
        "IN_PROGRESS",
        "DELIVERED",
        "CANCELLED"
      ),
      defaultValue: "PENDING",
    },

    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    riderId: {
      type: DataTypes.UUID,
    },

    // ✅ NEW: delivery verification code (OTP)
    deliveryCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // ✅ NEW: prevents reuse of code
    deliveryCodeUsed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true }
);

// Relationships
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Rider.hasMany(Order, { foreignKey: "riderId" });
Order.belongsTo(Rider, { foreignKey: "riderId" });

export default Order;