const ownerModel = require('../models/ownerModel');

// Get all owners
const getAllOwners = (req, res) => {
    ownerModel.getAllOwners((err, results) => {
        if (err) {
            return res.status(500).json({
                error: 'Failed to fetch owners'
            });
        }

        res.json(results);
    });
};

// Get one owner
const getOwnerById = (req, res) => {
    const ownerId = req.params.id;

    ownerModel.getOwnerById(ownerId, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 'Failed to fetch owner'
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Owner not found'
            });
        }

        res.json(result[0]);
    });
};

// Create owner
const createOwner = (req, res) => {
    const owner = req.body;

    ownerModel.createOwner(owner, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 'Failed to create owner'
            });
        }

        res.status(201).json({
            message: 'Owner created successfully',
            owner_id: result.insertId
        });
    });
};

// Update owner
const updateOwner = (req, res) => {
    const ownerId = req.params.id;
    const owner = req.body;

    ownerModel.updateOwner(ownerId, owner, (err) => {
        if (err) {
            return res.status(500).json({
                error: 'Failed to update owner'
            });
        }

        res.json({
            message: 'Owner updated successfully'
        });
    });
};

// Delete owner
const deleteOwner = (req, res) => {
    const ownerId = req.params.id;

    ownerModel.deleteOwner(ownerId, (err) => {
        if (err) {
            return res.status(500).json({
                error: 'Failed to delete owner'
            });
        }

        res.json({
            message: 'Owner deleted successfully'
        });
    });
};

module.exports = {
    getAllOwners,
    getOwnerById,
    createOwner,
    updateOwner,
    deleteOwner
};