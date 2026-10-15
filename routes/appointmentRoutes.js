const express = require('express');

const router = express.Router();

const appointmentController = require('../controllers/appointmentController');

const requireLogin = require('../middleware/authMiddleware');

// Get all appointments
router.get('/', requireLogin, appointmentController.getAllAppointments);

// Get one appointment
router.get('/:id', requireLogin, appointmentController.getAppointmentById);

// Add appointment
router.post('/', requireLogin, appointmentController.createAppointment);

// Update appointment
router.put('/:id', requireLogin, appointmentController.updateAppointment);

// Delete appointment
router.delete('/:id', requireLogin, appointmentController.deleteAppointment);

module.exports = router;