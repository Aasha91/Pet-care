const express = require('express');

const router = express.Router();

const medicalReportController =
    require('../reports/medicalReportController');

const requireLogin =
    require('../middleware/authMiddleware');

// Protected medical history report
router.get(
    '/pet/:petId',
    requireLogin,
    medicalReportController.getPetMedicalHistory
);

module.exports = router;