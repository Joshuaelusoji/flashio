import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const RiderStatus = sequelize.define("RiderStatus", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  current_order_id: {
    type: DataTypes.UUID,
  },
  riderId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  // NEW
  location: {
    type: DataTypes.GEOMETRY('POINT', 4326),
    allowNull: true,
  },

}, {
  timestamps: true,
});

export default RiderStatus;