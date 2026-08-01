import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IEvent extends Document {
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  image?: string;
  attendees?: number;
  eventType: "upcoming" | "past";
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    attendees: { type: Number, default: 0 },
    eventType: { type: String, enum: ["upcoming", "past"], required: true },
  },
  { timestamps: true }
);

export default models.Event || model<IEvent>("Event", eventSchema);
