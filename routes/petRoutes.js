const express = require('express');

const router = express.Router();

const petController = require('../controllers/petController');

const requireLogin = require('../middleware/authMiddleware');

// Get all pets
router.get('/', requireLogin, petController.getAllPets);

// Get one pet
router.get('/:id', requireLogin, petController.getPetById);

// Add new pet
router.post('/', requireLogin, petController.createPet);

// Update pet
router.put('/:id', requireLogin, petController.updatePet);

// Delete pet
router.delete('/:id', requireLogin, petController.deletePet);

module.exports = router;