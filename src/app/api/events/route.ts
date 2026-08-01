import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Event from "@/models/Event";
import { authenticateAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find().sort({ date: -1 });
    return NextResponse.json(events);
  } catch (error: any) {
    console.error("GET events error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = authenticateAdmin(req);
    if (!admin) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    const { title, category, date, time, venue, description, image, attendees, eventType } = await req.json();

    if (!title || !category || !date || !time || !venue || !description || !eventType) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();
    const event = new Event({
      title,
      category,
      date,
      time,
      venue,
      description,
      image,
      attendees: attendees || 0,
      eventType,
    });

    await event.save();
    return NextResponse.json({ message: "Event created successfully", event }, { status: 201 });
  } catch (error: any) {
    console.error("POST events error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
