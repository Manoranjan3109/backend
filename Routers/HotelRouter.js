const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const hotelController = require('../controller/HotelController');

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// --------- ADMIN ROUTES (Protected) ---------
router.post('/admin/hotels', upload.single('image'), hotelController.createHotel);
router.put('/admin/hotels/:id', upload.single('image'), hotelController.updateHotel);
router.delete('/admin/hotels/:id', hotelController.removeHotel);

// --------- PUBLIC ROUTES ---------
router.get('/hotels', hotelController.listHotels);

module.exports = router;
