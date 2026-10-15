const db = require('../config/db');

// Get all payments
const getAllPayments = (callback) => {
    const sql = `
        SELECT
            payments.payment_id,
            payments.owner_id,
            owners.name AS owner_name,
            payments.amount,
            payments.payment_method,
            payments.status AS payment_status,
            payments.payment_date,
            payments.description
        FROM payments
        JOIN owners ON payments.owner_id = owners.owner_id
        ORDER BY payments.payment_id DESC
    `;

    db.query(sql, callback);
};

// Get payment by ID
const getPaymentById = (id, callback) => {
    const sql = `
        SELECT
            payment_id,
            owner_id,
            amount,
            payment_method,
            status AS payment_status,
            payment_date,
            description
        FROM payments
        WHERE payment_id = ?
    `;

    db.query(sql, [id], callback);
};

// Create payment
const createPayment = (payment, callback) => {
    const sql = `
        INSERT INTO payments
        (owner_id, amount, payment_method, status,
         payment_date, description)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        payment.owner_id,
        payment.amount,
        payment.payment_method,
        payment.payment_status,
        payment.payment_date,
        payment.description || null
    ];

    db.query(sql, values, callback);
};

// Update payment
const updatePayment = (id, payment, callback) => {
    const sql = `
        UPDATE payments
        SET owner_id = ?,
            amount = ?,
            payment_method = ?,
            status = ?,
            payment_date = ?,
            description = ?
        WHERE payment_id = ?
    `;

    const values = [
        payment.owner_id,
        payment.amount,
        payment.payment_method,
        payment.payment_status,
        payment.payment_date,
        payment.description || null,
        id
    ];

    db.query(sql, values, callback);
};

// Delete payment
const deletePayment = (id, callback) => {
    const sql = `
        DELETE FROM payments
        WHERE payment_id = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
};