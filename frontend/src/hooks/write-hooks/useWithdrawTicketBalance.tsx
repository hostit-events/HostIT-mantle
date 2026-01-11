import { useWriteContract } from "wagmi";
import { getAddress } from "viem";
import { useCallback } from "react";
import { toast } from "sonner";
import ticketMarketplaceFacet from "../../abis/TicketMarketplaceFacet.json";

export const useWithdrawTicketBalance = () => {
  const { writeContract } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_TICKET_MARKETPLACE_FACET_ADDRESS || "0x";

  return useCallback(
    async (ticketId: number, feeType: number[], to: `0x${string}`) => {
      try {
        const result = writeContract({
          abi: ticketMarketplaceFacet,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "withdrawTicketBalance",
          args: [ticketId, feeType, to],
        });
        return result;
      } catch (error) {
        console.error("Error withdrawing ticket balance:", error);
        toast.error(error as string);
      }
    },
    [writeContract, contractAddress]
  );
};