const express = require('express');

const router = express.Router();

const treatmentController = require('../controllers/treatmentController');

const requireLogin = require('../middleware/authMiddleware');

// Get all treatments
router.get('/', requireLogin, treatmentController.getAllTreatments);

// Get one treatment
router.get('/:id', requireLogin, treatmentController.getTreatmentById);

// Add treatment
router.post('/', requireLogin, treatmentController.createTreatment);

// Update treatment
router.put('/:id', requireLogin, treatmentController.updateTreatment);

// Delete treatment
router.delete('/:id', requireLogin, treatmentController.deleteTreatment);

module.exports = router;