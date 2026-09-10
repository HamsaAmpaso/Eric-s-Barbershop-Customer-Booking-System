import { getAllPendingAppointmentsAdminRepository } from "./admin.repositories.js";
import { markAsDoneAppointment } from "./admin.repositories.js";
import { insertUserADMINNotificationRepository } from "./admin.repositories.js";
import { getAppointmentTime } from "./admin.repositories.js";
import { cancelAppointmentAdminRepository } from "./admin.repositories.js";
import { getAllCompletedTasksADMINSIDERepository } from "./admin.repositories.js";
import { viewCancelledAppointmentsRepository } from "./admin.repositories.js";
import { viewAdminNotificationsRepository } from "./admin.repositories.js";
import { addWalkinAppointmentRepository } from "./admin.repositories.js";
import { io } from "../server.js";
export async function getAllPendingAppointmentsAdminService(){
    try{
        const data = await getAllPendingAppointmentsAdminRepository();
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function markAsDoneApointmentService(appointment_id: string, userId: string){
    try{
        await markAsDoneAppointment(appointment_id);
        const time = await getAppointmentTime(appointment_id);
        const message = `You're appointment at ${new Date(time).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        })} has been completed, thank you for choosing Eric's!`;
        await insertUserADMINNotificationRepository(userId, 'appointment-done', message);
        io.to(`user:${userId}`).emit("notification", {
           type: "appointment_approved",
           message: message
        });

    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function cancelAppointmentService(appointment_id: string, userId: string){
   try{
     await cancelAppointmentAdminRepository(appointment_id);
     const time = await getAppointmentTime(appointment_id);
     const message = `You're appointment at ${new Date(time).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        })} has been cancelled, because we coudn't entertain you at the given schedule!`;
     await insertUserADMINNotificationRepository(userId, 'appointment-cancelled', message);
     io.to(`user:${userId}`).emit("notification", {
           type: "appointment_cancelled",
           message: message
     });

   }catch(err){
     console.log(err);
     throw err;
   }
}
export async function getAllCompletedAppointmentsADMINSIDEService(){
    try{
        const appointments = await getAllCompletedTasksADMINSIDERepository();
        return appointments;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function viewCancelledAppointmentsService(){
    try{
        const appointments = await viewCancelledAppointmentsRepository();
        return appointments;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function viewAdminNotificationsService(){
    try{
        const notifications = await viewAdminNotificationsRepository();
        return notifications;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function addWalkinService(day_time: string){
    try{
        await addWalkinAppointmentRepository(day_time);
    }catch(err){
        console.log(err);
        throw err;
    }
}