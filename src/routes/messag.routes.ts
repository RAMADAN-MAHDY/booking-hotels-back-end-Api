import { Router } from "express";
import { createMessage  ,getMessages } from "../controllers/message.controller.js";

const router = Router();

// POST /contact
router.post("/contact", createMessage);
router.get("/getcontact", getMessages);


export default router;
