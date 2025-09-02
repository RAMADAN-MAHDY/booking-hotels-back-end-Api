import { Router } from "express";
import { getHotels, getHotelById } from "../controllers/hotel.controller.js";
const router = Router();
// GET all hotels
router.get("/", getHotels);
// GET single hotel by ID
router.get("/:id", getHotelById);
export default router;
