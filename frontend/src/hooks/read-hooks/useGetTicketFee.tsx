import { useReadContract } from "wagmi";
import { getAddress } from "viem";
import ticketMarketplaceFacet from "../../abis/TicketMarketplaceFacet.json";

export const useGetTicketFee = (ticketId: number, feeType: number) => {
  const contractAddress = process.env.NEXT_PUBLIC_TICKET_MARKETPLACE_FACET_ADDRESS || "0x";
  const result = useReadContract({
    abi: ticketMarketplaceFacet,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "getTicketFee",
    args: [ticketId, feeType],
  });

  return result;
};
