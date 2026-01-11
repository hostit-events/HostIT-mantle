export type EventCreatePayload = {
  name: string;
  image: string;
  description: string;
  organizer_name: string;
  event_type: string;
  event_category: string;
  location: string;
  schedule: Array<{ start_time: string; end_time: string; activity: string; description: string }>;
};

export async function createEvent(payload: EventCreatePayload): Promise<{ id: string; link: string }> {
  const res = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to create event: ${msg}`);
  }
  const data = await res.json();
  return data as { id: string; link: string };
}

export async function updateEvent(id: string, payload: Partial<EventCreatePayload & { ticketId: number }>) {
  const res = await fetch(`/api/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to update event: ${msg}`);
  }
  return res.json();
}

export async function getEvent(id: string) {
  const res = await fetch(`/api/events/${id}`);
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to get event: ${msg}`);
  }
  return res.json();
}