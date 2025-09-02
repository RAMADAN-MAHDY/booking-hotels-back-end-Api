import { Schema, model } from "mongoose";
const paymentSchema = new Schema({
    booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    method: { type: String, enum: ["cash", "card"], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" }
}, { timestamps: true });
export const Payment = model("Payment", paymentSchema);
