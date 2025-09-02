import { Schema, model, Document } from "mongoose";

export interface IHotel extends Document {
  name: string;
  city: string;
  price: number;
  rating: number;
  distance: number;
  images: string[];
  description: string;
  rooms: number;
  availableRooms: number;
  services: string[];
  cancellationPolicy: string;
  paymentPolicy: string;
  minimumAge: number;
}

const hotelSchema = new Schema<IHotel>({
  name: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  distance: { type: Number },
  images: [{ type: String }],
  description: { type: String },
  rooms: { type: Number, required: true },
  availableRooms: { type: Number, default: 0 },
  services: [{ type: String }],
  cancellationPolicy: { type: String },
  paymentPolicy: { type: String },
  minimumAge: { type: Number, default: 18 },
}, { timestamps: true });

export const Hotel = model<IHotel>("Hotel", hotelSchema);
