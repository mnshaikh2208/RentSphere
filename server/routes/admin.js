import express from 'express';
import User from '../models/User.js';
import Listing from '../models/Listing.js';
import Booking from '../models/Booking.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const adminProtect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      const user = await User.findById(decoded.id).select('-password');
      if (user && user.role === 'admin') {
          req.user = user;
          next();
      } else {
          res.status(401).json({ message: 'Not authorized as an admin' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

router.get('/stats', adminProtect, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalVehicles = await Listing.countDocuments({ type: 'vehicle' });
    const totalRooms = await Listing.countDocuments({ type: 'property' });
    const totalBookings = await Booking.countDocuments();
    
    res.json({ totalUsers, totalVehicles, totalRooms, totalBookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/users', adminProtect, async (req, res) => {
    try {
      const users = await User.find({}).select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.get('/bookings', adminProtect, async (req, res) => {
    try {
      const bookings = await Booking.find({}).populate('user', 'id name email').populate('listing', 'id title name type');
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});


export default router;
