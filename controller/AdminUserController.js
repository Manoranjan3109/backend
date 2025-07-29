const jwt = require("jsonwebtoken");

exports.adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@hotel.com" && password === "admin123") {
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({ message: "Admin login successful", token });
  }

  res.status(401).json({ message: "Invalid admin credentials" });
};
