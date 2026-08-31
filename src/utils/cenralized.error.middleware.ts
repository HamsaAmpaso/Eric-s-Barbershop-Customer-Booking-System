import type { Request, Response, NextFunction, Errback } from "express";
export function centralizedErrorMiddleware(err: Error, req: Request, res: Response, next:NextFunction){
    return res.status(500).json({
        success: false,
        message: "Error from centralizzed error middleware!",
  
    });
}