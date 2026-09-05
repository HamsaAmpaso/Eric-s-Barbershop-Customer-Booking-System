import {  z } from 'zod';
export const appointmentSchema = z.object({
    day_time: z.string(),
    note: z.string()
});