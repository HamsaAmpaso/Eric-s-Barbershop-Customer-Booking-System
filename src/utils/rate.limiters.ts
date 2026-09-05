import rateLimit from "express-rate-limit";
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    handler: (req, res) =>{
        res.status(429).json({
            success: false,
            attempts: true,
            message: "Too many login attempts. Try again later."
        });
    }
});