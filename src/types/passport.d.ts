import type { Profile } from "passport-google-oauth20";

declare global {
    namespace Express {
        interface User extends Profile {}
    }
}

export {};