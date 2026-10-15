const petModel = require('../models/petModel');

// Get all pets
const getAllPets = (req, res) => {
    petModel.getAllPets((err, results) => {
        if (err) {
            return res.status(500).json({
                error: 'Failed to fetch pets'
            });
        }

        res.json(results);
    });
};

// Get one pet
const getPetById = (req, res) => {
    const petId = req.params.id;

    petModel.getPetById(petId, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 'Failed to fetch pet'
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Pet not found'
            });
        }

        res.json(result[0]);
    });
};

// Create pet
const createPet = (req, res) => {
    const pet = req.body;

    petModel.createPet(pet, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 'Failed to create pet'
            });
        }

        res.status(201).json({
            message: 'Pet created successfully',
            pet_id: result.insertId
        });
    });
};

// Update pet
const updatePet = (req, res) => {
    const petId = req.params.id;
    const pet = req.body;

    petModel.updatePet(petId, pet, (err) => {
        if (err) {
            return res.status(500).json({
                error: 'Failed to update pet'
            });
        }

        res.json({
            message: 'Pet updated successfully'
        });
    });
};

// Delete pet
const deletePet = (req, res) => {
    const petId = req.params.id;

    petModel.deletePet(petId, (err) => {
        if (err) {
            return res.status(500).json({
                error: 'Failed to delete pet'
            });
        }

        res.json({
            message: 'Pet deleted successfully'
        });
    });
};

module.exports = {
    getAllPets,
    getPetById,
    createPet,
    updatePet,
    deletePet
};