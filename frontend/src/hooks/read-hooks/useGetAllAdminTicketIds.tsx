import { useReadContract } from "wagmi";
import { getAddress } from "viem";
import ticketFactoryFacet from "../../abis/TicketFactoryFacet.json";

export const useGetAllAdminTicketIds = (organizer: `0x${string}`) => {
  const contractAddress = process.env.NEXT_PUBLIC_TICKET_FACTORY_FACET_ADDRESS || "0x";

  const result = useReadContract({
    abi: ticketFactoryFacet,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "getAllAdminTicketIds",
    args: [organizer],
  });

  return result;
};
