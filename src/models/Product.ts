import mongoose, { Schema, model, models } from "mongoose";

export interface ICustomField {
  label: string;
  value: string;
}

export interface IProduct {
  _id?: string;
  title: string;
  description: string;
  category: "product" | "corporate" | "premium";
  subCategory?: string;
  imageUrl: string;
  additionalImages?: string[];
  price?: number;
  companyName?: string;
  customFields?: ICustomField[];
  isBestProduct?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["product", "corporate", "premium"], required: true },
    subCategory: { type: String },
    imageUrl: { type: String, required: true },
    additionalImages: [{ type: String }],
    price: { type: Number },
    companyName: { type: String },
    isBestProduct: { type: Boolean, default: false },
    customFields: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;
