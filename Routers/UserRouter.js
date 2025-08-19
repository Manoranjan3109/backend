const express = require("express");
const router = express.Router();
const { register, login, getUserBookings } = require('../controller/UserController');
const { protect } = require("../middleware/AuthMiddleware");

// User routes
router.post("/register", register);
router.post("/login", login);

// Protected route to get current user's bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId hotelId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err });
  }
});

module.exports = router;
