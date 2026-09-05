import type { Request, Response, NextFunction } from "express";
import { getAllPendingAppointmentsAdminService } from "./admin.services.js";
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