import { NextRequest, NextResponse } from "next/server";
import { publicClient } from "@/lib/chain";
import FactoryFacetAbi from "@/abis/FactoryFacetAbi.json";
import MarketplaceFacetAbi from "@/abis/MarketplaceFacetAbi.json";
import CheckInFacetAbi from "@/abis/CheckInFacetAbi.json";

const ABI_MAP = {
  FactoryFacetAbi,
  MarketplaceFacetAbi,
  CheckInFacetAbi,
} as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { address, abiName, functionName, args = [] } = body as {
      address: `0x${string}`;
      abiName: keyof typeof ABI_MAP;
      functionName: string;
      args?: any[];
    };

    if (!address || !abiName || !functionName) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const abi = ABI_MAP[abiName];
    const result = await publicClient.readContract({
      address,
      abi,
      functionName: functionName as any,
      args,
    });

    return NextResponse.json({ result });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}