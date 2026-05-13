import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Restaurant = sequelize.define(
  "Restaurant",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name:     { type: DataTypes.STRING, allowNull: false },
    path:     { type: DataTypes.STRING, allowNull: false },
    image:    { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);

export default Restaurant;