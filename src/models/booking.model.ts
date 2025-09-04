import { Schema, model, Document, Types } from "mongoose";

export interface IBooking extends Document {
  hotel: Types.ObjectId;
  user?: Types.ObjectId;
  guestEmail?: string;
  checkIn: Date;
  checkOut: Date;
  rooms: number;
  guests: number;
  nights?: number;
  paymentMethod?: string;
  totalPrice: number;
}

const bookingSchema = new Schema<IBooking>(
  {
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    guestEmail: { type: String }, // fallback لو مش لاقي userId
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    rooms: { type: Number, required: true },
    guests: { type: Number, required: true },
    nights: { type: Number },
    paymentMethod: { type: String, enum: ["cash", "card"], default: "cash" },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Booking = model<IBooking>("Booking", bookingSchema);
