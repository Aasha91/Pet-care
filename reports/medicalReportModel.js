const db = require('../config/db');

// Get medical history for one pet
const getPetMedicalHistory = (petId, callback) => {

    const sql = `
        SELECT
            pets.pet_id,
            pets.pet_name,
            pets.species,
            pets.breed,
            pets.age,
            owners.name AS owner_name,
            treatments.treatment_id,
            treatments.treatment_name,
            treatments.description,
            treatments.treatment_date,
            treatments.cost
        FROM pets
        JOIN owners
            ON pets.owner_id = owners.owner_id
        LEFT JOIN treatments
            ON pets.pet_id = treatments.pet_id
        WHERE pets.pet_id = ?
        ORDER BY treatments.treatment_date DESC
    `;

    db.query(sql, [petId], callback);
};

module.exports = {
    getPetMedicalHistory
};