const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getFeaturedBooks,
  getBestsellerBooks,
  getNewArrivals
} = require('../controllers/bookController');

const router = express.Router();

// Public routes
router.get('/', getBooks);
router.get('/featured', getFeaturedBooks);
router.get('/bestsellers', getBestsellerBooks);
router.get('/new-arrivals', getNewArrivals);
router.get('/:id', getBook);

// Admin routes
router.post('/', auth, adminAuth, createBook);
router.put('/:id', auth, adminAuth, updateBook);
router.delete('/:id', auth, adminAuth, deleteBook);

module.exports = router;
