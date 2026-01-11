import { useWriteContract } from "wagmi";
import { getAddress } from "viem";
import { useCallback } from "react";
import { toast } from "sonner";
import ticketFactory from "../../abis/TicketFactoryFacet.json";

export const useCreateTicket = () => {
  const { writeContract } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_TICKET_FACTORY_FACET_ADDRESS || "0x";


  return useCallback(
    async (name: string, symbol: string, uri: string, startTime: number, endTime: number, purchaseStartTime: number, maxTicket: number, isFree: boolean, feeTypes: number[], fees: number[] ) => {
      try {
        const result = writeContract({
          abi: ticketFactory,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "createTicket",
          args: [name, symbol, uri, startTime, endTime, purchaseStartTime, maxTicket, isFree, feeTypes, fees],
        });
        return result;
      } catch (error) {
        console.error("Error creating Event:", error);
        toast.error(error as string);
      }
    },
    [writeContract, contractAddress]
  );
};