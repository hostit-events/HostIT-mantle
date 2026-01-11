import { useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { publicClient, walletClient, DIAMOND_ADDRESS } from "@/lib/chain";
import type { Abi } from "viem";

import FactoryFacetAbi from "@/abis/FactoryFacetAbi.json";
import MarketplaceFacetAbi from "@/abis/MarketplaceFacetAbi.json";
import CheckInFacetAbi from "@/abis/CheckInFacetAbi.json";

type AbiName = "FactoryFacetAbi" | "MarketplaceFacetAbi" | "CheckInFacetAbi";

const ABI_MAP: Record<AbiName, Abi> = {
  FactoryFacetAbi: FactoryFacetAbi as Abi,
  MarketplaceFacetAbi: MarketplaceFacetAbi as Abi,
  CheckInFacetAbi: CheckInFacetAbi as Abi,
};

type AnyArgs = unknown[] | readonly unknown[];

type ReadParams = {
  abiName: AbiName;
  functionName: string;
  args?: AnyArgs;
  address?: `0x${string}`;
  enabled?: boolean;
};

function serializeArgs(args: AnyArgs): string {
  try {
    return JSON.stringify(args, (_, v) => (typeof v === "bigint" ? v.toString() : v));
  } catch {
    return String(args);
  }
}

export function useContractRead<TData = unknown>(params: ReadParams) {
  const { abiName, functionName, args, address = DIAMOND_ADDRESS, enabled = true } = params;

  const abi = useMemo(() => ABI_MAP[abiName], [abiName]);
  const safeArgs = (args ?? []) as AnyArgs;

  return useQuery<{ result: TData }, Error>({
    queryKey: ["contract-read", address, abiName, functionName, args ? serializeArgs(args) : "[]"],
    enabled: Boolean(enabled && address && functionName && abi),
    queryFn: async () => {
      const result = await publicClient.readContract({
        address,
        abi,
        functionName: functionName as any,
        args: safeArgs as any,
      });
      return { result: result as TData };
    },
  });
}

type WriteParams = {
  abiName: AbiName;
  functionName: string;
  address?: `0x${string}`;
};

type WriteVariables<TArgs extends AnyArgs = AnyArgs> = {
  args: TArgs;
  valueWei?: bigint;
};

export function useContractWrite<TArgs extends AnyArgs = AnyArgs>(params: WriteParams) {
  const { abiName, functionName, address = DIAMOND_ADDRESS } = params;
  const abi = useMemo(() => ABI_MAP[abiName], [abiName]);

  return useMutation<`0x${string}`, Error, WriteVariables<TArgs>>({
    mutationKey: ["contract-write", address, abiName, functionName],
    mutationFn: async (variables) => {
      if (!walletClient) throw new Error("Wallet not available. Connect a wallet.");

      const addresses = await walletClient.getAddresses();
      const account = addresses[0];
      if (!account) throw new Error("No account connected.");

      const hash = await walletClient.writeContract({
        address,
        account,
        abi,
        functionName: functionName as any,
        args: variables.args as any,
        value: variables.valueWei,
      });
      return hash;
    },
  });
}

export function getAbi(abiName: AbiName): Abi {
  return ABI_MAP[abiName];
}