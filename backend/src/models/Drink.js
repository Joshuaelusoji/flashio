import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Drink = sequelize.define(
  "Drinks",
  {
    id:       { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name:     { type: DataTypes.STRING, allowNull: false },
    price:    { type: DataTypes.INTEGER, allowNull: false },
    imageId:    { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);

export default Drink;