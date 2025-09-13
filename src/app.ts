import express, { Request, Response } from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/connectDB.js';
// import { seedHotels } from './helper/addData.js';
import hotelRoutes from "./routes/hotel.routes.js";
import Auth from './routes/Authroutes.js';
import  Booking  from './routes/booking.routes.js';
import Message from './routes/messag.routes.js';
dotenv.config();


const app = express();

// webhook route should be before bodyParser middleware
app.use("/api/Booking/stripe", Booking);




app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
<<<<<<< HEAD
    origin: ["http://localhost:5173", "https://booking-hotels-khaki.vercel.app", "https://booking-hotels-1z7k.vercel.app"],
=======
    origin: ["http://localhost:5173","https://booking-hotels-khaki.vercel.app","https://booking-hotels-1z7k.vercel.app"],
>>>>>>> e4f37101ca8b225f2f295bf50ad7a6733b11f0f0
    optionsSuccessStatus: 200,
    credentials: true
};
app.use(cors(corsOptions));


connectDb();
// Routes
app.use("/api/hotels", hotelRoutes);
app.use("/api/Auth", Auth);
app.use("/api/Booking", Booking);
app.use("/api", Message);












app.get('/', (req: Request, res: Response) => {
    // seedHotels();   //  add this line to seed data hotels 
    res.json({ message: 'API is running...' });
    // res.send('API is running...');
});

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
