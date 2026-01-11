import React from "react";
import { Button } from "../ui/button";

type Props = {
  isFree?: boolean;
  isOrganizer?: boolean;
};

const MerchCard = ({ isFree, isOrganizer}: Props) => {

  return (
    <div className="border border-subsidiary bg-subsidiary w-full rounded-[20px] h-[420px] my-2 relative group overflow-hidden hover:cursor-pointer">
      <div className="absolute top-4 right-4 px-4 py-1 rounded-full font-semibold text-base z-1 border-2 border-white bg-[#13193980] text-white">
        {isFree ? "Free" : "Paid"}
      </div>

      {/* Image that disappears on hover */}
      <div className="w-full h-[80%] transition-opacity duration-500 ease-in-out group-hover:opacity-0">
        <img
          src="/event-image.png"
          alt="event image"
          className="w-full rounded-t-[20px] h-full rounded-bl-[80px] object-cover"
        />
      </div>

      {/* Event details that appear on hover */}
      <div
        className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-subsidiary rounded-t-[20px] rounded-bl-[80px] opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
      >
        <div className="flex flex-col justify-center items-center">
          <p className="text-white text-4xl font-bold">Hoodie</p>
          <p className="text-white text-lg font-medium mt-2 flex items-center gap-2">
            S <span className="text-3xl">|</span> M{" "}
            <span className="text-3xl">|</span> L{" "}
            <span className="text-3xl">|</span> XL{" "}
            <span className="text-3xl">|</span> XXL
          </p>
        </div>
        <div className="flex flex-col gap-1 mt-20 items-center justify-center">
            <p className="text-white text-2xl font-semibold">Total: 200</p>
            <p className="text-white text-sm">Available: 100</p>
        </div>
        {!isOrganizer ?
        <Button className="w-4/5 border border-white mt-8 bg-transparent cursor-pointer mx-auto text-xl py-6 z-50 hover:bg-transparent hover:opacity-60">Get</Button>: ""}
      </div>

      <div className="px-8 py-4 flex flex-col gap-3 transition-opacity duration-500 ease-in-out group-hover:opacity-0">
        <h1 className="text-2xl font-semibold text-white Aeonik-bold line-clamp-1">
          Face Cap
        </h1>
      </div>
    </div>
  );
};

export default MerchCard;
