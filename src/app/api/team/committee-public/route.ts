import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TeamMember from "@/models/TeamMember";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const members = await TeamMember.find().sort({ createdAt: -1 });
    return NextResponse.json(members);
  } catch (error: any) {
    console.error("GET public committee error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
