const express = require("express");
const router = express.Router();
const {
  getHotels,
  addHotel,
  deleteHotel,
} = require("../controller/HotelController");

router.get("/", getHotels);
router.post("/", addHotel);
router.delete("/:id", deleteHotel);

module.exports = router;
