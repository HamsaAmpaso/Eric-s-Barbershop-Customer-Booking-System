import { getAllPendingAppointmentsAdminRepository } from "./admin.repositories.js";
import { markAsDoneAppointment } from "./admin.repositories.js";
export async function getAllPendingAppointmentsAdminService(){
    try{
        const data = await getAllPendingAppointmentsAdminRepository();
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function markAsDoneApointmentService(appointment_id: string){
    try{
        await markAsDoneAppointment(appointment_id);
    }catch(err){
        console.log(err);
        throw err;
    }
}