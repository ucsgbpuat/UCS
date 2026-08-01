import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

export interface DecodedAdmin {
  role: string;
  timestamp: number;
}

export function verifyToken(token: string): DecodedAdmin | null {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedAdmin;
  } catch (error) {
    return null;
  }
}

export function authenticateAdmin(req: Request): DecodedAdmin | null {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }
    const token = authHeader.split(" ")[1];
    return verifyToken(token);
  } catch (error) {
    return null;
  }
}
