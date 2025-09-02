import { Schema, model } from "mongoose";
const reviewSchema = new Schema({
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String }
}, { timestamps: true });
export const Review = model("Review", reviewSchema);
