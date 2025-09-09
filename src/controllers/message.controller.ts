import { Request, Response } from "express";
import { Message } from "../models/message.model.js";
import { verifyToken } from "../utils/jwt.js";

// @desc  Create new message
// @route POST /contact
// @access Public
export const createMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "جميع الحقول مطلوبة" });
    }

     const { decoded } = verifyToken(req.cookies.accessToken);
        const userId = decoded?.id ?? undefined;

    const newMessage = new Message({
      user: userId, // لو عندك اوث
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();

    return res.status(201).json({ message: "تم إرسال رسالتك بنجاح" });
  } catch (error) {
    console.error("Error creating message:", error);
    return res.status(500).json({ error: "حدث خطأ أثناء إرسال الرسالة" });
  }
};


// @desc  Get all messages
// @route GET /messages
// @access Private (Admin)
export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find()
      .populate("user", "email") // يجيب بيانات اليوزر لو فيه
      .sort({ createdAt: -1 }); // الأحدث الأول

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "حدث خطأ أثناء جلب الرسائل" });
  }
};