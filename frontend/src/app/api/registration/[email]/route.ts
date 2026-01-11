import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Registration from "@/app/models/registrationModel";

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const conn = await connectDB();
    // If DB is not configured, be resilient and return empty list
    if (!conn) {
      return NextResponse.json({ registrations: [] }, { status: 200 });
    }
    const email = params.email.toLowerCase();
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    const query: any = { email };
    if (eventId) query.eventId = eventId;

    const registrations = await Registration.find(query).lean();
    return NextResponse.json({ registrations }, { status: 200 });
  } catch (error) {
    console.error("Fetch registrations error:", error);
    // Graceful fallback on errors
    return NextResponse.json({ registrations: [] }, { status: 200 });
  }
}