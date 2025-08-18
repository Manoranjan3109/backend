const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true },
    address: { type: String, required: true },
    rating:  { type: Number, min: 1, max: 5, required: true },
    rate:    { type: Number, min: 0, required: true },
    imageUrl:{ type: String } // e.g., /uploads/1712345678-123.jpg
  },

);

module.exports = mongoose.model("Hotel", HotelSchema);
