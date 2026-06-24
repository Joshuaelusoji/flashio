// src/models/Vendor.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Vendor = sequelize.define(
  "Vendor",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id",
      },
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    imageUrl: {
      type: DataTypes.STRING,
    },

    rating: {
      type: DataTypes.DECIMAL(2, 1), // e.g. 4.5
      defaultValue: 0.0,
    },

    deliveryTime: {
      type: DataTypes.STRING, // "20-30 mins"
      allowNull: false,
    },

    deliveryFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    indexes: [
      { fields: ["categoryId"] },
      { fields: ["isActive"] },
    ],
  }
);

export default Vendor;