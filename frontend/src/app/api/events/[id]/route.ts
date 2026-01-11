import { NextRequest, NextResponse } from "next/server";
import Event from "../../../models/eventModel";
import { connectDB } from "@/app/lib/db";

const ALLOWED_ORIGINS = [
  "https://www.hodsit.events",
  "http://localhost:3000",
  "http://localhost:3001",
];

function addCorsHeaders(response: NextResponse, request: NextRequest) {
  const origin = request.headers.get("origin");
  
  const allowedPatterns = [
    /^https:\/\/.*\.crowdpassevents\.com$/,
    /^http:\/\/localhost:\d+$/,        
  ];
  
  const isAllowed = origin && (
    ALLOWED_ORIGINS.includes(origin) || 
    allowedPatterns.some(pattern => pattern.test(origin))
  );
  
  if (isAllowed) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  response.headers.set("Access-Control-Max-Age", "86400");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  
  return response;
}

export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, { status: 200 });
  return addCorsHeaders(response, request);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    await connectDB();

    const event = await Event.findById(id);
    if (!event) {
      const response = NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
      return addCorsHeaders(response, request);
    }

    const eventJson = {
      platform: "HostIt",
      name: event.name,
      image: `https://ipfs.io/ipfs/${event.image}`,
      description: event.description,
      external_url: "https://www.hostit.events/events/" + event._id,
      ticketId: event.ticketId ?? null,
      attributes: [
        {
          trait_type: "Organizer Name",
          value: event.organizer_name,
        },
        {
          trait_type: "Event Type",
          value: event.event_type,
        },
        {
          trait_type: "Event Category",
          value: event.event_category,
        },
        {
          trait_type: "Location",
          value: event.location,
        },
        {
          trait_type: "Schedule",
          value: event.schedule,
        },
      ],
    };

    const response = NextResponse.json(eventJson, { status: 200 });
    return addCorsHeaders(response, request);
  } catch (error) {
    console.error("Error fetching event:", error);
    const response = NextResponse.json(
      { message: "Failed to fetch event" },
      { status: 500 }
    );
    return addCorsHeaders(response, request);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    await connectDB();

    const body = await request.json();
    const update: Record<string, any> = {};
    const allowedFields = [
      "name",
      "image",
      "description",
      "organizer_name",
      "event_type",
      "event_category",
      "location",
      "schedule",
      "ticketId",
    ];

    for (const key of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        update[key] = body[key];
      }
    }

    if (Object.keys(update).length === 0) {
      const response = NextResponse.json(
        { message: "No valid fields provided for update" },
        { status: 400 }
      );
      return addCorsHeaders(response, request);
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, update, { new: true });

    if (!updatedEvent) {
      const response = NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
      return addCorsHeaders(response, request);
    }

    const response = NextResponse.json(updatedEvent, { status: 200 });
    return addCorsHeaders(response, request);
  } catch (error) {
    console.error("Error updating event:", error);
    const response = NextResponse.json(
      { message: "Failed to update event" },
      { status: 500 }
    );
    return addCorsHeaders(response, request);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    await connectDB();

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      const response = NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
      return addCorsHeaders(response, request);
    }

    const response = NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
    return addCorsHeaders(response, request);
  } catch (error) {
    console.error("Error deleting event:", error);
    const response = NextResponse.json(
      { message: "Failed to delete event" },
      { status: 500 }
    );
    return addCorsHeaders(response, request);
  }
}