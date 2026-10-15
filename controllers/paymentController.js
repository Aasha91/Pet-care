const paymentModel = require('../models/paymentModel');

// Get all payments
const getAllPayments = (req, res) => {
    paymentModel.getAllPayments((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Failed to load payments'
            });
        }

        res.json(results);
    });
};

// Get one payment
const getPaymentById = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: 'Invalid payment ID'
        });
    }

    paymentModel.getPaymentById(id, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Failed to load payment'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Payment not found'
            });
        }

        res.json(results[0]);
    });
};

// Create payment
const createPayment = (req, res) => {
    const {
        owner_id,
        amount,
        payment_method,
        payment_status,
        payment_date,
        description
    } = req.body;

    if (
        !Number.isInteger(Number(owner_id)) ||
        Number(owner_id) <= 0 ||
        amount === '' ||
        amount === null ||
        amount === undefined ||
        !Number.isFinite(Number(amount)) ||
        Number(amount) <= 0 ||
        !['Cash', 'Card', 'Bank Transfer'].includes(payment_method) ||
        !['Pending', 'Paid', 'Failed'].includes(payment_status) ||
        !payment_date
    ) {
        return res.status(400).json({
            message: 'Please provide valid payment details'
        });
    }

    const payment = {
        owner_id: Number(owner_id),
        amount: Number(amount),
        payment_method,
        payment_status,
        payment_date,
        description: description ? String(description).trim() : null
    };

    paymentModel.createPayment(payment, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Failed to create payment'
            });
        }

        res.status(201).json({
            message: 'Payment record created successfully',
            payment_id: result.insertId
        });
    });
};

// Update payment
const updatePayment = (req, res) => {
    const id = Number(req.params.id);

    const {
        owner_id,
        amount,
        payment_method,
        payment_status,
        payment_date,
        description
    } = req.body;

    if (
        !Number.isInteger(id) || id <= 0 ||
        !Number.isInteger(Number(owner_id)) || Number(owner_id) <= 0 ||
        amount === '' || amount === null || amount === undefined ||
        !Number.isFinite(Number(amount)) || Number(amount) <= 0 ||
        !['Cash', 'Card', 'Bank Transfer'].includes(payment_method) ||
        !['Pending', 'Paid', 'Failed'].includes(payment_status) ||
        !payment_date
    ) {
        return res.status(400).json({
            message: 'Please provide valid payment details'
        });
    }

    const payment = {
        owner_id: Number(owner_id),
        amount: Number(amount),
        payment_method,
        payment_status,
        payment_date,
        description: description ? String(description).trim() : null
    };

    paymentModel.updatePayment(id, payment, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Failed to update payment'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Payment not found'
            });
        }

        res.json({
            message: 'Payment updated successfully'
        });
    });
};

// Delete payment
const deletePayment = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: 'Invalid payment ID'
        });
    }

    paymentModel.deletePayment(id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Failed to delete payment'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Payment not found'
            });
        }

        res.json({
            message: 'Payment record deleted successfully'
        });
    });
};

module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
};