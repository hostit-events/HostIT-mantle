"use client";

import React from "react";
import { MdExplore } from "react-icons/md";
import { HiTicket } from "react-icons/hi2";
import { IoIosCreate } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { IoMdAnalytics } from "react-icons/io";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import LoginRequiredDialog from "@/components/shared-components/LoginRequiredDialog";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setShowDynamicUserProfile, handleLogOut } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();

  const isActive = (route: string) => pathname.includes(route.replace("/", ""));
  const isOrganizer = isActive("/dashboard/organizer");
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [roleHint, setRoleHint] = React.useState<"attendee" | "organizer" | "any">("any");

  const renderIcon = (
    icon: React.ReactNode,
    label: string,
    route: string,
    fallback: string = "/",
    requiresAuth: boolean = false,
    hint: "attendee" | "organizer" | "any" = "any",
    onClickOverride?: () => void
  ) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`${
            isActive(route) ? "bg-subsidiary" : ""
          } hover:bg-subsidiary flex justify-center items-center rounded-full h-10 w-10 md:h-10 md:w-10 lg:h-14 lg:w-14 cursor-pointer`}
          onClick={() => {
            if (onClickOverride) {
              onClickOverride();
              return;
            }
            if (requiresAuth && !isActive("/dashboard")) {
              setRoleHint(hint);
              setLoginOpen(true);
              return;
            }
            router.push(isActive("/dashboard") ? route : fallback);
          }}
        >
          {icon}
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" align="center" className="ml-2">
        {label}
      </TooltipContent>
    </Tooltip>
  );

  return (
    <TooltipProvider delayDuration={200}>
      {/* Left Sidebar (Desktop & Tablets) */}
      <div className="hidden md:flex fixed top-[12vh] left-0 w-[10%] lg:w-[7%] h-[88vh] flex-col items-center justify-between pt-12 pb-20 z-50">
        <div className="flex flex-col gap-5 items-center">
          <div className="border-subsidiary border rounded-full flex flex-col justify-center items-center gap-5 py-4 w-12 xl:w-16">
            {isOrganizer ? (
              <>
                {renderIcon(
                  <IoIosCreate className="w-6 h-6 sm:w-7 sm:h-7" color="#FFF" />,
                  "Create Event",
                  "/dashboard/organizer/create-event",
                  "/organizer-login",
                  true,
                  "organizer"
                )}
                {renderIcon(
                  <IoMdAnalytics className="w-6 h-6 sm:w-7 sm:h-7" color="#FFF" />,
                  "Analytics",
                  "/dashboard/organizer/event-analytics"
                )}
                {renderIcon(
                  <MdExplore className="w-6 h-6 sm:w-7 sm:h-7" color="#FFF" />,
                  "Explore",
                  "/explore"
                )}
              </>
            ) : (
              <>
                {renderIcon(
                  <MdExplore className="w-6 h-6 sm:w-7 sm:h-7" color="#FFF" />,
                  "Explore",
                  "/dashboard/attendee/explore",
                  "/explore"
                )}
                {renderIcon(
                  <HiTicket className="w-6 h-6 sm:w-7 sm:h-7" color="#FFF" />,
                  "My Events",
                  "/dashboard/attendee/my-events",
                  "/attendee-login",
                  true,
                  "attendee"
                )}
                {renderIcon(
                  <IoIosCreate className="w-6 h-6 sm:w-7 sm:h-7" color="#FFF" />,
                  "Create Event",
                  "/dashboard/organizer/create-event",
                  "/organizer-login",
                  true,
                  "organizer"
                )}
              </>
            )}
          </div>

          {/* User (only when logged in) */}
          {isLoggedIn && (
            renderIcon(
              <FaUserAlt className="w-6 h-6 sm:w-7 sm:h-7" color="#FFF" />, 
              "Profile", 
              "#", 
              "#", 
              false, 
              "any", 
              () => setShowDynamicUserProfile(true)
            )
          )}
        </div>

        {/* Logout (only when logged in) */}
        {isLoggedIn && (
          renderIcon(
            <IoLogOut className="w-6 h-6 sm:w-7 sm:h-7" color="#FFF" />, 
            "Logout", 
            "/", 
            "/", 
            false, 
            "any", 
            () => handleLogOut()
          )
        )}
      </div>

      {/* Bottom Navbar (Mobile Only) */}
      <div className="fixed bottom-0 md:hidden w-full bg-principal z-50 py-2 px-4 flex justify-between items-center shadow-md">
        {isOrganizer ? (
          
          <>
            {renderIcon(
              <IoIosCreate className="w-6 h-6" color="#FFF" />,
              "Create Event",
              "/dashboard/organizer/create-event",
              "/organizer-login",
              true,
              "organizer"
            )}
            {renderIcon(
              <IoMdAnalytics className="w-6 h-6" color="#FFF" />,
              "Analytics",
              "/dashboard/organizer/event-analytics"
            )}
            {renderIcon(
              <MdExplore className="w-6 h-6" color="#FFF" />,
              "Explore",
              "/explore"
            )}
          </>
        ) : (
          <>
            {renderIcon(
              <MdExplore className="w-6 h-6" color="#FFF" />,
              "Explore",
              "/dashboard/attendee/explore",
              "/explore"
            )}
            {renderIcon(
              <HiTicket className="w-6 h-6" color="#FFF" />,
              "My Events",
              "/dashboard/attendee/my-events",
              "/attendee-login",
              true,
              "attendee"
            )}
            {renderIcon(
              <IoIosCreate className="w-6 h-6" color="#FFF" />,
              "Create Event",
              "/dashboard/organizer/create-event",
              "/organizer-login",
              true,
              "organizer"
            )}
          </>
        )}
        {isLoggedIn && renderIcon(<FaUserAlt className="w-6 h-6" color="#FFF" />, "Profile", "#", "#", false, "any", () => setShowDynamicUserProfile(true))}
        {isLoggedIn && renderIcon(<IoLogOut className="w-6 h-6" color="#FFF" />, "Logout", "/", "/", false, "any", () => handleLogOut())}
      </div>
      <LoginRequiredDialog open={loginOpen} onOpenChange={setLoginOpen} roleHint={roleHint} />
    </TooltipProvider>
  );
};

export default Sidebar;
