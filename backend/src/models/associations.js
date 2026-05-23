import User from "./User.js";
import Rider from "./Rider.js";
import RiderStatus from "./RiderStatus.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Product from "./Product.js";
import Wallet from "./Wallet.js";
import WalletTransaction from "./WalletTransaction.js";
import Payment from "./Payment.js";
import Category from "./Category.js";
import Vendor from "./Vendor.js";


/* =========================
   USER RELATIONSHIPS
========================= */
User.hasOne(Wallet, { foreignKey: "userId" });
Wallet.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

/* =========================
   RIDER RELATIONSHIPS
========================= */
User.hasOne(Rider, { foreignKey: "userId" });
Rider.belongsTo(User, { foreignKey: "userId" });

Rider.hasOne(RiderStatus, { foreignKey: "riderId" });
RiderStatus.belongsTo(Rider, { foreignKey: "riderId" });

Rider.hasMany(Order, { foreignKey: "riderId" });
Order.belongsTo(Rider, { foreignKey: "riderId" });

/* =========================
   ORDER RELATIONSHIPS
========================= */
Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

/* =========================
   PAYMENT RELATIONSHIPS
========================= */

Order.hasMany(Payment, {
  foreignKey: "orderId",
  onDelete: "CASCADE"
});

Payment.belongsTo(Order, {
  foreignKey: "orderId",
  onDelete: "CASCADE"
});

/* =========================
   WALLET RELATIONSHIPS
========================= */

Wallet.hasMany(WalletTransaction, {
  foreignKey: "walletId"
});

WalletTransaction.belongsTo(Wallet, {
  foreignKey: "walletId"
});

Category.hasMany(Vendor, { foreignKey: "categoryId", onDelete: "CASCADE" });
Vendor.belongsTo(Category, { foreignKey: "categoryId", onDelete: "CASCADE" });

// Vendor -> Product
Vendor.hasMany(Product, { foreignKey: "vendorId", onDelete: "CASCADE" });
Product.belongsTo(Vendor, { foreignKey: "vendorId", onDelete: "CASCADE" });