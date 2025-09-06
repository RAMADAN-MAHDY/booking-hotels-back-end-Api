import { Schema, model } from "mongoose";
const bookingSchema = new Schema({
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    guestEmail: { type: String }, // fallback لو مش لاقي userId
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    rooms: { type: Number, required: true },
    guests: { type: Number, required: true },
    nights: { type: Number },
    paymentMethod: { type: String, enum: ["cash", "card"], default: "cash" },
    totalPrice: { type: Number, required: true },
}, { timestamps: true });
export const Booking = model("Booking", bookingSchema);
