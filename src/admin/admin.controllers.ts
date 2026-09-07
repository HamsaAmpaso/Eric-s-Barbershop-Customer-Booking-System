import type { Request, Response, NextFunction } from "express";
import { getAllPendingAppointmentsAdminService } from "./admin.services.js";
import { markAsDoneApointmentService } from "./admin.services.js";
import { cancelAppointmentService } from "./admin.services.js";
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