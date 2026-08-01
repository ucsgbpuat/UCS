import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Event from "@/models/Event";
import { authenticateAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = authenticateAdmin(req);
    if (!admin) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    const { id } = params;
    const { title, category, date, time, venue, description, image, attendees, eventType } = await req.json();

    if (!title || !category || !date || !time || !venue || !description || !eventType) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();
    const event = await Event.findByIdAndUpdate(
      id,
      { title, category, date, time, venue, description, image, attendees, eventType },
      { new: true }
    );

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event updated successfully", event });
  } catch (error: any) {
    console.error("PUT event error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = authenticateAdmin(req);
    if (!admin) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    const { id } = params;
    await dbConnect();
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error: any) {
    console.error("DELETE event error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
