import mongoose, { Schema, model, models } from "mongoose";

export interface ITestimonial {
  _id?: string;
  clientName: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true },
    role: { type: String },
    company: { type: String },
    content: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema);
export default Testimonial;
