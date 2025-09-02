import { Schema, model, Document, Types } from "mongoose";

export interface IPayment extends Document {
  booking: Types.ObjectId;
  method: "cash" | "card";
  amount: number;
  status: "pending" | "paid" | "failed";
}

const paymentSchema = new Schema<IPayment>({
  booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
  method: { type: String, enum: ["cash", "card"], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" }
}, { timestamps: true });

export const Payment = model<IPayment>("Payment", paymentSchema);
