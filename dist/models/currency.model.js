import { Schema, model } from "mongoose";
const currencySchema = new Schema({
    code: { type: String, required: true, unique: true },
    symbol: { type: String, required: true },
    rateToUSD: { type: Number, required: true }
}, { timestamps: true });
export const Currency = model("Currency", currencySchema);
