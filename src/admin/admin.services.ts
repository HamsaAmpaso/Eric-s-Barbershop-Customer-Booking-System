import { getAllPendingAppointmentsAdminRepository } from "./admin.repositories.js";
export async function getAllPendingAppointmentsAdminService(){
    try{
        const data = await getAllPendingAppointmentsAdminRepository();
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}