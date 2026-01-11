"use client";

import FeaturesSection from "@/components/landing-page/FeaturesSection";
import HeroSection from "@/components/landing-page/HeroSection";
import ReviewSection from "@/components/landing-page/ReviewSection";
import ScrollSection from "@/components/landing-page/ScrollSection";
import Footer from "@/components/shared-components/Footer";
import Header from "@/components/shared-components/Header";
import { motion } from "framer-motion";
import React from "react";

const page = () => {
  return (
    <div className="mx-auto space-y-8">
      <Header />
      <HeroSection />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="flex md:hidden"
      >
        <img
          src={"/mobile-hostitgif.gif"}
          alt="hostit-gif"
          className="shadow-2xl"
        />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="max-w-[1280px] mx-auto hidden md:flex"
      >
        <img
          src={"/hostitgif.gif"}
          alt="hostit-gif"
          className="mr-10 clip-path shadow-2xl"
          style={{
            clipPath: "inset(30px 0px 60px 70px)",
          }}
        />
      </motion.div>
      <FeaturesSection />
      <ReviewSection />
      <ScrollSection />
      <Footer />
    </div>
  );
};

export default page;