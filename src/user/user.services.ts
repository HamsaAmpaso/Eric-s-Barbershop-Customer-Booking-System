import { bookAppointmentRepository } from "./user.repositories.js";
import { io } from "../server.js";
import { insertNotificationRepository } from "./user.repositories.js";
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
        await insertNotificationRepository(scheduled_by,     `${username} booked a new appointment at ${new Date(day_time).toLocaleString("en-US", {
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