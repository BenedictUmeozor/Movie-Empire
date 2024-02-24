import connectToDatabase from "@/libs/database";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 500 }
      );
    }

    await connectToDatabase();

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });

    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occured" }, { status: 500 });
  }
}
