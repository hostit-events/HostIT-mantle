import { useWriteContract } from "wagmi";
import { getAddress } from "viem";
import { useCallback } from "react";
import { parseEther } from "viem";
import { toast } from "sonner";
import ticketCheckinFacet from "../../abis/TicketCheckInFacet.json";

export const useCheckinTicket = () => {
  const { writeContract } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_TICKET_CHECKIN_FACET_ADDRESS || "0x";

  return useCallback(
    async (ticketId: number, ticketOwner: `0x${string}`, tokenId:`0x${string}`) => {
      try {
        const result = writeContract({
          abi: ticketCheckinFacet,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "checkInTicket",
          args: [ticketId, ticketOwner, tokenId],
        });
        return result;
      } catch (error) {
        console.error("Error Checking In:", error);
        toast.error(error as string);
      }
    },
    [writeContract, contractAddress]
  );
};
