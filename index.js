const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Routers
const userRouter = require("./Routers/UserRouter");
const adminRouter = require("./Routers/AdminRouter");
const hotelRouter = require("./Routers/HotelRouter");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// API Routes


app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/hotels", hotelRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Hotel Management API is Running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
