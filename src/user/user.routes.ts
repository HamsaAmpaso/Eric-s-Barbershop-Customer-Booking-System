import express from 'express';
import { bookAppointmentController } from './user.controllers.js';
import { authenticationMiddleware } from '../auth/authentication.Middleware.js';
import { asyncControllerHandler } from '../utils/async.handler.js';
import { validator } from '../auth/auth.validation.js';
import { appointmentSchema } from './user.validation.js';
import { authorize } from '../auth/authorization.middleware.js';
export const userRoutes = express.Router();
userRoutes.post('/appointments', authenticationMiddleware, authorize("user"), validator(appointmentSchema), asyncControllerHandler(bookAppointmentController) );

