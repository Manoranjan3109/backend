const Hotel = require("../Models/Hotel");

exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
};

exports.addHotel = async (req, res) => {
  try {
    const { name, location, price } = req.body;
    if (!name || !location || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hotel = new Hotel({ name, location, price });
    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    res.status(500).json({ error: "Failed to add hotel" });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const deleted = await Hotel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Hotel not found" });

    res.json({ message: "Hotel deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete hotel" });
  }
};
