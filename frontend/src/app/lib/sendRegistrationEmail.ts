import { Resend } from "resend";
import { epochToDatetime } from "datetime-epoch-conversion";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRegistrationEmail({
  email,
  name,
  eventName,
  eventStartDate,
  id,
}: {
  email: string;
  name: string;
  eventName: string;
  eventStartDate: number;
  id: string;
}) {
  const response = epochToDatetime(`${eventStartDate}`);

  function convertTime(time: string) {
    let hours = time.substring(0, 2);
    let minutes = time.substring(3, 5);
    let ampm = parseInt(hours) >= 12 ? "PM" : "AM";

    if (parseInt(hours) > 12) {
      hours = (parseInt(hours) - 12).toString();
    } else if (parseInt(hours) === 0) {
      hours = "12";
    }
    return `${hours}:${minutes} ${ampm}`;
  }

  await resend.emails.send({
    from: "CrowdPass <noreply@updates.crowdpassevents.com>",
    to: email,
    subject: `🎟️ Registration Successful: ${eventName}`,
    html: `
      <div style="font-family: sans-serif; background-color: #f9f9f9; padding: 40px;">
        <table style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr style="background-color: #ff6932;">
            <td style="padding: 20px; text-align: center;">
              <img src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/crowdpass_logo_a2f8bq.png" alt="CrowdPass Logo" width="200" style="display: block; margin: auto;" />
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #333333;">🎉 Registration Successful!</h2>
              <p style="font-size: 16px; color: #555555;">Hi <strong>${name}</strong>,</p>
              <p style="font-size: 16px; color: #555555;">You have successfully registered for <strong>${eventName}</strong>. We’re excited to have you join us!</p>
              <p style="font-size: 16px; color: #555555;">
                📅 <strong>Date:</strong> ${response.day} ${response.month}, ${response.year}<br/>
                ⏰ <strong>Time:</strong> ${convertTime(response.time)}
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://www.crowdpassevents.com/events/${id}" style="background-color: #ff6932; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; display: inline-block;">
                  View Event Details
                </a>
              </div>
              <p style="font-size: 14px; color: #999999; text-align: center;">If you have any questions, feel free to reply to this email or contact our support team.</p>
            </td>
          </tr>
          <tr style="background-color: #f2f2f2;">
            <td style="padding: 20px; text-align: center; font-size: 12px; color: #999999;">
              © ${new Date().getFullYear()} CrowdPass. All rights reserved.
            </td>
          </tr>
        </table>
      </div>
    `,
  });
}
