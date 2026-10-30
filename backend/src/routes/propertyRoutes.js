const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const upload = require('../middleware/uploadMiddleware');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// 1. PUBLIC ROUTES (Koi bhi dekh sakta hai)
// Sabhi properties dekhne ke liye
router.get('/', propertyController.getAllProperties);

// Single property detail dekhne ke liye
router.get('/:id', propertyController.getPropertyById);


// 2. ADMIN PROTECTED ROUTES (Sirf logged-in Admin hi access kar sakta hai)
// Nayi property add karne ke liye
router.post('/', verifyToken, isAdmin, upload.array('images', 10), propertyController.createProperty);

// Existing property update karne ke liye
router.put('/:id', verifyToken, isAdmin, propertyController.updateProperty);

// Property delete karne ke liye
router.delete('/:id', verifyToken, isAdmin, propertyController.deleteProperty);

// ... baaki saare routes yahan upar honge (jaise get, post, put, delete) ...

router.delete('/id', verifyToken, isAdmin, propertyController.deleteProperty);

// 👉 APKO STATS ROUTE YAHAN ADD KARNA HAI:
router.get('/stats/overview', verifyToken, isAdmin, async (req, res) => {
  try {
    const db = require('../config/db');
    
    const [propertyCount] = await db.query('SELECT COUNT(*) as total FROM properties');
    const [userCount] = await db.query('SELECT COUNT(*) as total FROM users');
    const [enquiryCount] = await db.query('SELECT COUNT(*) as total FROM enquiries');
    const [recentProperties] = await db.query('SELECT * FROM properties ORDER BY id DESC LIMIT 5');

    res.json({
      success: true,
      totalProperties: propertyCount[0].total,
      totalUsers: userCount[0].total,
      totalEnquiries: enquiryCount[0].total,
      recentProperties
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Yeh line already aakhri mein hogi:
module.exports = router;

module.exports = router;