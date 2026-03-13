import mongoose, { Schema, model, models } from "mongoose";

export interface IAttendance {
  _id?: string;
  employeeId: mongoose.Types.ObjectId;
  date: Date;
  status: "full" | "half" | "holiday" | "hourly" | "absent" | "full_day" | "half_day" | "1.5_days" | "2_days";
  hours?: number; // Used mainly for "hourly" status
  remarks?: string;
  wages?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    date: { type: Date, required: true },
    status: { 
      type: String, 
      enum: ["full", "half", "holiday", "hourly", "absent", "full_day", "half_day", "1.5_days", "2_days"], 
      required: true 
    },
    hours: { type: Number },
    remarks: { type: String },
    wages: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Ensure unique attendance record per employee per day (ignoring time)
AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

const Attendance = models.Attendance || model("Attendance", AttendanceSchema);
export default Attendance;

