import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ status: "OK", message: "Server is running, Database connected" });
  } catch (error: any) {
    return NextResponse.json(
      { status: "ERROR", message: "Database connection failed", error: error.message },
      { status: 500 }
    );
  }
}
