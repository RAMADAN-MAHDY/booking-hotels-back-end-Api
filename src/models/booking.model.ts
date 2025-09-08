import { Schema, model, Document, Types } from "mongoose";

export interface IBooking extends Document {
    _id: Types.ObjectId;
    hotel: Types.ObjectId;
    user?: Types.ObjectId;
    guestEmail?: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    guests: number;
    nights?: number;
    paymentMethod?: string;
    totalPrice: number;
    paymentStatus?: string;
    paymentIntentId?: string;
}

const bookingSchema = new Schema<IBooking>(
    {
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

        // إضافات جديدة:
        paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
        paymentIntentId: { type: String },
    },
    { timestamps: true }
);

export const Booking = model<IBooking>("Booking", bookingSchema);
