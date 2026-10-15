const db = require('../config/db');

// Get all treatments
const getAllTreatments = (callback) => {
    const sql = `
        SELECT
            treatments.treatment_id,
            treatments.pet_id,
            pets.pet_name,
            treatments.treatment_name,
            treatments.description,
            treatments.treatment_date,
            treatments.cost
        FROM treatments
        JOIN pets ON treatments.pet_id = pets.pet_id
        ORDER BY treatments.treatment_date DESC
    `;

    db.query(sql, callback);
};

// Get one treatment
const getTreatmentById = (treatmentId, callback) => {
    const sql = `
        SELECT *
        FROM treatments
        WHERE treatment_id = ?
    `;

    db.query(sql, [treatmentId], callback);
};

// Create treatment
const createTreatment = (treatment, callback) => {
    const sql = `
        INSERT INTO treatments
        (pet_id, treatment_name, description, treatment_date, cost)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        treatment.pet_id,
        treatment.treatment_name,
        treatment.description,
        treatment.treatment_date,
        treatment.cost
    ];

    db.query(sql, values, callback);
};

// Update treatment
const updateTreatment = (treatmentId, treatment, callback) => {
    const sql = `
        UPDATE treatments
        SET pet_id = ?,
            treatment_name = ?,
            description = ?,
            treatment_date = ?,
            cost = ?
        WHERE treatment_id = ?
    `;

    const values = [
        treatment.pet_id,
        treatment.treatment_name,
        treatment.description,
        treatment.treatment_date,
        treatment.cost,
        treatmentId
    ];

    db.query(sql, values, callback);
};

// Delete treatment
const deleteTreatment = (treatmentId, callback) => {
    const sql = `
        DELETE FROM treatments
        WHERE treatment_id = ?
    `;

    db.query(sql, [treatmentId], callback);
};

module.exports = {
    getAllTreatments,
    getTreatmentById,
    createTreatment,
    updateTreatment,
    deleteTreatment
};