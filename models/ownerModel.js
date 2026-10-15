const db = require('../config/db');

// Get all owners
const getAllOwners = (callback) => {
    const sql = 'SELECT * FROM owners';

    db.query(sql, callback);
};

// Get one owner
const getOwnerById = (ownerId, callback) => {
    const sql = 'SELECT * FROM owners WHERE owner_id = ?';

    db.query(sql, [ownerId], callback);
};

// Create owner
const createOwner = (owner, callback) => {
    const sql = `
        INSERT INTO owners
        (name, phone, email, address)
        VALUES (?, ?, ?, ?)
    `;

    const values = [
        owner.name,
        owner.phone,
        owner.email,
        owner.address
    ];

    db.query(sql, values, callback);
};

// Update owner
const updateOwner = (ownerId, owner, callback) => {
    const sql = `
        UPDATE owners
        SET name = ?,
            phone = ?,
            email = ?,
            address = ?
        WHERE owner_id = ?
    `;

    const values = [
        owner.name,
        owner.phone,
        owner.email,
        owner.address,
        ownerId
    ];

    db.query(sql, values, callback);
};

// Delete owner
const deleteOwner = (ownerId, callback) => {
    const sql = 'DELETE FROM owners WHERE owner_id = ?';

    db.query(sql, [ownerId], callback);
};

module.exports = {
    getAllOwners,
    getOwnerById,
    createOwner,
    updateOwner,
    deleteOwner
};