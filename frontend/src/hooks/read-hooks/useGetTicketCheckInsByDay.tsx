import { useReadContract } from "wagmi";
import { getAddress } from "viem";
import ticketCheckinFacet from "../../abis/TicketCheckInFacet.json";

export const useGetTicketCheckInsByDay = (ticketId: number, day: number, attendee: `0x${string}` ) => {
  const contractAddress = process.env.NEXT_PUBLIC_TICKET_CHECKIN_FACET_ADDRESS || "0x";
  const result = useReadContract({
    abi: ticketCheckinFacet,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "getTicketCheckInsByDay",
    args: [ticketId, day, attendee],
  });

  return result;
};
