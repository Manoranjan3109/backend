const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");


dotenv.config();

const userRouter  = require("./Routers/UserRouter");
const adminRouter = require("./Routers/AdminRouter");
const hotelRouter = require("./Routers/HotelRouter");
const bookingRoutes = require('./Routers/booking');

const app  = express();
const PORT = process.env.PORT || 5000;



app.use(cors({
  origin: "*", // include both ports
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Serve uploaded files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// MongoDB connection
const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hotel_app";
mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// Route mounting
app.use("/api/user",   userRouter);
app.use("/api/admin",  adminRouter);
app.use("/api", hotelRouter); // Handles /api/hotels and /api/admin/hotels
app.use('/api/bookings', bookingRoutes);

app.get("/", (_req, res) => res.send("🚀 Hotel Management API is Running..."));

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));