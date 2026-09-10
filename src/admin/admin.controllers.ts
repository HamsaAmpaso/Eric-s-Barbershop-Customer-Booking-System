import type { Request, Response, NextFunction } from "express";
import { getAllPendingAppointmentsAdminService } from "./admin.services.js";
import { markAsDoneApointmentService } from "./admin.services.js";
import { cancelAppointmentService } from "./admin.services.js";
import { getAllCompletedAppointmentsADMINSIDEService } from "./admin.services.js";
import { viewCancelledAppointmentsService } from "./admin.services.js";
import { viewAdminNotificationsService } from "./admin.services.js";
import { addWalkinService } from "./admin.services.js";
export async function getAllPendingAppointmentsAdminController(req: Request, res: Response, next: NextFunction){
    try{
        const data = await getAllPendingAppointmentsAdminService();
        res.status(200).json({
            success: true,
            datas: data
        });
    }catch(err){
        next(err);
    }
}
export async function markAsDoneAppointmentController(req: Request, res: Response, next: NextFunction){
    try{
        const appointment_id = req.body.appointment_id;
        const userId = req.body.scheduled_by;
        await markAsDoneApointmentService(appointment_id, userId);
        res.status(200).json({
            success: true,
            markAsDone: true
        });
    }catch(err){
        next(err);
    }
}
export async function cancelAppointmentADMINController(req: Request, res: Response, next: NextFunction){
    try{
        const appointment_id = req.body.appointment_id;
        const userId = req.body.scheduled_by;
        await cancelAppointmentService(appointment_id, userId);
        res.status(200).json({
            success: true,
            cancelled: true
        });
    }catch(err){
        next(err);
    }
}
export async function getALlCompletedAppointmentsController(req: Request, res: Response, next: NextFunction){
    try{
        const appointments = await getAllCompletedAppointmentsADMINSIDEService();
        res.status(200).json({
            success: true,
            datas: appointments
        });
    }catch(err){
        next(err);
    }
}
export async function viewCancelledAppointmentsController(req: Request, res: Response, next: NextFunction){
    try{
        const appointments = await viewCancelledAppointmentsService();
        res.status(200).json({
            success: true,
            datas: appointments
        });
    }catch(err){
        next(err);
    }
}
export async function viewAdminNotificationsController(req: Request, res: Response, next: NextFunction){
    try{
        const notifications = await viewAdminNotificationsService();
        res.status(200).json({
            success: true,
            datas: notifications
        });
    }catch(err){
        next(err);
    }
}
export async function addWalkinController(req: Request, res: Response, next: NextFunction ){
    try{
        const day_time = req.body.day_time;
        await addWalkinService(day_time);
        res.status(201).json({
            success: true,
            walkinAdded: true
        });
    }catch(err){
        next(err);
    }
}