// routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../Models/booking');

// Create new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      status: 'pending',
    });
    await booking.save();
    res.status(201).json({ message: 'Booking submitted for approval' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving booking' });
  }
});

// Get all bookings of logged-in user
// In routes/UserRouter.js
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId hotelId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err });
  }
});



// Admin: Get pending bookings
router.get('/pending', async (req, res) => {
  try {
    const bookings = await Booking.find({ status: 'pending' }).populate('hotelId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pending bookings' });
  }
});

// Approve Booking
// Approve Booking
router.put('/:id/approve', async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    ).populate('hotelId'); // Optional: populate hotel for user feedback

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ 
      message: `Booking approved for "${updatedBooking.hotelId?.name}"`,
      booking: updatedBooking,
    });
  } catch (err) {
    console.error('Approve error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reject Booking
router.put('/:id/reject', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: 'rejected',
        notificationMessage: 'Your booking has been rejected',
      },
      { new: true }
    ).populate('hotelId');

    res.json({ 
      message: `Booking rejected for "${booking.hotelId?.name}"`,
      booking,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reject booking', error: err });
  }
});



module.exports = router;
