import type { Request, Response, NextFunction } from "express";
import { accountConfirmationService } from "./auth.services.js";
import { cancelAccountConfirmationService } from "./auth.services.js";
import { logoutService } from "./auth.services.js";
import { loginService } from "./auth.services.js";
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
export async function logoutController(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        if(!req.auth){
            res.status(401).json({
            success: false,
            logout: false
        });
        return;
        }
        const username = req.auth?.user!;
        await logoutService(username);
        res.clearCookie("username", getCookieOptions(req));
        res.clearCookie("accessToken", getCookieOptions(req));
        res.clearCookie("refreshToken", getCookieOptions(req));
        res.status(200).json({
            success: true,
            logout: true
        });


    }catch(err){
        next(err);
    }
}

export async function loginController(req: Request, res: Response, next: NextFunction){
    try{
        const username = req.body.username;
        const password = req.body.password;
        const loggingin = await loginService(username, password);
        if(!loggingin.login){
            res.status(400).json(loggingin);
            return;
        }
        res.cookie("accessToken", loggingin.accessToken, getCookieOptions(req));
        res.cookie("refreshToken", loggingin.refreshToken, getCookieOptions(req));

        const loggingin2 = {
            login: loggingin.login,
            success: loggingin.success,
            userDoesNotExists: loggingin.userDoesNotExists,
            wrongPassword: loggingin.wrongPassword,
            role: loggingin.role
        }
        res.status(200).json(loggingin2);

    }catch(err){
        next(err);
    }
}
