import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const FeaturedMeal = sequelize.define(
  "FeaturedMeal",
  {
    id:       { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name:     { type: DataTypes.STRING, allowNull: false },
    price:    { type: DataTypes.INTEGER, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    image:    { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);

export default FeaturedMeal;