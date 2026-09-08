import { poolDB } from "../db/db.js";
export async function bookAppointmentRepository(scheduled_by: string, day_time: string, note: string ){
    try{
        await poolDB.query(`INSERT INTO appointments (scheduled_by, day_time, note) VALUES ($1, $2, $3)`, [scheduled_by, day_time, note]);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function insertNotificationRepository(triggered_by:string, message: string ){
    try{
       await poolDB.query(`INSERT INTO notifications (triggered_by, message) VALUES ($1, $2)`, [triggered_by, message]);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function viewAllUserPendingAppointments(userId: string){
    try{
        const appointments = await poolDB.query(`SELECT appointments.*, users.username FROM appointments JOIN users ON appointments.scheduled_by = users.user_id WHERE scheduled_by = $1 AND status = 'pending'`, [userId]);
        return appointments.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function cancelAppointmentByUserRepository(appointment_id: string, userId: string){
    try{
        await poolDB.query(`UPDATE appointments SET status = 'cancelled' WHERE appointment_id = $1 AND scheduled_by = $2`, [appointment_id, userId]);
    }catch(err){
        console.log(err);
        throw err;
    }
}