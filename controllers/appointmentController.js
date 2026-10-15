const appointmentModel = require('../models/appointmentModel');

// Get all appointments
const getAllAppointments = (req, res) => {

    appointmentModel.getAllAppointments((err, results) => {

        if (err) {
            return res.status(500).json({
                error: 'Failed to fetch appointments'
            });
        }

        res.json(results);
    });
};


// Get one appointment
const getAppointmentById = (req, res) => {

    const appointmentId = req.params.id;

    appointmentModel.getAppointmentById(
        appointmentId,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: 'Failed to fetch appointment'
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Appointment not found'
                });
            }

            res.json(result[0]);
        }
    );
};


// Create appointment
const createAppointment = (req, res) => {

    const appointment = req.body;

    appointmentModel.createAppointment(
        appointment,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: 'Failed to create appointment'
                });
            }

            res.status(201).json({
                message: 'Appointment created successfully',
                appointment_id: result.insertId
            });
        }
    );
};


// Update appointment
const updateAppointment = (req, res) => {

    const appointmentId = req.params.id;
    const appointment = req.body;

    appointmentModel.updateAppointment(
        appointmentId,
        appointment,
        (err) => {

            if (err) {
                return res.status(500).json({
                    error: 'Failed to update appointment'
                });
            }

            res.json({
                message: 'Appointment updated successfully'
            });
        }
    );
};


// Delete appointment
const deleteAppointment = (req, res) => {

    const appointmentId = req.params.id;

    appointmentModel.deleteAppointment(
        appointmentId,
        (err) => {

            if (err) {
                return res.status(500).json({
                    error: 'Failed to delete appointment'
                });
            }

            res.json({
                message: 'Appointment deleted successfully'
            });
        }
    );
};


module.exports = {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment
};