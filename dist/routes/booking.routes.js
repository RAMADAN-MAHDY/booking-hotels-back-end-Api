import express, { Router } from "express";
import { createBooking, getBookings, getBookingById, deleteBooking, getBookingsSession, stripeWebhook } from "../controllers/booking.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = Router();
// Create booking
router.post("/", authMiddleware, createBooking);
// Get bookings session
router.get("/session/:sessionId", authMiddleware, getBookingsSession);
// Stripe webhook (no auth middleware here)
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);
// Get all bookings
router.get("/", getBookings);
// Get booking by ID
router.get("/:id", getBookingById);
// Delete booking
router.delete("/:id", deleteBooking);
export default router;
