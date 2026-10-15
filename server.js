const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const db = require('./config/db');
const petRoutes = require('./routes/petRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const treatmentRoutes = require('./routes/treatmentRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes = require('./routes/userRoutes');
const medicalReportRoutes = require('./routes/medicalReportRoutes');
const vaccinationRoutes = require('./routes/vaccinationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
    session({
        secret: 'pet-care-veterinary-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60
        }
    })
);
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api/pets', petRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/treatments', treatmentRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', medicalReportRoutes);
app.use('/api/vaccinations', vaccinationRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/api/dashboard', (req, res) => {

    const queries = [
        'SELECT COUNT(*) AS totalOwners FROM owners',
        'SELECT COUNT(*) AS totalPets FROM pets',
        'SELECT COUNT(*) AS totalTreatments FROM treatments',
        'SELECT COUNT(*) AS totalAppointments FROM appointments',
        'SELECT COUNT(*) AS totalVaccinations FROM vaccinations',
        'SELECT COUNT(*) AS totalPayments FROM payments'
    ];

    const keys = [
        'totalOwners',
        'totalPets',
        'totalTreatments',
        'totalAppointments',
        'totalVaccinations',
        'totalPayments'
    ];

    const dashboardData = {};
    let completed = 0;

    queries.forEach(function (sql, index) {

        db.query(sql, (err, rows) => {

            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Failed to load dashboard data'
                });
            }

            dashboardData[keys[index]] = rows[0][keys[index]];
            completed++;

            if (completed === queries.length) {
                res.json(dashboardData);
            }

        });

    });

});

app.get('/', (req, res) => {
    res.send('Pet Care Veterinary API is running!');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});