import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Rider = sequelize.define("Rider", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  vehicle_type: {
    type: DataTypes.STRING,
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Rider;