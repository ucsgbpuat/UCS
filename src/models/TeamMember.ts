import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  role: string;
  college: string;
  imageUrl?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const teamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.TeamMember || model<ITeamMember>("TeamMember", teamMemberSchema);
