import { Router } from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  deleteBooking,
} from "../controllers/booking.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Create booking
router.post("/", authMiddleware,createBooking);

// Get all bookings
router.get("/", getBookings);

// Get booking by ID
router.get("/:id", getBookingById);

// Delete booking
router.delete("/:id", deleteBooking);

export default router;
