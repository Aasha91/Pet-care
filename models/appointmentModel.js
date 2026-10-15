const db = require('../config/db');

// Get all appointments
const getAllAppointments = (callback) => {

    const sql = `
        SELECT
            appointments.appointment_id,
            appointments.pet_id,
            pets.pet_name,
            appointments.appointment_date,
            appointments.appointment_time,
            appointments.reason,
            appointments.status
        FROM appointments
        JOIN pets ON appointments.pet_id = pets.pet_id
        ORDER BY appointments.appointment_date ASC,
                 appointments.appointment_time ASC
    `;

    db.query(sql, callback);
};


// Get one appointment
const getAppointmentById = (appointmentId, callback) => {

    const sql = `
        SELECT *
        FROM appointments
        WHERE appointment_id = ?
    `;

    db.query(sql, [appointmentId], callback);
};


// Create appointment
const createAppointment = (appointment, callback) => {

    const sql = `
        INSERT INTO appointments
        (pet_id, appointment_date, appointment_time, reason, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        appointment.pet_id,
        appointment.appointment_date,
        appointment.appointment_time,
        appointment.reason,
        appointment.status
    ];

    db.query(sql, values, callback);
};


// Update appointment
const updateAppointment = (appointmentId, appointment, callback) => {

    const sql = `
        UPDATE appointments
        SET pet_id = ?,
            appointment_date = ?,
            appointment_time = ?,
            reason = ?,
            status = ?
        WHERE appointment_id = ?
    `;

    const values = [
        appointment.pet_id,
        appointment.appointment_date,
        appointment.appointment_time,
        appointment.reason,
        appointment.status,
        appointmentId
    ];

    db.query(sql, values, callback);
};


// Delete appointment
const deleteAppointment = (appointmentId, callback) => {

    const sql = `
        DELETE FROM appointments
        WHERE appointment_id = ?
    `;

    db.query(sql, [appointmentId], callback);
};


module.exports = {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment
};