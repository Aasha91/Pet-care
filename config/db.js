const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kavin@91',
    database: 'pet_care_veterinary'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }

    console.log('MySQL Database Connected Successfully!');
});

module.exports = db;