import mongoose, { Schema, model, models } from "mongoose";

export interface IQuotation {
  _id?: string;
  userId?: mongoose.Types.ObjectId; // Optional for guests
  name?: string;
  email?: string;
  productId?: mongoose.Types.ObjectId;
  message: string;
  status: "pending" | "reviewed" | "accepted";
  createdAt?: string;
  updatedAt?: string;
}

const QuotationSchema = new Schema<IQuotation>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String },
    email: { type: String },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Quotation = models.Quotation || model("Quotation", QuotationSchema);
export default Quotation;
