const express = require('express');

const router = express.Router();

const ownerController = require('../controllers/ownerController');

const requireLogin = require('../middleware/authMiddleware');

// Get all owners
router.get('/', requireLogin, ownerController.getAllOwners);

// Get one owner
router.get('/:id', requireLogin, ownerController.getOwnerById);

// Add new owner
router.post('/', requireLogin, ownerController.createOwner);

// Update owner
router.put('/:id', requireLogin, ownerController.updateOwner);

// Delete owner
router.delete('/:id', requireLogin, ownerController.deleteOwner);

module.exports = router;