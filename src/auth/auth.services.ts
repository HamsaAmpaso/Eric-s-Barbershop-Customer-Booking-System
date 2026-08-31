import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import { checkIfUserExists } from "./auth.repositories.js";
import { signupRepository } from './auth.repositories.js';
import { insertRefreshToken } from './auth.repositories.js';
type SignupResult = {
    signup: boolean;
    success: boolean;
    userAlreadyExists: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    validationError: boolean;
    role: string;
};
 export async function signupService(username: string, googleID: string): Promise<SignupResult>{
    try{
        const users = await checkIfUserExists(username);
        if(users.length > 0){
           return {
            signup: false,
            success: false,
            userAlreadyExists: true,
            accessToken: null,
            refreshToken: null,
            validationError: false,
            role: 'none'
           }
        }

        
        const user = await signupRepository(username, googleID);
        const payload = {
            userID: user.user_id,
            role: user.role,
            iss: "Eric's Barbershop"
        }
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_JWT_SECRET!, {
        expiresIn: '30d'
        });
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_JWT_SECRET!, {
        expiresIn: "15m"
        });
        await insertRefreshToken(hashedRefreshToken, username);
        return {
            signup: true,
            success: true,
            userAlreadyExists: false,
            accessToken: accessToken,
            refreshToken: refreshToken,
            validationError: false,
            role: user.role
        };

    }catch(err){
        console.log(err);
        throw err;
    }
}