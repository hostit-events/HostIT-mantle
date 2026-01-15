import { useWalletClient } from "wagmi";
import { getAddress, numberToHex } from "viem";
import { useCallback } from "react";
import { toast } from "sonner";
import ticketCheckinFacet from "../../abis/TicketCheckInFacet.json";
import { SELECTED_CHAIN } from "@/lib/chain";

export const useCheckinTicket = () => {
  const { data: walletClient } = useWalletClient();
  const contractAddress = process.env.NEXT_PUBLIC_TICKET_CHECKIN_FACET_ADDRESS || "0x";

  return useCallback(
    async (ticketId: number, ticketOwner: `0x${string}`, tokenId: `0x${string}`) => {
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
          abi: ticketCheckinFacet as any,
          functionName: "checkInTicket",
          args: [ticketId, ticketOwner, tokenId],
          chain: SELECTED_CHAIN,
          account: walletClient.account,
        });
        return hash;
      } catch (error: any) {
        console.error("Error Checking In:", error);
        toast.error(error?.message || "Failed to check in");
      }
    },
    [walletClient, contractAddress]
  );
};
