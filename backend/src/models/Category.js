// src/models/Category.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Category = sequelize.define(
  "Categories",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING, // "restaurants", "shops" — used to build the path on the frontend
      allowNull: false,
      unique: true,
    },

    color: {
      type: DataTypes.STRING, // "bg-orange-100"
      allowNull: false,
    },

    textColor: {
      type: DataTypes.STRING, // "text-orange-800"
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Category;