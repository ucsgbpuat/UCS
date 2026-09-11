import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TeamMember from "@/models/TeamMember";
import { authenticateAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  try {
    const admin = authenticateAdmin(req);
    if (!admin) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    const { memberIds } = await req.json();
    if (!Array.isArray(memberIds) || memberIds.some((id) => typeof id !== "string")) {
      return NextResponse.json({ message: "Invalid member order" }, { status: 400 });
    }

    await dbConnect();
    await TeamMember.bulkWrite(
      memberIds.map((memberId: string, order: number) => ({
        updateOne: {
          filter: { _id: memberId },
          update: { $set: { order } },
        },
      }))
    );

    return NextResponse.json({ message: "Team order updated successfully" });
  } catch (error: any) {
    console.error("PUT committee reorder error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}