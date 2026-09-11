import { poolDB } from "../db/db.js";
export async function getAllPendingAppointmentsAdminRepository(){
    try{
        const appointments = await poolDB.query(`SELECT appointments.* , users.username FROM appointments JOIN users ON appointments.scheduled_by = users.user_id WHERE appointments.status = 'pending' ORDER BY day_time ASC`);
        return appointments.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function markAsDoneAppointment(appointment_id: string){
    try{
        await poolDB.query(`UPDATE appointments SET status = 'completed' WHERE appointment_id = $1`, [appointment_id]);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function insertUserADMINNotificationRepository(owned_by: string, type: string, message: string){
    try{
        await poolDB.query(`INSERT INTO users_notifications (owned_by, type, message) VALUES ($1, $2, $3)`, [owned_by, type, message]);
      
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function getAppointmentTime(appointment_id: string){
    try{
        const appointmentTime = await poolDB.query(`SELECT day_time from appointments WHERE appointment_id = $1`, [appointment_id]);
        return appointmentTime.rows[0].day_time;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function cancelAppointmentAdminRepository(appointment_id: string){
    try{
        await poolDB.query(`UPDATE appointments SET status = 'cancelled' WHERE appointment_id = $1`, [appointment_id]);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function getAllCompletedTasksADMINSIDERepository(){
    try{
        const appointments = await poolDB.query(`SELECT appointments.*, users.username FROM appointments JOIN users ON appointments.scheduled_by = users.user_id WHERE status = 'completed' ORDER BY day_time ASC`);
        return appointments.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function viewCancelledAppointmentsRepository(){
    try{
        const appointments = await poolDB.query(`SELECT appointments.*, users.username FROM appointments JOIN users ON appointments.scheduled_by = users.user_id WHERE status = 'cancelled' ORDER BY day_time ASC`);
        return appointments.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function viewAdminNotificationsRepository(){
    try{
        const notifications = await poolDB.query(`SELECT notifications.*, users.username FROM notifications JOIN users ON notifications.triggered_by = users.user_id ORDER BY notifications.created_at DESC`);
        return notifications.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function addWalkinAppointmentRepository(day_time: string, status: string = 'completed', scheduled_by : string = 'd3299195-1106-4575-9373-5bd48be50fbd', type : string = 'walk-in-appointment'){
  try{
     await poolDB.query(`INSERT INTO appointments (day_time, status, scheduled_by, type) VALUES ($1, $2, $3, $4)`, [day_time, status, scheduled_by, type]);
  }catch(err){
    console.log(err);
    throw err;
  }
}
export async function getTodaysAppointmentsRepository(){
    try{
        const appointments = await poolDB.query(`SELECT COALESCE(COUNT(*), 0) AS "number" FROM appointments WHERE day_time >= CURRENT_DATE
        AND day_time < CURRENT_DATE + INTERVAL '1 day' AND status = 'pending'`);
        return appointments.rows[0].number;

    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function getTotalRevenueTodayRepository(){
    try{
        const total = await poolDB.query(`SELECT COALESCE(SUM(price), 0) AS "total" FROM appointments WHERE day_time >= CURRENT_DATE
        AND day_time < CURRENT_DATE + INTERVAL '1 day' AND status = 'completed'`);
        return total.rows[0].total;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function getCompletedAppointmentsTodayRepository(){
    try{
        const appointments = await poolDB.query(`SELECT COALESCE(COUNT(*), 0) AS "number" FROM appointments WHERE day_time >= CURRENT_DATE
        AND day_time < CURRENT_DATE + INTERVAL '1 day' AND status = 'completed'`);
        return appointments.rows[0].number;
    }catch(err){
        console.log(err);
        throw err;
    }
}

export async function cancelledAppointmentsToday(){
    try{
        const appointments = await poolDB.query(`SELECT COALESCE(COUNT(*), 0) AS "number" FROM appointments WHERE day_time >= CURRENT_DATE
        AND day_time < CURRENT_DATE + INTERVAL '1 day' AND status = 'cancelled'`);
        return appointments.rows[0].number;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function appointmentsPerDayRepository(){
    try{
        const appointments = await poolDB.query(`SELECT day_time::date AS "day", COUNT(*) AS "number" FROM appointments WHERE status = 'completed' GROUP BY day_time::date ORDER BY day_time::date DESC`);
        return appointments.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function walkinAndOnlineComparisonRepository(){
    try{
         const result = await poolDB.query(`
            SELECT
                COUNT(*) FILTER (WHERE type = 'walk-in-appointment') AS walkin,
                COUNT(*) FILTER (WHERE type = 'online-appointment') AS online
            FROM appointments
            WHERE status = 'completed'
        `);

        return result.rows[0];
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function totalIncomeRepository(){
    try{
        const total = await poolDB.query(`SELECT COALESCE(SUM(price), 0) AS "total" FROM appointments WHERE status = 'completed'`);
        return total.rows[0].total;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function allCancelledAppointments(){
    try{
        const cancelled = await poolDB.query(`SELECT COUNT(*) AS "total" FROM appointments WHERE status = 'cancelled'`);
        return cancelled.rows[0].total;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function allPendingAppointments(){
    try{
        const pending = await poolDB.query(`SELECT COUNT(*) AS "total" FROM appointments WHERE status = 'pending'`);
        return pending.rows[0].total;
    }catch(err){
        console.log(err);
        throw err;
    }
}
