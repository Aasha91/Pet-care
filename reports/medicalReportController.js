const medicalReportModel = require('./medicalReportModel');

// Get medical history report
const getPetMedicalHistory = (req, res) => {

    const petId = req.params.petId;

    if (!petId || isNaN(petId)) {
        return res.status(400).json({
            message: 'Invalid pet ID'
        });
    }

    medicalReportModel.getPetMedicalHistory(
        petId,
        (err, results) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: 'Failed to generate medical history report'
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: 'Pet medical history not found'
                });
            }

            res.json({
                message: 'Medical history report generated successfully',
                report: results
            });
        }
    );
};

module.exports = {
    getPetMedicalHistory
};