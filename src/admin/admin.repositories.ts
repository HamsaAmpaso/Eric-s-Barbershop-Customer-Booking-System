import { poolDB } from "../db/db.js";
export async function getAllPendingAppointmentsAdminRepository(){
    try{
        const appointments = await poolDB.query(`SELECT appointments.* , users.username FROM appointments JOIN users ON appointments.scheduled_by = users.user_id WHERE appointments.status = 'pending'`);
        return appointments.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}