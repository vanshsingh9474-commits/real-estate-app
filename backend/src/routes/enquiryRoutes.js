const express = require('express');
const router = express.Router();
const { 
  createEnquiry, 
  getEnquiries, 
  deleteEnquiry 
} = require('../controllers/enquiryController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Submit an enquiry (Anyone can submit, token is optional or required based on your choice)
router.post('/', createEnquiry);

// Admin routes to view and manage enquiries
router.get('/', getEnquiries);
router.delete('/:id', verifyToken, isAdmin, deleteEnquiry);

module.exports = router;