import mongoose, { Schema, models, model } from "mongoose";

/* -----------------------------
   Item Interface
--------------------------------*/
export interface IQuotationItem {
  description: string;
  rate: number;
  quantity: number;
  amount: number;
}

/* -----------------------------
   Main Quotation Interface
--------------------------------*/
export interface IOfficialQuotation {
  _id?: string;
  clientName: string;
  clientEmail: string;
  items: IQuotationItem[];
  totalAmount: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/* -----------------------------
   Item Schema
--------------------------------*/
const QuotationItemSchema = new Schema<IQuotationItem>(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    rate: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

/* -----------------------------
   Main Schema
--------------------------------*/
const OfficialQuotationSchema = new Schema<IOfficialQuotation>(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    clientEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    items: {
      type: [QuotationItemSchema],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/* -----------------------------
   Model Export (important for Next.js)
--------------------------------*/
const OfficialQuotation =
  models.OfficialQuotation ||
  model<IOfficialQuotation>("OfficialQuotation", OfficialQuotationSchema);

export default OfficialQuotation;