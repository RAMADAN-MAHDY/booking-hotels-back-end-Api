import { Schema, model, Document } from "mongoose";

export interface IFlight extends Document {
  from: string;
  to: string;
  price: number;
  airline: string;
  departure: Date;
  arrival: Date;
}

const flightSchema = new Schema<IFlight>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  price: { type: Number, required: true },
  airline: { type: String, required: true },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true }
}, { timestamps: true });

export const Flight = model<IFlight>("Flight", flightSchema);
