const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { protect, adminOnly } = require("../Middleware/AuthMiddleware");
const {
  createHotel,
  listHotels,
  updateHotel,
  removeHotel
} = require("../controller/HotelController");

const router = express.Router();

// Ensure uploads dir exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});
const upload = multer({ storage });

// Hotel CRUD routes (admin only)
router.get('/hotels', protect, adminOnly, listHotels);
router.post('/hotels', protect, adminOnly, upload.single('image'), createHotel);
router.put('/hotels/:id', protect, adminOnly, upload.single('image'), updateHotel);
router.delete('/hotels/:id', protect, adminOnly, removeHotel);

// Dummy admin dashboard route (optional)
router.get('/admin-dashboard', (req, res) => {
  res.status(200).json({ message: 'Admin dashboard data' });
});

module.exports = router;
