// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  status: { type: String, default: 'pending' }, // 'pending', 'approved', 'rejected'
  checkIn: Date,
  checkOut: Date,
  roomType: String,
  adults: Number,
  children: Number,
  name: String,
  email: String,
  notificationMessage: String, // ✅ Keeps this field
});

// Prevent OverwriteModelError
module.exports = mongoose.models.hotelbooking || mongoose.model('hotelbooking', bookingSchema);
