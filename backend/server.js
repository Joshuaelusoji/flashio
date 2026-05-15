import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./src/config/database.js";

import authRoutes from "./src/routes/auth.js";
import orderRoutes from "./src/routes/orders.js";
import paymentRoutes from "./src/routes/payments.js";
import categoriesRouter from "./src/routes/categories.js";
import restaurantsRouter from "./src/routes/restaurants.js";
import featuredMealsRouter from "./src/routes/featuredMeals.js";


import authMiddleware from "./src/middleware/authMiddleware.js";

// Models
import "./src/models/User.js";
import "./src/models/Wallet.js";
import "./src/models/WalletTransaction.js";
import "./src/models/Product.js";
import "./src/models/Order.js";
import "./src/models/OrderItem.js";
import "./src/models/Rider.js";
import "./src/models/RiderStatus.js";
import "./src/models/Payment.js";
import "./src/models/associations.js";
import "./src/models/Restaurant.js";
import "./src/models/FeaturedMeals.js";


import Product from "./src/models/Product.js";

import categoryRoutes from "./src/routes/categories.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* =========================
   CORS
========================= */
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS not allowed"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());
app.use(cookieParser());

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/categories", categoriesRouter);
app.use("/api/restaurants", restaurantsRouter);
app.use("/featured-meals", featuredMealsRouter);


/* =========================
   PRODUCTS
========================= */
app.get("/api/products", async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

app.get("/api/products/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

app.post("/api/products", authMiddleware, async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

/* =========================
   HEALTH
========================= */
app.get("/", (req, res) => {
  res.send("Flashio backend is running");
});

/* =========================
   START
========================= */
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();