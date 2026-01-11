"use client"

import OrganizerLogin from "@/components/login/organizer-login";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {};

const Page = (props: Props) => {

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        
          <motion.div
            key="organizer"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            <OrganizerLogin  />
          </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Page;