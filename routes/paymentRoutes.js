const express = require('express');
const router = express.Router();

const paymentController =
    require('../controllers/paymentController');

const requireLogin =
    require('../middleware/authMiddleware');

router.get('/', requireLogin, paymentController.getAllPayments);
router.get('/:id', requireLogin, paymentController.getPaymentById);
router.post('/', requireLogin, paymentController.createPayment);
router.put('/:id', requireLogin, paymentController.updatePayment);
router.delete('/:id', requireLogin, paymentController.deletePayment);

module.exports = router;