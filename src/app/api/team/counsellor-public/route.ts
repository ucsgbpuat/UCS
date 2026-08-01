import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import StaffCounsellor from "@/models/StaffCounsellor";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const counsellor = await StaffCounsellor.findOne();
    return NextResponse.json(counsellor || null);
  } catch (error: any) {
    console.error("GET public counsellor error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
