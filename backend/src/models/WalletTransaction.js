import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Wallet from './Wallet.js';

const WalletTransaction = sequelize.define('WalletTransaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },

  type: {
    type: DataTypes.ENUM('CREDIT', 'DEBIT'),
    allowNull: false
  },

  description: {
    type: DataTypes.STRING
  },

  walletId: {
    type: DataTypes.UUID,
    allowNull: false
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },

  orderId: {
    type: DataTypes.UUID,
    allowNull: true
  },

  reference: {
    type: DataTypes.STRING,
    unique: true
  }

}, {
  timestamps: true
});

/* =========================
   RELATIONSHIPS
========================= */
Wallet.hasMany(WalletTransaction, { foreignKey: 'walletId' });
WalletTransaction.belongsTo(Wallet, { foreignKey: 'walletId' });

export default WalletTransaction;