import { createPublicClient, createWalletClient, http, custom, type Chain } from "viem";
import { lisk, liskSepolia, base, baseSepolia } from "viem/chains";

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "https://rpc.lisk.com";

type SupportedChainName = "lisk" | "sepolia-lisk" | "base" | "basesepolia";

const CHAIN_MAP: Record<SupportedChainName, Chain> = {
  lisk,
  "sepolia-lisk": liskSepolia,
  base,
  basesepolia: baseSepolia,
};

const selectedChainName = (process.env.NEXT_PUBLIC_CHAIN?.toLowerCase() as SupportedChainName) || "lisk";
export const SELECTED_CHAIN = CHAIN_MAP[selectedChainName] ?? lisk;

export const publicClient = createPublicClient({
  chain: SELECTED_CHAIN,
  transport: http(RPC_URL),
});

export const walletClient = typeof window !== "undefined" && (window as any).ethereum
  ? createWalletClient({
      chain: SELECTED_CHAIN,
      transport: custom((window as any).ethereum),
    })
  : undefined;

export const DIAMOND_ADDRESS = process.env.NEXT_PUBLIC_DIAMOND_CONTRACT_ADDRESS as `0x${string}`;