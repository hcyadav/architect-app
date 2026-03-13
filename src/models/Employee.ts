import mongoose, { Schema, model, models } from "mongoose";

export interface IEmployee {
  _id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  designation: string;
  joiningDate: Date;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    designation: { type: String, required: true },
    joiningDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

if (process.env.NODE_ENV === "development") {
  delete (mongoose.models as any).Employee;
}
const Employee = models.Employee || model("Employee", EmployeeSchema);
export default Employee;

