import { useWriteContract } from "wagmi";
import { getAddress } from "viem";
import { useCallback } from "react";
import { toast } from "sonner";
import ticketMarketplaceFacet from "../../abis/TicketMarketplaceFacet.json";

export const useUpdateTicketFee = () => {
  const { writeContract } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_TICKET_MARKETPLACE_FACET_ADDRESS || "0x";


  return useCallback(
    async (ticketId: number, isFree: boolean, feeTypes: number[], fees: number[]) => {
      try {
        const result = writeContract({
          abi: ticketMarketplaceFacet,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "updateTicketFee",
          args: [ticketId, isFree, feeTypes, fees],
        });
        return result;
      } catch (error) {
        console.error("Error Upadating ticket fee:", error);
        toast.error(error as string);
      }
    },
    [writeContract, contractAddress]
  );
};