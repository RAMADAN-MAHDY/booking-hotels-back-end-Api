import { Schema, model, Document } from "mongoose";

export interface ICurrency extends Document {
  code: string;
  symbol: string;
  rateToUSD: number;
}

const currencySchema = new Schema<ICurrency>({
  code: { type: String, required: true, unique: true },
  symbol: { type: String, required: true },
  rateToUSD: { type: Number, required: true }
}, { timestamps: true });

export const Currency = model<ICurrency>("Currency", currencySchema);
