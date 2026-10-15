const treatmentModel = require('../models/treatmentModel');

// Get all treatments
const getAllTreatments = (req, res) => {

    treatmentModel.getAllTreatments((err, results) => {

        if (err) {
            return res.status(500).json({
                error: 'Failed to fetch treatments'
            });
        }

        res.json(results);
    });
};


// Get one treatment
const getTreatmentById = (req, res) => {

    const treatmentId = req.params.id;

    treatmentModel.getTreatmentById(
        treatmentId,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: 'Failed to fetch treatment'
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Treatment not found'
                });
            }

            res.json(result[0]);
        }
    );
};


// Create treatment
const createTreatment = (req, res) => {

    const treatment = req.body;

    treatmentModel.createTreatment(
        treatment,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: 'Failed to create treatment'
                });
            }

            res.status(201).json({
                message: 'Treatment created successfully',
                treatment_id: result.insertId
            });
        }
    );
};


// Update treatment
const updateTreatment = (req, res) => {

    const treatmentId = req.params.id;
    const treatment = req.body;

    treatmentModel.updateTreatment(
        treatmentId,
        treatment,
        (err) => {

            if (err) {
                return res.status(500).json({
                    error: 'Failed to update treatment'
                });
            }

            res.json({
                message: 'Treatment updated successfully'
            });
        }
    );
};


// Delete treatment
const deleteTreatment = (req, res) => {

    const treatmentId = req.params.id;

    treatmentModel.deleteTreatment(
        treatmentId,
        (err) => {

            if (err) {
                return res.status(500).json({
                    error: 'Failed to delete treatment'
                });
            }

            res.json({
                message: 'Treatment deleted successfully'
            });
        }
    );
};


module.exports = {
    getAllTreatments,
    getTreatmentById,
    createTreatment,
    updateTreatment,
    deleteTreatment
};