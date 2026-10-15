const db = require('../config/db');

// Find user by username
const findUserByUsername = (username, callback) => {

    const sql = `
        SELECT *
        FROM users
        WHERE username = ?
    `;

    db.query(sql, [username], callback);
};


// Create new user
const createUser = (username, hashedPassword, callback) => {

    const sql = `
        INSERT INTO users (username, password)
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [username, hashedPassword],
        callback
    );
};


module.exports = {
    findUserByUsername,
    createUser
};