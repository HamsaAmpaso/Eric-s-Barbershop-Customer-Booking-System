import type { Request, Response, NextFunction } from "express";
import { bookAppointmentService } from "./user.services.js";
import { viewUserPendingAppointmentsService } from "./user.services.js";
import { cancelAppointmentByUserService } from "./user.services.js";
import { viewAllCompletedAppointmentsUserService } from "./user.services.js";
import { viewNotificationsUserService } from "./user.services.js";
export async function bookAppointmentController(req: Request, res: Response, next: NextFunction){
    try{
        const scheduled_by = req.auth?.id!;
        const day_time = req.body.day_time;
        const note = req.body.note;
        const username = req.auth?.user!;
        const book = await bookAppointmentService(scheduled_by, day_time, note, username);
        res.status(200).json(book);
    }catch(err){
        next(err);
    }
}
export async function viewUserAppointmentsController(req: Request, res: Response, next: NextFunction){
    try{
        const userID = req.auth?.id!;
        const apps = await viewUserPendingAppointmentsService(userID);
        res.status(200).json({
            success: true,
            datas: apps
        });
    }catch(err){
        next(err);
    }
}
export async function cancelAppointmentByUserController(req: Request, res: Response, next: NextFunction){
    try{
        const appointment_id = req.body.appointment_id;
        const userId = req.auth?.id!;
        const username = req.auth?.user!;
        const day_time = req.body.day_time;
        await cancelAppointmentByUserService(appointment_id, userId, username, day_time);
        res.status(200).json({
           success: true,
           userCancel: true
        });
    }catch(err){
        next(err)
    }
}
export async function viewAllCompletedAppointmetsUserController(req: Request, res: Response, next: NextFunction){
    try{
        const userId = req.auth?.id!;
        const appointments = await viewAllCompletedAppointmentsUserService(userId);
        res.status(200).json({
            success: true,
            datas: appointments
        });
    }catch(err){
        next(err);
    }
}
export async function viewNotificationsUserController(req: Request, res: Response, next: NextFunction){
    try{
        const userId = req.auth?.id!;
        const notifications = await viewNotificationsUserService(userId);
        res.status(200).json({
            success: true,
            datas: notifications
        }); 
    }catch(err){
        next(err);
    }
}