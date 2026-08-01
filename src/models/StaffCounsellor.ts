import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IStaffCounsellor extends Document {
  name: string;
  designation: string;
  department: string;
  college: string;
  email: string;
  phone: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const staffCounsellorSchema = new Schema<IStaffCounsellor>(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true, default: "Staff Counsellor" },
    department: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default models.StaffCounsellor || model<IStaffCounsellor>("StaffCounsellor", staffCounsellorSchema);
