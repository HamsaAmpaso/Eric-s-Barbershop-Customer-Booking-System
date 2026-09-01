import { Router } from "express";
import passport from "passport";
import dotenv from 'dotenv';
dotenv.config();
import type { Request, Response, NextFunction } from "express";
import { signupService } from "./auth.services.js";
import { confirmingAccountPasswordController } from "./auth.controllers.js";
import { asyncControllerHandler } from "../utils/async.handler.js";
import { validator } from "./auth.validation.js";
import { userSchema } from "./auth.validation.js";
import { cancelAccountConfirmationController } from "./auth.controllers.js";


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


export const authRouter = Router();



authRouter.get(
  "/signup/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/signup/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/signup",
  }),
  async (req, res, next) => {
    try{
    if (!req.user) {
        return res.status(401).json({
          message: "Google authentication failed."
        });
    }

    const email = req.user.emails?.[0]?.value;

    if (!email) {
        return res.status(400).json({
          message: "Google account did not provide an email."
        });
    }
    

    const googleID = req.user.id;
    const signup = await signupService(email, googleID); 
    

    if (signup.userAlreadyExists) {
      return res.status(409).json({
        message: "An account with this email already exists.",
        signup
      });
    }
   
    
    res.cookie("username", email, getCookieOptions(req));

    
    
    return res.send(`
                <script>
                    window.opener.postMessage(
                        "google-signup-success",
                        "${FRONTEND_URL}"
                    );

                    window.close();
                </script>
            `);
    }catch(err){
      console.log(err);
      next(err)
    }
  }
);

authRouter.post('/password', validator(userSchema), asyncControllerHandler(confirmingAccountPasswordController));
authRouter.post('/users', asyncControllerHandler(cancelAccountConfirmationController));

