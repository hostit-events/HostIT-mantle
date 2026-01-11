import React from "react";
import { PiLineVerticalThin } from "react-icons/pi";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { GiPadlock } from "react-icons/gi";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import { useContractRead } from "@/hooks/useContract";

type Props = {
  isTicket: boolean;
  isAttendee: boolean;
  ticketId?: number | null;
};

const TicketPoap = ({ isTicket, isAttendee, ticketId }: Props) => {
  const router = useRouter();
  const { data } = useContractRead<any>({
    abiName: "FactoryFacetAbi",
    functionName: "ticketData",
    args: ticketId != null ? [BigInt(ticketId)] : undefined,
    enabled: ticketId != null,
  });
  const maxTickets = Number((data?.result?.maxTickets ?? BigInt(0)) as bigint);
  const soldTickets = Number((data?.result?.soldTickets ?? BigInt(0)) as bigint);
  const available = Math.max(0, maxTickets - soldTickets);
  return (
    <div className="border border-subsidiary 2xl:py-6 py-4 2xl:px-10 px-6 rounded-2xl flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="2xl:text-2xl text-lg font-bold bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent inline-flex w-auto">
          {isTicket ? "TICKETS" : "POAPs"}
        </h1>
        {!isAttendee && !isTicket && (
          <Dialog>
            <DialogTrigger className="2xl:text-lg text-sm h-10 2xl:h-12 2xl:w-56 w-48 rounded-lg bg-subsidiary hover:bg-white hover:text-subsidiary text-white font-semibold">
              Request
            </DialogTrigger>
            <DialogContent className="border bg-principal border-subsidiary rounded-3xl p-0">
              <div
                className="p-12 rounded-t-3xl
             bg-subsidiary w-full flex justify-center items-center"
              >
                <GiPadlock color="#ffffff" size={72} />
              </div>
              <div className="p-8 flex flex-col justify-center items-center gap-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent">
                  This event has been cancelled
                </h1>
                <Button
                  className="2xl:text-lg text-sm h-12 2xl:h-14 w-52 font-semibold bg-subsidiary hover:bg-white hover:text-subsidiary rounded-xl"
                  onClick={() => {
                    router.push("/attendee-login");
                  }}
                >
                  Claim refund
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="2xl:text-5xl text-3xl text-white">{maxTickets}</h1>
          <p className="text-white 2xl:text-lg text-base">Total</p>
        </div>

        <PiLineVerticalThin className="text-white 2xl:text-8xl text-6xl" />
        <div className="flex flex-col justify-center items-center">
          <h1 className="2xl:text-5xl text-3xl text-white">{available}</h1>
          <p className="text-white 2xl:text-lg text-base">Available</p>
        </div>
        <PiLineVerticalThin className="text-white 2xl:text-8xl text-6xl" />
        <div className="flex flex-col justify-center items-center">
          <h1 className="2xl:text-5xl text-3xl text-white">{soldTickets}</h1>
          <p className="text-white 2xl:text-lg text-base">
            {isTicket ? "Registered" : "Minted"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketPoap;
