import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Wallet = sequelize.define('Wallet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },

  currency: {
    type: DataTypes.STRING,
    defaultValue: "NGN"
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: 'Users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },

  version: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }

}, {
  timestamps: true
});

/* =========================
   RELATIONSHIP
========================= */
User.hasOne(Wallet, { foreignKey: 'userId' });
Wallet.belongsTo(User, { foreignKey: 'userId' });

export default Wallet;