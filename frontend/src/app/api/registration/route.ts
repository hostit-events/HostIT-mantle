import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Registration from "@/app/models/registrationModel";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { eventId, eventName, role, name, email, xhandle, agreeToNewsletter, address } = body;

    if (!eventId || !eventName || !role || !name || !email) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const registration = await Registration.create({
      eventId,
      eventName,
      role,
      name,
      email,
      xhandle: xhandle ?? null,
      agreeToNewsletter: Boolean(agreeToNewsletter),
      address: address ?? null,
    });

    return NextResponse.json(registration, { status: 201 });
  } catch (error: any) {
    if (error?.code === 11000) {
      return NextResponse.json({ message: "Already registered for this event" }, { status: 409 });
    }
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Failed to register" }, { status: 500 });
  }
}