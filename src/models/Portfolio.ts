import mongoose, { Schema, model, models } from "mongoose";

export interface IPortfolio {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  additionalImages?: string[];
  location?: string;
  completionDate?: string;
  clientName?: string;
  createdAt?: string;
  updatedAt?: string;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    additionalImages: [{ type: String }],
    location: { type: String },
    completionDate: { type: String },
    clientName: { type: String },
  },
  { timestamps: true }
);

const Portfolio = models.Portfolio || model("Portfolio", PortfolioSchema);
export default Portfolio;
