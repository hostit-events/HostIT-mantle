"use client";

import EventCard from "@/components/dashboard/EventCard";
import React, { useEffect, useState } from "react";
import Pagination from "../../../components/dashboard/Pagination";
import { toast } from "sonner";
import Link from "next/link";
import { MdEventBusy } from "react-icons/md";
import { BsStars } from "react-icons/bs";

type Props = {};

const Page = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(6);

  useEffect(() => {
    const checkScreenSize = () => {
      const is2XLScreen = window.innerWidth >= 1536;
      const isSM = window.innerWidth < 768;
      setEventsPerPage(is2XLScreen ? 8 : isSM ? 2 : 6);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newTotalPages = Math.ceil(events.length / eventsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [eventsPerPage, events.length, currentPage]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data.events ?? []);
      } catch (err: any) {
        toast.error(err.message || "Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pb-16 relative min-h-[82vh]">
      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <span className="text-white/70">Loading events...</span>
        </div>
      ) : events.length === 0 ? (
        <div className="flex items-center justify-center px-4 sm:px-6 md:px-8 2xl:px-12">
          <div className="text-center max-w-md">
            <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-[#131939] border border-subsidiary flex items-center justify-center shadow-[0_0_40px_#131939]">
              <MdEventBusy size={38} className="text-white" />
            </div>
            <h2 className="text-white text-2xl font-semibold Aeonik-bold flex items-center justify-center gap-2">
              No events available <BsStars className="text-indigo-300" />
            </h2>
            <p className="text-white/70 text-sm mt-2">Login to create your event.</p>
            <div className="mt-6 flex justify-center">
              <Link href="/organizer-login" className="inline-flex">
                <button className="px-4 py-2 rounded-full border border-white text-white font-medium hover:bg-white/10 transition">
                  Organizer login
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 2xl:px-12 justify-center">
            {currentEvents.map((event) => (
              <div
                key={event._id ?? event.id}
                className="w-full sm:w-[48%] md:w-[30%] 2xl:w-[23%] mb-6"
              >
                <EventCard
                  isFree={event.isFree}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  name={event.name}
                  description={event.description}
                  id={event._id ?? event.id}
                  image={event.image && !String(event.image).startsWith("http")
                    ? `https://ipfs.io/ipfs/${event.image}`
                    : event.image}
                />
              </div>
            ))}
          </div>

          {/* Pagination, only show when multiple pages */}
          {totalPages > 1 && (
            <div className="md:absolute md:bottom-4 flex justify-center right-4 sm:right-6 md:right-8 2xl:right-12 mb-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
