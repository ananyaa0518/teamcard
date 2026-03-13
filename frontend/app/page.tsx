"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import TeamSection from "@/components/TeamSection";

export default function Home() {
  const [showTeam, setShowTeam] = useState(false);

  return (
    <main className="relative bg-black min-h-screen">
      <div className="absolute inset-x-0 top-4 md:top-8 z-50">
        <div className="relative flex items-center justify-center px-4 md:px-8">
          <div className="absolute left-4 md:left-8">
            <Image
              src="/Logo.webp"
              alt="TeamCard logo"
              width={132}
              height={52}
              priority
              className="h-auto w-25 md:w-33"
            />
          </div>

          <h2
            className="text-3xl md:text-5xl font-medium text-[#D4A84A] tracking-wide"
            style={{ fontFamily: "'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Meet Our Team
          </h2>
        </div>
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