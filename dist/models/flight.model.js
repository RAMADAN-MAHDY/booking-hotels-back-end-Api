import { Schema, model } from "mongoose";
const flightSchema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    price: { type: Number, required: true },
    airline: { type: String, required: true },
    departure: { type: Date, required: true },
    arrival: { type: Date, required: true }
}, { timestamps: true });
export const Flight = model("Flight", flightSchema);
