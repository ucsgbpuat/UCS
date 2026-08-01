import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Event from "@/models/Event";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { type: string } }
) {
  try {
    const { type } = params;

    if (!["upcoming", "past"].includes(type)) {
      return NextResponse.json({ message: "Invalid event type" }, { status: 400 });
    }

    await dbConnect();
    const events = await Event.find({ eventType: type }).sort({ date: -1 });
    return NextResponse.json(events);
  } catch (error: any) {
    console.error("GET events by type error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
