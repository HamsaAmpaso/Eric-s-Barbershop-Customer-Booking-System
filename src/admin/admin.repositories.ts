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