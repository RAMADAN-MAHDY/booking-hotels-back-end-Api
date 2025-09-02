import { Schema, model, Document, Types } from "mongoose";

export interface IReview extends Document {
  hotel: Types.ObjectId;
  user: Types.ObjectId;
  rating: number;
  comment: string;
}

const reviewSchema = new Schema<IReview>({
  hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String }
}, { timestamps: true });

export const Review = model<IReview>("Review", reviewSchema);
