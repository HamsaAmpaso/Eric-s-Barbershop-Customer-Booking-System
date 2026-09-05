import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { poolDB } from './db/db.js';
import cookieParser from 'cookie-parser';
import passport from "passport";
import "./config/passport.js";
import { authRouter } from './auth/auth.routes.js';
import { centralizedErrorMiddleware } from './utils/cenralized.error.middleware.js';
import { userRoutes } from './user/user.routes.js';
import { createServer } from "http";
import { Server } from "socket.io";
import { adminRoutes } from './admin/admin.routes.js';



const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
    cors: {
        origin: [
            "http://127.0.0.1:5500",
            "http://localhost:5500",
            "http://127.0.0.1:5173",
            "http://localhost:5173"
        ],
        credentials: true
    }
});

app.set("trust proxy", 1);
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());

const allowedOrigins = [
  'http://127.0.0.1:5500', // <-- THIS WAS MISSING
  'http://localhost:5500',
  'http://127.0.0.1:3000',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://localhost:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: Origin not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/auth', authRouter);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use(centralizedErrorMiddleware);


io.on("connection", (socket) => {

    console.log("A client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });

});



const PORT = process.env.PORT || 3000;

async function startServer() {

    try {

        await poolDB.connect();

        httpServer.listen(PORT, () => {
            console.log("Eric's Barbershop server is running.");
        });

    } catch (err) {

        console.log(err);
        process.exit(1);

    }

}

startServer();