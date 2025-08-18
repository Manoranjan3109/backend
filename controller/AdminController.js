exports.getAdminData = (req, res) => {
  res.status(200).json({
    message: "Welcome Admin!",
    stats: { users: 100, hotels: 25, bookings: 78 }
  });
};