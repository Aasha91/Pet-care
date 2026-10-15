const db = require('../config/db');

// Get all vaccinations
const getAllVaccinations = (callback) => {
    const sql = `
        SELECT
            vaccinations.vaccination_id,
            vaccinations.pet_id,
            pets.pet_name,
            vaccinations.vaccine_name,
            vaccinations.vaccination_date,
            vaccinations.next_due_date,
            vaccinations.notes
        FROM vaccinations
        JOIN pets ON vaccinations.pet_id = pets.pet_id
        ORDER BY vaccinations.vaccination_date DESC
    `;

    db.query(sql, callback);
};

// Get vaccination by ID
const getVaccinationById = (id, callback) => {
    const sql = `
        SELECT *
        FROM vaccinations
        WHERE vaccination_id = ?
    `;

    db.query(sql, [id], callback);
};

// Create vaccination
const createVaccination = (vaccination, callback) => {
    const sql = `
        INSERT INTO vaccinations
        (pet_id, vaccine_name, vaccination_date, next_due_date, notes)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        vaccination.pet_id,
        vaccination.vaccine_name,
        vaccination.vaccination_date,
        vaccination.next_due_date || null,
        vaccination.notes || null
    ];

    db.query(sql, values, callback);
};

// Update vaccination
const updateVaccination = (id, vaccination, callback) => {
    const sql = `
        UPDATE vaccinations
        SET pet_id = ?,
            vaccine_name = ?,
            vaccination_date = ?,
            next_due_date = ?,
            notes = ?
        WHERE vaccination_id = ?
    `;

    const values = [
        vaccination.pet_id,
        vaccination.vaccine_name,
        vaccination.vaccination_date,
        vaccination.next_due_date || null,
        vaccination.notes || null,
        id
    ];

    db.query(sql, values, callback);
};

// Delete vaccination
const deleteVaccination = (id, callback) => {
    const sql = `
        DELETE FROM vaccinations
        WHERE vaccination_id = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    getAllVaccinations,
    getVaccinationById,
    createVaccination,
    updateVaccination,
    deleteVaccination
};