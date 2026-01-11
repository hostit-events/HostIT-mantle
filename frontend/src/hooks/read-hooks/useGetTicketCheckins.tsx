import { useReadContract } from "wagmi";
import { getAddress } from "viem";
import ticketCheckinFacet from "../../abis/TicketCheckInFacet.json";

export const useGetTicketCheckins = (ticketId: number, attendee: `0x${string}` ) => {
  const contractAddress = process.env.NEXT_PUBLIC_TICKET_CHECKIN_FACET_ADDRESS || "0x";
  const result = useReadContract({
    abi: ticketCheckinFacet,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "getTicketCheckIns",
    args: [ticketId, attendee],
  });

  return result;
};
