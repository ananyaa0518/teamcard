"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const MENTORS = [
    { id: 1, name: "Alice Johnson", role: "Lead Designer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80" },
    { id: 2, name: "Michael Chen", role: "AI Engineer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
    { id: 3, name: "Sarah Williams", role: "Product Manager", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80" },
    { id: 4, name: "David Kim", role: "Full Stack Dev", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80" },
    { id: 5, name: "Elena Rodriguez", role: "Creative Director", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80" },
    { id: 6, name: "James Wilson", role: "Frontend Lead", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80" },
    { id: 7, name: "Nina Patel", role: "UX Researcher", image: "https://images.unsplash.com/photo-1531123897727-8f129e1bfa82?w=600&q=80" },
    { id: 8, name: "Marcus Johnson", role: "Backend Engineer", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&q=80" },
    { id: 9, name: "Sophia Martinez", role: "Data Scientist", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80" },
    { id: 10, name: "Liam Thompson", role: "DevOps Engineer", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&q=80" },
];

export default function TeamGrid() {
    const [isStarted, setIsStarted] = useState(false);

    const handleStart = () => {
        setIsStarted(true);

        // Smoothly scroll to the next page section after the fall animation
        setTimeout(() => {
            const nextSection = document.getElementById("next-section");
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
            }
        }, 1200);
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
        falling: {
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 150, damping: 10 } as any,
        },
        falling: (i: number) => {
            const direction = i % 2 === 0 ? 1 : -1;
            const rotateEnd = direction * (3 + (i % 3) * 2);
            const rotateMiddle = direction * -2;
            const xDrift = direction * (10 + (i % 4) * 8);

            return {
                y: [0, -10, 900],
                x: [0, 0, xDrift],
                opacity: [1, 1, 0],
                rotateZ: [0, rotateMiddle, rotateEnd],
                transition: {
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                    mass: 0.9,
                    restSpeed: 1,
                } as any,
            };
        },
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden" style={{ background: "linear-gradient(160deg, #1a0a1e 0%, #0d0515 100%)" }}>

            {/* Background blobs for aesthetics */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-purple-600/20 blur-[100px]" />
                <div className="absolute bottom-[10%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-pink-600/20 blur-[100px]" />
            </div>

            <div className="relative z-20 text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Playfair_Display']">
                    Meet Our Mentors
                </h2>
                <motion.button
                    onClick={handleStart}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(124,58,237,0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-full text-white font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300"
                    style={{
                        background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                >
                    Get Started
                </motion.button>
            </div>

            <motion.div
                id="mentor-grid"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-[1400px] px-8 z-10"
                variants={containerVariants}
                initial="hidden"
                animate={isStarted ? "falling" : "visible"}
            >
                {MENTORS.map((mentor, index) => (
                    <motion.div
                        key={mentor.id}
                        variants={cardVariants}
                        custom={index}
                        className="origin-bottom"
                    >
                        <div className="relative h-72 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md flex flex-col justify-end group cursor-pointer shadow-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                            <img
                                src={mentor.image}
                                alt={mentor.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="relative z-20 p-5 transform transition-transform duration-300 group-hover:-translate-y-2">
                                <h3 className="text-white font-bold text-lg font-['Playfair_Display'] mb-1">{mentor.name}</h3>
                                <p className="text-white/70 text-xs font-['DM_Sans'] tracking-wide">{mentor.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
