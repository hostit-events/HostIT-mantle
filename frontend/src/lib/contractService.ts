import { EventFormData } from "@/hooks/useEventForm";
import { dateToEpoch } from "./eventApi";

export interface ContractTicketParams {
  name: string;
  symbol: string;
  uri: string;
  startTime: number;
  endTime: number;
  purchaseStartTime: number;
  maxTicket: number;
  isFree: boolean;
  feeTypes: number[];
  fees: number[];
}

/**
 * Prepares ticket data for smart contract creation
 * @param formData - Event form data
 * @param eventId - Backend event ID (used in metadata URI)
 * @returns Contract parameters for createTicket function
 */
export const prepareContractTicketData = (
  formData: EventFormData,
  eventId: string
): ContractTicketParams => {
  // Convert dates to epoch timestamps
  const startTime = dateToEpoch(formData.startDate);
  const endTime = dateToEpoch(formData.endDate);

  // Set purchase start time to current time (can be adjusted)
  const purchaseStartTime = Math.floor(Date.now() / 1000);

  // Calculate total tickets
  const maxTicket = formData.ticketTypes.reduce(
    (total, ticket) => total + parseInt(ticket.quantity),
    0
  );

  // Check if any ticket is free
  const isFree = formData.ticketTypes.some(
    (ticket) => parseFloat(ticket.price) === 0
  );

  // Generate event symbol (first 4 chars of event name + timestamp)
  const symbol = formData.eventName
    .substring(0, 4)
    .toUpperCase()
    .replace(/[^A-Z]/g, "");

  // Metadata URI pointing to backend event
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_TEST || "http://localhost:3000/";
  const uri = `${baseUrl}api/events/${eventId}`;

  // Fee configuration - map ticket types to fee structure
  // feeTypes: array of fee type identifiers
  // fees: array of fee amounts (in wei for paid tickets)
  const feeTypes: number[] = [];
  const fees: number[] = [];

  formData.ticketTypes.forEach((ticket, index) => {
    const price = parseFloat(ticket.price);
    if (price > 0) {
      feeTypes.push(index); // Use index as fee type identifier
      // Convert price to wei (assuming price is in ETH/token units)
      // Multiply by 10^18 for wei conversion
      const feeInWei = Math.floor(price * 1e18);
      fees.push(feeInWei);
    }
  });

  // If no paid tickets, set default values
  if (feeTypes.length === 0) {
    feeTypes.push(0);
    fees.push(0);
  }

  return {
    name: formData.eventName,
    symbol,
    uri,
    startTime,
    endTime,
    purchaseStartTime,
    maxTicket,
    isFree,
    feeTypes,
    fees,
  };
};
