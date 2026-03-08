import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  role: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
