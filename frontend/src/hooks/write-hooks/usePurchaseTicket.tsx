import { useWriteContract } from "wagmi";
import { getAddress } from "viem";
import { useCallback } from "react";
import { parseEther } from "viem";
import { toast } from "sonner";
import ticketMarketplaceFacet from "../../abis/TicketMarketplaceFacet.json";

export const usePurchaseTicket = () => {
  const { writeContract } = useWriteContract();

 const contractAddress = process.env.NEXT_PUBLIC_TICKET_MARKETPLACE_FACET_ADDRESS || "0x";


  return useCallback(
    async (ticketId: number, feeType: number, ticketPrice: number) => {
      try {
        const result = writeContract({
          abi: ticketMarketplaceFacet,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "purchaseTicket",
          args: [ticketId, feeType],
          value: parseEther(ticketPrice.toString()),
        });
        return result;
      } catch (error) {
        console.error("Error Purchasing ticket:", error);
        toast.error(error as string);
      }
    },
    [writeContract, contractAddress]
  );
};
