const express = require('express');
const router = express.Router();

const vaccinationController =
    require('../controllers/vaccinationController');

const requireLogin =
    require('../middleware/authMiddleware');

// Get all vaccinations
router.get('/', requireLogin, vaccinationController.getAllVaccinations);

// Get one vaccination
router.get('/:id', requireLogin, vaccinationController.getVaccinationById);

// Add vaccination
router.post('/', requireLogin, vaccinationController.createVaccination);

// Update vaccination
router.put('/:id', requireLogin, vaccinationController.updateVaccination);

// Delete vaccination
router.delete('/:id', requireLogin, vaccinationController.deleteVaccination);

module.exports = router;