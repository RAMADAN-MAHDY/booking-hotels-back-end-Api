import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }
}, { timestamps: true });

export const User = model<IUser>("User", userSchema);
