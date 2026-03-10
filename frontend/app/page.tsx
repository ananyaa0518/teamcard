"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import TeamSection from "@/components/TeamSection";

export default function Home() {
  const [showTeam, setShowTeam] = useState(false);

  return (
    <main className="relative bg-black min-h-screen">
      {/* Global Logo - Recreated precisely from the reference image without stretching */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-50 flex items-end">
        {/* Letter 'a' */}
        <div className="relative w-12 h-12 border-[8px] border-white rounded-full bg-transparent flex items-center justify-center">
          {/* The right vertical stem of the 'a' */}
          <div className="absolute right-[-8px] top-[-8px] h-12 w-3 bg-white" />
          {/* The small gaps inside the 'a' loop */}
          <div className="absolute left-[-10px] top-[14px] w-4 h-[6px] bg-black" />
          <div className="absolute right-[-10px] top-[14px] w-4 h-[6px] bg-black" />
          <div className="absolute bottom-[-10px] left-[14px] w-[6px] h-4 bg-black" />
        </div>

        {/* Letter 'm' */}
        <div className="flex ml-[-4px]">
          {/* First arch of 'm' */}
          <div className="relative w-10 h-10 border-t-[8px] border-l-[8px] border-r-[8px] border-white rounded-tl-full rounded-tr-full bg-transparent flex items-end mb-[-4px]">
            {/* Gap cuts */}
            <div className="absolute left-[-10px] top-[14px] w-4 h-[6px] bg-black" />
            <div className="absolute right-[-10px] top-[14px] w-4 h-[6px] bg-black" />
          </div>
          {/* Second arch of 'm' */}
          <div className="relative w-10 h-10 border-t-[8px] border-l-[8px] border-r-[8px] border-white rounded-tl-full rounded-tr-full bg-transparent flex items-end mb-[-4px] ml-[-8px]">
            {/* Gap cuts */}
            <div className="absolute left-[-10px] top-[14px] w-4 h-[6px] bg-black" />
            <div className="absolute right-[-10px] top-[14px] w-4 h-[6px] bg-black" />
          </div>
        </div>
      </div>

      {/* Global Header */}
      <div className="absolute top-10 w-full flex justify-center z-40 pointer-events-none">
        <h2
          className="text-3xl md:text-5xl font-medium text-[#D4A84A] tracking-wide pointer-events-auto"
          style={{ fontFamily: "'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Meet Our Team
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {!showTeam ? (
          <motion.div
            key="hero"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          >
            <HeroSection onTransitionComplete={() => setShowTeam(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="team"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } }}
          >
            <TeamSection />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}