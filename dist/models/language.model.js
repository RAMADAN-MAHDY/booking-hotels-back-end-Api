import { Schema, model } from "mongoose";
const languageSchema = new Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true }
}, { timestamps: true });
export const Language = model("Language", languageSchema);
