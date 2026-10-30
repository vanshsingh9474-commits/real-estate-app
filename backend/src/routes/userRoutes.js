const express = require('express');
const router = express.Router();
const { getUsers, getUserById, deleteUser } = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
module.exports = router;