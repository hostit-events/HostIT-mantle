"use client";

import React, { useEffect } from "react";
import AttendeeOrganizerCircle from "./attendee-Organizer-Circle";
import Image from "next/image";
import { Card } from "../ui/card";
import { FaUsersRectangle } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DynamicConnectButton,
  useDynamicContext,
  useIsLoggedIn,
} from "@dynamic-labs/sdk-react-core";

const AttendeeLogin = () => {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard/attendee/my-events");
    }
  }, [isLoggedIn]);

  return (
    <div className="2xl:max-w-[1200px] max-w-[1024px] min-h-screen mx-auto flex flex-col 2xl:pt-28 pt-10 2xl:gap-10">
      <Link href={"/"}>
        <Image
          src={"/logo.png"}
          width={149}
          height={47}
          alt="HostIt logo"
          className="hidden md:flex"
        />
      </Link>
      <div className="flex items-center justify-center">
        <div className="relative w-60 h-60 -mr-40">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="50" fill="#007CFA" stroke-width="2" />
          </svg>
        </div>
        <AttendeeOrganizerCircle page="Attendee" />
      </div>
      <h1 className="text-center 2xl:text-6xl text-4xl  font-bold bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent">
        Attendee
      </h1>
      <div className="flex flex-col items-center justify-center">
        <Card className="w-[85%] md:w-[50%] my-4 bg-transparent border border-subsidiary p-8 relative flex justify-center items-center">
          <div className="absolute top-0 left-0 p-4">
            <FaUsersRectangle
              size={50}
              className="text-subsidiary group-hover:text-white -ml-8 -mt-8 -rotate-45"
            />
          </div>
          <DynamicConnectButton
            buttonContainerClassName="w-full"
            buttonClassName="2xl:text-xl text-lg h-12 2xl:h-14 w-full font-semibold rounded-lg bg-subsidiary hover:bg-white hover:text-subsidiary text-white"
          >
            Log in
          </DynamicConnectButton>
        </Card>
        <p className="2xl:text-2xl text-xl font-semibold">
          Hosting an event?{" "}
          <span
            className="text-subsidiary underline hover:text-white cursor-pointer"
            onClick={() => router.push("/organizer-login")}
          >
            Log in here
          </span>
        </p>
      </div>
    </div>
  );
};

export default AttendeeLogin;
