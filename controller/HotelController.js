const Hotel = require("../models/Hotel");
const path = require('path');

// Create hotel
exports.createHotel = async (req, res) => {
  try {
    const { name, address, rating, rate } = req.body;

    if (!name || !address || rating == null || rate == null) {
      return res.status(400).json({ message: 'name, address, rating, rate are required' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imageUrl) {
      return res.status(400).json({ message: 'image is required' });
    }

    const hotel = await Hotel.create({
      name,
      address,
      rating: Number(rating),
      rate: Number(rate),
      imageUrl,
    });

    return res.status(201).json({ hotel });
  } catch (err) {
    console.error('CREATE HOTEL ERROR:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// List all hotels (public)
exports.listHotels = async (_req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.status(200).json({ hotels });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update hotel
exports.updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = {
      name: req.body.name,
      address: req.body.address,
      rating: req.body.rating != null ? Number(req.body.rating) : undefined,
      rate: req.body.rate != null ? Number(req.body.rate) : undefined,
    };

    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

    if (req.file) {
      payload.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Hotel.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) return res.status(404).json({ message: 'Hotel not found' });

    res.json({ hotel: updated });
  } catch (err) {
    console.error('UPDATE HOTEL ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete hotel
exports.removeHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Hotel.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ message: 'Hotel not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('DELETE HOTEL ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

