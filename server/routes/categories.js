const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getRootCategories
} = require('../controllers/categoryController');

const router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/root', getRootCategories);
router.get('/:id', getCategory);

// Admin routes
router.post('/', auth, adminAuth, createCategory);
router.put('/:id', auth, adminAuth, updateCategory);
router.delete('/:id', auth, adminAuth, deleteCategory);

module.exports = router;
