export type RegistrationPayload = {
  eventId: string;
  eventName: string;
  role: string;
  name: string;
  email: string;
  xhandle?: string | null;
  agreeToNewsletter?: boolean;
  address?: string | null;
};

export async function createRegistration(payload: RegistrationPayload) {
  const res = await fetch("/api/registration", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to register: ${msg}`);
  }
  return res.json();
}