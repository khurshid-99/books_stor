const User = require('../models/User');
const Book = require('../models/Book');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, avatar } = req.body;
    
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (avatar) updateData.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Add address to user
// @route   POST /api/users/addresses
// @access  Private
const addAddress = async (req, res) => {
  try {
    const { type, street, city, state, zipCode, country, isDefault } = req.body;

    const user = await User.findById(req.user.id);
    
    // If this is default, unset other default addresses
    if (isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses.push({
      type,
      street,
      city,
      state,
      zipCode,
      country,
      isDefault: isDefault || false
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      data: { addresses: user.addresses }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update user address
// @route   PUT /api/users/addresses/:addressId
// @access  Private
const updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const addressIndex = user.addresses.findIndex(
      addr => addr._id.toString() === req.params.addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // If this is default, unset other default addresses
    if (req.body.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    // Update address
    Object.assign(user.addresses[addressIndex], req.body);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Address updated successfully',
      data: { addresses: user.addresses }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete user address
// @route   DELETE /api/users/addresses/:addressId
// @access  Private
const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.addresses = user.addresses.filter(
      addr => addr._id.toString() !== req.params.addressId
    );

    await user.save();

    res.status(200).json({
      success: false,
      message: 'Address deleted successfully',
      data: { addresses: user.addresses }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Add book to wishlist
// @route   POST /api/users/wishlist
// @access  Private
const addToWishlist = async (req, res) => {
  try {
    const { bookId } = req.body;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    const user = await User.findById(req.user.id);
    
    // Check if book is already in wishlist
    if (user.wishlist.includes(bookId)) {
      return res.status(400).json({
        success: false,
        message: 'Book already in wishlist'
      });
    }

    user.wishlist.push(bookId);
    await user.save();

    await user.populate('wishlist', 'title author coverImage price');

    res.status(200).json({
      success: true,
      message: 'Book added to wishlist',
      data: { wishlist: user.wishlist }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Remove book from wishlist
// @route   DELETE /api/users/wishlist/:bookId
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter(
      book => book.toString() !== req.params.bookId
    );

    await user.save();

    await user.populate('wishlist', 'title author coverImage price');

    res.status(200).json({
      success: true,
      message: 'Book removed from wishlist',
      data: { wishlist: user.wishlist }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('wishlist', 'title author coverImage price rating');

    res.status(200).json({
      success: true,
      data: { wishlist: user.wishlist }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  addToWishlist,
  removeFromWishlist,
  getWishlist
};
