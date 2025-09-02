import { Schema, model, Document } from "mongoose";

export interface ILanguage extends Document {
  code: string;
  name: string;
}

const languageSchema = new Schema<ILanguage>({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true }
}, { timestamps: true });

export const Language = model<ILanguage>("Language", languageSchema);
