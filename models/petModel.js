const db = require('../config/db');

const getAllPets = (callback) => {
    const sql = `
        SELECT 
            pets.pet_id,
            pets.pet_name,
            pets.species,
            pets.breed,
            pets.age,
            pets.gender,
            owners.name AS owner_name
        FROM pets
        JOIN owners ON pets.owner_id = owners.owner_id
    `;

    db.query(sql, callback);
};

const getPetById = (petId, callback) => {
    const sql = 'SELECT * FROM pets WHERE pet_id = ?';

    db.query(sql, [petId], callback);
};

const createPet = (pet, callback) => {
    const sql = `
        INSERT INTO pets
        (owner_id, pet_name, species, breed, age, gender)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        pet.owner_id,
        pet.pet_name,
        pet.species,
        pet.breed,
        pet.age,
        pet.gender
    ];

    db.query(sql, values, callback);
};

const updatePet = (petId, pet, callback) => {
    const sql = `
        UPDATE pets
        SET owner_id = ?,
            pet_name = ?,
            species = ?,
            breed = ?,
            age = ?,
            gender = ?
        WHERE pet_id = ?
    `;

    const values = [
        pet.owner_id,
        pet.pet_name,
        pet.species,
        pet.breed,
        pet.age,
        pet.gender,
        petId
    ];

    db.query(sql, values, callback);
};

const deletePet = (petId, callback) => {
    const sql = 'DELETE FROM pets WHERE pet_id = ?';

    db.query(sql, [petId], callback);
};

module.exports = {
    getAllPets,
    getPetById,
    createPet,
    updatePet,
    deletePet
};