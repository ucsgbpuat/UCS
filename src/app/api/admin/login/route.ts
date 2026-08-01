import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ message: "Password required" }, { status: 400 });
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const token = jwt.sign(
      { role: "admin", timestamp: Date.now() },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return NextResponse.json({ token, message: "Login successful" });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
