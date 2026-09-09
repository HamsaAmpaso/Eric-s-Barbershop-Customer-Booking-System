import { bookAppointmentRepository } from "./user.repositories.js";
import { io } from "../server.js";
import { insertNotificationRepository } from "./user.repositories.js";
import { viewAllUserPendingAppointments } from "./user.repositories.js";
import { cancelAppointmentByUserRepository } from "./user.repositories.js";
import { viewAllCompletedAppointmentsUserRepository } from "./user.repositories.js";
export async function bookAppointmentService(scheduled_by: string, day_time: string, note: string, username: string){
    try{
        await bookAppointmentRepository(scheduled_by, day_time, note);
        io.emit("new-appointment", {
            message:     `${username} booked a new appointment at ${new Date(day_time).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    })}`
        });
        await insertNotificationRepository(scheduled_by, `${username} booked a new appointment at ${new Date(day_time).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    })}`);
        return {
            success: true,
            booked: true
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function viewUserPendingAppointmentsService(userId: string){
    try{
        const appointments = await viewAllUserPendingAppointments(userId);
        return appointments;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function cancelAppointmentByUserService(appointment_id: string, userId: string, username: string, day_time: string){
    try{
        await cancelAppointmentByUserRepository(appointment_id, userId);
        io.emit("new-appointment", {
            message:     `Hey Eric's ${username} cancelled his appointment at ${new Date(day_time).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}`
        });
        await insertNotificationRepository(userId, `${username} cancelled his appointment at ${new Date(day_time).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        })}`);

    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function viewAllCompletedAppointmentsUserService(userId: string){
    try{
        const appointments = await viewAllCompletedAppointmentsUserRepository(userId);
        return appointments;
    }catch(err){
        console.log(err);
        throw err;
    }
}