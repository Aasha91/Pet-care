const vaccinationModel = require('../models/vaccinationModel');

// Get all vaccinations
const getAllVaccinations = (req, res) => {
    vaccinationModel.getAllVaccinations((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Failed to fetch vaccinations'
            });
        }

        res.json(results);
    });
};

// Get vaccination by ID
const getVaccinationById = (req, res) => {
    const id = req.params.id;

    vaccinationModel.getVaccinationById(id, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Failed to fetch vaccination'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Vaccination not found'
            });
        }

        res.json(results[0]);
    });
};

// Create vaccination
const createVaccination = (req, res) => {
    const {
        pet_id,
        vaccine_name,
        vaccination_date,
        next_due_date,
        notes
    } = req.body;

    if (
        !Number.isInteger(Number(pet_id)) ||
        Number(pet_id) <= 0 ||
        !vaccine_name ||
        !vaccine_name.trim() ||
        !vaccination_date
    ) {
        return res.status(400).json({
            message: 'Pet, vaccine name and vaccination date are required'
        });
    }

    const vaccination = {
        pet_id: Number(pet_id),
        vaccine_name: vaccine_name.trim(),
        vaccination_date,
        next_due_date: next_due_date || null,
        notes: notes ? notes.trim() : null
    };

    vaccinationModel.createVaccination(vaccination, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Failed to create vaccination'
            });
        }

        res.status(201).json({
            message: 'Vaccination added successfully',
            vaccination_id: result.insertId
        });
    });
};

// Update vaccination
const updateVaccination = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: 'Invalid vaccination ID'
        });
    }

    const {
        pet_id,
        vaccine_name,
        vaccination_date,
        next_due_date,
        notes
    } = req.body;

    if (
        !Number.isInteger(Number(pet_id)) ||
        Number(pet_id) <= 0 ||
        !vaccine_name ||
        !vaccine_name.trim() ||
        !vaccination_date
    ) {
        return res.status(400).json({
            message: 'Pet, vaccine name and vaccination date are required'
        });
    }

    const vaccination = {
        pet_id: Number(pet_id),
        vaccine_name: vaccine_name.trim(),
        vaccination_date,
        next_due_date: next_due_date || null,
        notes: notes ? notes.trim() : null
    };

    vaccinationModel.updateVaccination(id, vaccination, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Failed to update vaccination'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Vaccination not found'
            });
        }

        res.json({
            message: 'Vaccination updated successfully'
        });
    });
};

// Delete vaccination
const deleteVaccination = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: 'Invalid vaccination ID'
        });
    }

    vaccinationModel.deleteVaccination(id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Failed to delete vaccination'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Vaccination not found'
            });
        }

        res.json({
            message: 'Vaccination deleted successfully'
        });
    });
};

module.exports = {
    getAllVaccinations,
    getVaccinationById,
    createVaccination,
    updateVaccination,
    deleteVaccination
};