import type { Request, Response, NextFunction } from "express";
import { bookAppointmentService } from "./user.services.js";
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