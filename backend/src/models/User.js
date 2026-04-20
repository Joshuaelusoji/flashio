import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  firstName: {
    type: DataTypes.STRING(25),
    allowNull: false
  },

  lastName: {
    type: DataTypes.STRING(25),
    allowNull: false
  },

  email: {
    type: DataTypes.STRING(35),
    allowNull: false,
    unique: true
  },

  phone: {
    type: DataTypes.STRING(19)
  },

  role: {
    type: DataTypes.ENUM('USER', 'VENDOR', 'RIDER', 'ADMIN'),
    defaultValue: 'USER'
  },

  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },

  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },

  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  emailToken: {
    type: DataTypes.STRING,
    allowNull: true
  },

  emailTokenExpiry: {
    type: DataTypes.DATE,
    allowNull: true
  },

  // 🔐 SECURITY (recommended)
  failedLoginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  lockUntil: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  // 🚚 OPTIONAL FOR DELIVERY SYSTEM
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },

  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  }

}, {
  timestamps: true,
  defaultScope: {
    attributes: { exclude: ["passwordHash"] }
  }
});

export default User;