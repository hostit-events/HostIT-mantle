import { useWriteContract } from "wagmi";
import { getAddress } from "viem";
import { useCallback } from "react";
import { toast } from "sonner";
import ticketFactory from "../../abis/TicketFactoryFacet.json";

export const useUpdateTicketMetadata = () => {
  const { writeContract } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_TICKET_FACTORY_FACET_ADDRESS || "0x";


  return useCallback(
    async (ticketId: number, name: string, symbol: string, uri: string, startTime: number, endTime: number, purchaseStartTime: number, maxTicket: number) => {
      try {
        const result = writeContract({
          abi: ticketFactory,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "updateTicketMetadata",
          args: [ticketId, name, symbol, uri, startTime, endTime, purchaseStartTime, maxTicket],
        });
        return result;
      } catch (error) {
        console.error("Error updating ticket metadata:", error);
        toast.error(error as string);
      }
    },
    [writeContract, contractAddress]
  );
};