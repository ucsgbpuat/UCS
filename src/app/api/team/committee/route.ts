import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TeamMember from "@/models/TeamMember";
import { authenticateAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const admin = authenticateAdmin(req);
    if (!admin) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    await dbConnect();
    const members = await TeamMember.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(members);
  } catch (error: any) {
    console.error("GET committee error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = authenticateAdmin(req);
    if (!admin) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    const { name, role, college, imageUrl, isPast } = await req.json();

    if (!name || !role || !college) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();
    const lastMember = await TeamMember.findOne().sort({ order: -1 });
    const member = new TeamMember({
      name,
      role,
      college,
      imageUrl,
      order: (lastMember?.order ?? -1) + 1,
      isPast: Boolean(isPast),
    });

    await member.save();
    return NextResponse.json({ message: "Member added successfully", member }, { status: 201 });
  } catch (error: any) {
    console.error("POST committee error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
