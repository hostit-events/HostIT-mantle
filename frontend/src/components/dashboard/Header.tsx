"use client";
import React from "react";
import { IoFilter } from "react-icons/io5";
import { Button } from "../ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";
import { DynamicWidget, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

type Props = {};

const Header = (props: Props) => {
  const { id } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();

  const isActive = (route: string) => {
    return pathname.includes(route.replace("/", ""));
  };

  return (
    <div className="fixed top-0 w-full z-50 bg-principal h-[12%] flex items-center px-4 2xl:px-10">
      {/* Logo */}
      <div className="flex-shrink-0 flex items-center justify-center cursor-pointer">
        <img
          src="/dash-logo.png"
          alt="logo"
          className="w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-18 lg:w-16 lg:h-20"
        />
      </div>

      {/* Header Content */}
      <div className="flex-1 flex justify-between items-center ml-4 sm:ml-6">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent">
          Dashboard
        </h1>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {isLoggedIn ? (
            <div className="hidden md:flex">

              <DynamicWidget buttonContainerClassName="h-10 sm:h-11 md:h-12 lg:h-14 px-4 sm:px-6 md:w-36 lg:w-40" buttonClassName="w-full h-full" variant="modal" />
            </div>
          ) : (
            !isActive("/dashboard") && (
              <Button
                className="text-xs sm:text-sm md:text-base h-10 sm:h-11 md:h-12 lg:h-14 px-4 sm:px-6 md:w-36 lg:w-40 font-semibold rounded-lg bg-subsidiary hover:bg-white hover:text-subsidiary text-white"
                onClick={() => {
                  router.push("/attendee-login");
                }}
              >
                Log in
              </Button>
            )
          )}

          {/* Filter */}
          {!isActive(`${id}`) && (
            <div className="bg-subsidiary flex justify-center items-center rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 cursor-pointer">
              <IoFilter
                className="w-5 h-5 sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px]"
                color="#FFFFFF"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
