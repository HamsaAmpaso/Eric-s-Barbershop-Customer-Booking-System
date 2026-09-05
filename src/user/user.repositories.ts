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