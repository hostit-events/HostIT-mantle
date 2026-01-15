import { useWalletClient } from "wagmi";
import { getAddress, numberToHex } from "viem";
import { useCallback } from "react";
import { toast } from "sonner";
import ticketFactory from "../../abis/TicketFactoryFacet.json";
import { SELECTED_CHAIN } from "@/lib/chain";

export const useCreateTicket = () => {
  const { data: walletClient } = useWalletClient();
  const contractAddress = process.env.NEXT_PUBLIC_TICKET_FACTORY_FACET_ADDRESS || "0x";

  return useCallback(
    async (name: string, symbol: string, uri: string, startTime: number, endTime: number, purchaseStartTime: number, maxTicket: number, isFree: boolean, feeTypes: number[], fees: number[]) => {
      if (!walletClient) {
        toast.error("Please connect your wallet");
        return;
      }

      try {
        // Switch chain if needed
        const chainId = await walletClient.getChainId();
        if (chainId !== SELECTED_CHAIN.id) {
          try {
            await walletClient.switchChain({ id: SELECTED_CHAIN.id });
          } catch (e) {
            console.error("Failed to switch chain", e);
            toast.error("Failed to switch network. Please switch to Mantle Sepolia.");
            return;
          }
        }

        const hash = await walletClient.writeContract({
          address: getAddress(contractAddress ? contractAddress : ""),
          abi: ticketFactory as any,
          functionName: "createTicket",
          args: [name, symbol, uri, startTime, endTime, purchaseStartTime, maxTicket, isFree, feeTypes, fees],
          chain: SELECTED_CHAIN,
          account: walletClient.account,
        });
        return hash;
      } catch (error: any) {
        console.error("Error creating Event:", error);
        toast.error(error?.message || "Failed to create ticket");
      }
    },
    [walletClient, contractAddress]
  );
};