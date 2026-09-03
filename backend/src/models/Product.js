// src/models/Product.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    vendorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Vendors",
        key: "id",
      },
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    imageId: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default Product;