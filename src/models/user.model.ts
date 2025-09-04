import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";


export interface IUser extends Document {
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
  }
  
  const UserSchema: Schema<IUser> = new Schema(
    {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    },
    { timestamps: true }
  );
  
  // hash password before save
  UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // compare password
  UserSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
  };


export const User = model<IUser>("User", UserSchema);
