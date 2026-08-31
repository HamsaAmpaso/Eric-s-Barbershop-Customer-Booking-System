import {  z } from 'zod';
import type { Request, Response, NextFunction } from "express";
export const userSchema = z.object({
    
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/[a-z]/, "Password must contain a lowercase letter")
        .regex(/[0-9]/, "Password must contain a number")
});
export function validator(schema: z.ZodSchema){
   return (req: Request, res: Response, next: NextFunction)=>{
       const result = schema.safeParse(req.body);
       if(!result.success){
        return res.status(400).json({
            success: false,
            validationError: true
        });
       }
       next();
   };
}
