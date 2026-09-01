import type { Request, Response, NextFunction } from "express";
import { accountConfirmationService } from "./auth.services.js";
import { cancelAccountConfirmationService } from "./auth.services.js";
const FRONTEND_URL =
    process.env.FRONTEND_URL || "http://127.0.0.1:5500";


const getCookieOptions = (req: Request) => {
    const isHTTPS = req.secure;

    return {
        httpOnly: true,
        secure: isHTTPS,
        sameSite: isHTTPS ? "none" as const : "lax" as const,
        maxAge: 7 * 24 * 60 * 60 * 1000
    };
};
export async function confirmingAccountPasswordController(req: Request, res: Response, next: NextFunction){
    try{
        const username = req.cookies.username;
        const password = req.body.password;
        const signup = await accountConfirmationService(username, password);
        res.cookie("accessToken", signup.accessToken, getCookieOptions(req));
        res.cookie("refreshToken", signup.refreshToken, getCookieOptions(req));
        res.status(200).json({
            success: true,
            signup: true,
            role: signup.role
        });
    }catch(err){
        next(err);
    }
}
export async function cancelAccountConfirmationController(req: Request, res: Response, next: NextFunction){
    try{
         const username = req.cookies.username;
         await cancelAccountConfirmationService(username);
         res.clearCookie("username", getCookieOptions(req));
         res.status(200).json({
              success: true,
              cancellation: true
         });
    }catch(err){
        next(err);
    }
}
