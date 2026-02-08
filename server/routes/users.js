const express = require('express');
const { auth } = require('../middleware/auth');
const {
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  addToWishlist,
  removeFromWishlist,
  getWishlist
} = require('../controllers/userController');

const router = express.Router();

// All routes require authentication
router.use(auth);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', updateProfile);

// @route   GET /api/users/wishlist
// @desc    Get user wishlist
// @access  Private
router.get('/wishlist', getWishlist);

// @route   POST /api/users/wishlist
// @desc    Add book to wishlist
// @access  Private
router.post('/wishlist', addToWishlist);

// @route   DELETE /api/users/wishlist/:bookId
// @desc    Remove book from wishlist
// @access  Private
router.delete('/wishlist/:bookId', removeFromWishlist);

// Address routes
// @route   POST /api/users/addresses
// @desc    Add address to user
// @access  Private
router.post('/addresses', addAddress);

// @route   PUT /api/users/addresses/:addressId
// @desc    Update user address
// @access  Private
router.put('/addresses/:addressId', updateAddress);

// @route   DELETE /api/users/addresses/:addressId
// @desc    Delete user address
// @access  Private
router.delete('/addresses/:addressId', deleteAddress);

module.exports = router;
