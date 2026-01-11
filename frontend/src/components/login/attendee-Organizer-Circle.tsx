import { ArrowUpRight } from 'lucide-react';
import React from 'react';

type Props = {
  page: string;
};

const AttendeeOrganizerCircle = ({ page }: Props) => {
  // Create repeating text to ensure full circle coverage
  const circleText = `${page} ~ ${page} ~ ${page} ~ ${page} ~ `;
  
  return (
    <div className="relative w-60 h-60 z-50">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer border circle */}
        <circle cx="100" cy="100" r="50" fill="#131939" stroke="#007CFA" strokeWidth="3" />

        {/* Path for text to follow - positioned between outer circle (r=50) and inner circle (r=25) */}
        <path
          id="textCircle"
          d="M100,100 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
          fill="none"
          stroke="none"
        />

        {/* Circular text */}
        <text fill="#fff" fontSize="8" fontWeight="bold" letterSpacing="1">
          <textPath href="#textCircle" startOffset="0%">
            {circleText}
          </textPath>
        </text>

        {/* Inner icon background circle */}
        <circle cx="100" cy="100" r="20" fill="#007CFA" stroke="none" />

        {/* Center Icon */}
        <foreignObject x="88" y="88" width="24" height="24">
          <div
            className="h-full w-full flex items-center justify-center"
          >
            <ArrowUpRight size={14} color="#ffffff" strokeWidth={2} />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default AttendeeOrganizerCircle;