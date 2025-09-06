import { Request, Response } from "express";
import { Booking } from "../models/booking.model.js";
import { User } from "../models/user.model.js";
import {verifyToken} from "../utils/jwt.js";

// ✅ Create Booking
export const createBooking = async (req: Request, res: Response) => {
    try {
      const {
        hotelId,
        rooms,
        guests,
        nights,
        checkIn,
        checkOut,
        paymentMethod,
        totalPrice,
      } = req.body;

  
    const userEmail = verifyToken(req.cookies.accessToken).decoded.email;
    const userId = verifyToken(req.cookies.accessToken).decoded.id;
      // 👇 ناخد الـ userEmai
      let user = userEmail;
    //   console.log(user);
      if(!user) {
        user = "guest"
      }
  
      const booking = await Booking.create({
        hotel: hotelId,
        user: userId || undefined,
        guestEmail: user ,
        checkIn,
        checkOut,
        rooms,
        guests,
        nights,
        paymentMethod,
        totalPrice,
      });
  
      res.status(201).json({
        message: "Booking created successfully",
        booking,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error creating booking",
        error: error.message,
      });
    }
  };


  
// ✅ Get All Bookings
export const getBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await Booking.find()
      .populate("hotel", "name city price")
      .populate("user", "email");

    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

// ✅ Get Single Booking
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;


    const booking = await Booking.findById(id)
      .populate("hotel", "name city price")
      .populate("user", "email");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json(booking);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching booking", error: error.message });
  }
};

// ✅ Delete Booking
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting booking", error: error.message });
  }
};
