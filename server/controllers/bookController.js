const Book = require('../models/Book');
const Category = require('../models/Category');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build filter
    const filter = { isActive: true };
    
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    if (req.query.author) {
      filter.author = { $regex: req.query.author, $options: 'i' };
    }
    
    if (req.query.minPrice) {
      filter.price = { ...filter.price, $gte: parseFloat(req.query.minPrice) };
    }
    
    if (req.query.maxPrice) {
      filter.price = { ...filter.price, $lte: parseFloat(req.query.maxPrice) };
    }
    
    if (req.query.format) {
      filter.format = req.query.format;
    }
    
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    // Sort options
    let sort = {};
    if (req.query.sort) {
      const sortField = req.query.sort.startsWith('-') ? req.query.sort.substring(1) : req.query.sort;
      const sortOrder = req.query.sort.startsWith('-') ? -1 : 1;
      sort[sortField] = sortOrder;
    } else {
      sort.createdAt = -1;
    }

    const books = await Book.find(filter)
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        books,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('reviews.user', 'firstName lastName');

    if (!book || !book.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { book }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req, res) => {
  try {
    const bookData = req.body;
    
    // Check if category exists
    const category = await Category.findById(bookData.category);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    const book = await Book.create(bookData);
    
    // Update category book count
    await Category.findByIdAndUpdate(bookData.category, {
      $inc: { bookCount: 1 }
    });

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: { book }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('category', 'name slug');

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: { book: updatedBook }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    await Book.findByIdAndDelete(req.params.id);
    
    // Update category book count
    await Category.findByIdAndUpdate(book.category, {
      $inc: { bookCount: -1 }
    });

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get featured books
// @route   GET /api/books/featured
// @access  Public
const getFeaturedBooks = async (req, res) => {
  try {
    const books = await Book.find({ isActive: true, isFeatured: true })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(12);

    res.status(200).json({
      success: true,
      data: { books }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get bestseller books
// @route   GET /api/books/bestsellers
// @access  Public
const getBestsellerBooks = async (req, res) => {
  try {
    const books = await Book.find({ isActive: true, isBestSeller: true })
      .populate('category', 'name slug')
      .sort({ soldCount: -1 })
      .limit(12);

    res.status(200).json({
      success: true,
      data: { books }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get new arrivals
// @route   GET /api/books/new-arrivals
// @access  Public
const getNewArrivals = async (req, res) => {
  try {
    const books = await Book.find({ isActive: true, isNewArrival: true })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(12);

    res.status(200).json({
      success: true,
      data: { books }
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
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getFeaturedBooks,
  getBestsellerBooks,
  getNewArrivals
};
