"use client";

import EventCard from "@/components/dashboard/EventCard";
import React, { useEffect, useState } from "react";
import Pagination from "../../../../components/dashboard/Pagination";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { toast } from "sonner";
import Link from "next/link";
import { MdEventBusy } from "react-icons/md";
import { BsStars } from "react-icons/bs";

type Props = {};

const Page = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(6);
  const [is2XL, setIs2XL] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;

      if (width >= 1536) {
        setIs2XL(true);
        setEventsPerPage(8);
      } else if (width < 640) {
        setEventsPerPage(2); // Phones
      } else if (width < 1024) {
        setEventsPerPage(4); // Tablets
      } else {
        setEventsPerPage(6); // Default desktops
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Recalculate current page when eventsPerPage changes
  useEffect(() => {
    const newTotalPages = Math.ceil(events.length / eventsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [eventsPerPage, events.length, currentPage]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        if (!isLoggedIn) {
          setLoading(false);
          return;
        }
        const email: string | null =
          (user as any)?.email || (user as any)?.primaryEmail || null;
        if (!email) {
          setLoading(false);
          return;
        }

        const regRes = await fetch(`/api/registration/${encodeURIComponent(email)}`, { cache: "no-store" });
        if (!regRes.ok) throw new Error("Failed to fetch registrations");
        const regData = await regRes.json();
        const registrations: any[] = regData.registrations ?? [];

        const eventFetches = registrations.map(async (r) => {
          try {
            const eRes = await fetch(`/api/events/${r.eventId}`, { cache: "no-store" });
            if (!eRes.ok) return null;
            return await eRes.json();
          } catch {
            return null;
          }
        });

        const results = await Promise.all(eventFetches);
        setEvents(results.filter(Boolean));
      } catch (err: any) {
        toast.error(err.message || "Failed to load your events");
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [isLoggedIn, user]);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  // Get current events to display
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (!loading && events.length === 0) {
    return (
      <div className="pb-24 relative min-h-[82vh] px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-16 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-[#131939] border border-subsidiary flex items-center justify-center shadow-[0_0_40px_#131939]">
            <MdEventBusy size={38} className="text-white" />
          </div>
          <h2 className="text-white text-2xl font-semibold Aeonik-bold flex items-center justify-center gap-2">
            {isLoggedIn ? "No events yet" : "No events available"} <BsStars className="text-indigo-300" />
          </h2>
          <p className="text-white/70 text-sm mt-2">
            {isLoggedIn ? "You don’t have any tickets or created events yet." : "Login to create your event."}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/dashboard/organizer/create-event" className="inline-flex">
              <button className="px-4 py-2 rounded-full bg-white text-black font-medium hover:opacity-90 transition">
                Create an event
              </button>
            </Link>
            {isLoggedIn ? (
              <Link href="/dashboard/attendee/explore" className="inline-flex">
                <button className="px-4 py-2 rounded-full border border-white text-white font-medium hover:bg-white/10 transition">
                  Explore events
                </button>
              </Link>
            ) : (
              <Link href="/organizer-login" className="inline-flex">
                <button className="px-4 py-2 rounded-full border border-white text-white font-medium hover:bg-white/10 transition">
                  Organizer login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="pb-24 relative min-h-[82vh] px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-16">
      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mb-3">
        {currentEvents.map((event) => (
          <EventCard
            key={event._id ?? event.id}
            id={event._id ?? event.id}
            name={event.name}
            description={event.description}
            location={event.location}
            image={event.image}
          />
        ))}
      </div>

      {/* Responsive Pagination */}
      {totalPages > 1 && (
        <div className="md:absolute md:bottom-4 w-full flex justify-center pr-4 md:pr-8 2xl:pr-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
