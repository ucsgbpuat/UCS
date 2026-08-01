import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TeamMember from "@/models/TeamMember";
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
    const { name, role, college, imageUrl } = await req.json();

    if (!name || !role || !college) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();
    const member = await TeamMember.findByIdAndUpdate(
      id,
      { name, role, college, imageUrl },
      { new: true }
    );

    if (!member) {
      return NextResponse.json({ message: "Member not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Member updated successfully", member });
  } catch (error: any) {
    console.error("PUT committee member error:", error);
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
    const member = await TeamMember.findByIdAndDelete(id);

    if (!member) {
      return NextResponse.json({ message: "Member not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Member deleted successfully" });
  } catch (error: any) {
    console.error("DELETE committee member error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
