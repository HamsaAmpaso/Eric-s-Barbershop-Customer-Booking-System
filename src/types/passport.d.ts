import type { Profile } from "passport-google-oauth20";

export type JwtUser = {
    user: string;
    role: string;
    iss: string;
    id: string;
};

declare global {
    namespace Express {
        interface User extends Profile {}

        interface Request {
            auth?: JwtUser;
        }
    }
}

export {};
