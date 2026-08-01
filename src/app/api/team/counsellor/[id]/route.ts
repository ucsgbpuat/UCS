import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import StaffCounsellor from "@/models/StaffCounsellor";
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
    const { name, designation, department, college, email, phone, imageUrl } = await req.json();

    if (!name || !department || !college || !email || !phone) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();
    const counsellor = await StaffCounsellor.findByIdAndUpdate(
      id,
      { name, designation: designation || "Staff Counsellor", department, college, email, phone, imageUrl },
      { new: true }
    );

    if (!counsellor) {
      return NextResponse.json({ message: "Counsellor not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Counsellor updated successfully", counsellor });
  } catch (error: any) {
    console.error("PUT counsellor error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
