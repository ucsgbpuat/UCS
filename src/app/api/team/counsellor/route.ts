import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import StaffCounsellor from "@/models/StaffCounsellor";
import { authenticateAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const admin = authenticateAdmin(req);
    if (!admin) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    await dbConnect();
    const counsellor = await StaffCounsellor.findOne();
    return NextResponse.json(counsellor || null);
  } catch (error: any) {
    console.error("GET counsellor error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = authenticateAdmin(req);
    if (!admin) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    const { name, designation, department, college, email, phone, imageUrl } = await req.json();

    if (!name || !department || !college || !email || !phone) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();
    let counsellor = await StaffCounsellor.findOne();

    if (counsellor) {
      counsellor = await StaffCounsellor.findByIdAndUpdate(
        counsellor._id,
        { name, designation: designation || "Staff Counsellor", department, college, email, phone, imageUrl },
        { new: true }
      );
    } else {
      counsellor = new StaffCounsellor({
        name,
        designation: designation || "Staff Counsellor",
        department,
        college,
        email,
        phone,
        imageUrl,
      });
      await counsellor.save();
    }

    return NextResponse.json({ message: "Counsellor saved successfully", counsellor }, { status: 201 });
  } catch (error: any) {
    console.error("POST counsellor error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
