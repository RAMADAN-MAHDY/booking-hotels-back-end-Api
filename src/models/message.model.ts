import { Schema, model, Document, Types } from "mongoose";

export interface IMessage extends Document {
  user?: Types.ObjectId;
  name: string;
  email: string;
  subject : string;
  message: string;
}

const messageSchema = new Schema<IMessage>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject : {type : String , required : true},
  message: { type: String, required: true }
}, { timestamps: true });

export const Message = model<IMessage>("Message", messageSchema);
