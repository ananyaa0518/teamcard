"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type TeamMember = {
    name: string;
    role: string;
    linkedin: string;
    github: string;
    email: string;
    quote: string;
    image: string;
};

export type CompanyData = {
    name?: string;
    tagline?: string;
    team: TeamMember[];
};

export default function TeamSection() {
    const [companyData, setCompanyData] = useState<CompanyData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/team");
                if (!response.ok) {
                    throw new Error("Failed to fetch team data");
                }
                const data = await response.json();
                setCompanyData(data.company);
            } catch (error) {
                console.error("Error fetching team data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeam();
    }, []);

    // Auto-cycle the top 2 featured cards every 5 seconds
    useEffect(() => {
        if (!companyData?.team || companyData.team.length <= 2) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 2) % companyData.team.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [companyData]);

    if (isLoading) {
        return (
            <section className="min-h-screen bg-[#000000] text-white pt-24 pb-32 px-6 md:px-12 relative overflow-hidden flex items-center justify-center">
                <motion.div
                    className="h-8 w-8 rounded-full border-2 border-[#D4A84A] border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
            </section>
        );
    }

    if (!companyData?.team) return null;

    // Get the current 2 featured members
    const featuredMembers = [
        companyData.team[currentIndex % companyData.team.length],
        companyData.team[(currentIndex + 1) % companyData.team.length]
    ];

    // For the marquee, we can just use the whole team array and duplicate it to ensure a smooth infinite scroll
    const marqueeMembers = [...companyData.team, ...companyData.team];

    return (
        <section className="min-h-screen bg-[#000000] text-white pt-12 pb-6 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Ambient Background Glow matching the dark theme */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full -z-10 bg-[radial-gradient(ellipse_at_top,rgba(212,168,74,0.08),transparent_70%)] opacity-80" />

            <div className="w-full max-w-6xl px-6 md:px-12">

                {/* Top Section: 2 Large Auto-Cycling Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4">
                    <AnimatePresence mode="popLayout">
                        {featuredMembers.map((member, i) => (
                            <motion.div
                                key={`${member.name}-${currentIndex}-${i}`} // Force re-render/animation on index change
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="group relative flex flex-col justify-end rounded-3xl bg-[#0B0B0B] border border-[rgba(212,168,74,0.15)] shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden h-[240px] md:h-[280px]"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                                    />
                                    {/* Gradient overlay for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                                </div>

                                <div className="relative z-10 p-4 md:p-5 flex flex-col h-full justify-end">
                                    <div>
                                        <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                                            {member.name}
                                        </h3>
                                        <p className="text-[10px] font-bold tracking-[0.15em] text-[#D4A84A] uppercase mb-2">{member.role}</p>
                                    </div>
                                    <div className="relative max-w-lg mb-2">
                                        <span className="absolute -top-4 -left-3 text-4xl text-[#D4A84A]/30 font-serif">"</span>
                                        <p className="text-white/90 text-[14px] md:text-[16px] italic leading-relaxed pl-4 border-l-2 border-[#D4A84A]/50 relative z-10" style={{ fontFamily: "'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                                            {member.quote}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-white/10 flex items-center gap-6">
                                        <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors text-sm font-medium tracking-wide">LinkedIn</a>
                                        <a href={member.github} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors text-sm font-medium tracking-wide">GitHub</a>
                                        <a href={`mailto:${member.email}`} className="text-white/60 hover:text-white transition-colors text-sm font-medium tracking-wide ml-auto">Contact</a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Section: Infinite Marquee of Small Cards */}
            <div className="w-full relative py-0 mt-2">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <div className="flex overflow-hidden group">
                    <motion.div
                        className="flex gap-6 px-3"
                        style={{ width: "max-content" }}
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                    >
                        {marqueeMembers.map((member, index) => (
                            <div
                                key={`marquee-${index}`}
                                className="flex-shrink-0 w-[140px] h-[170px] rounded-2xl bg-[#0B0B0B] border border-white/5 overflow-hidden relative group/card cursor-pointer"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
                                    <h4 className="text-base font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{member.name}</h4>
                                    <p className="text-[9px] font-bold tracking-[0.1em] text-[#D4A84A] uppercase">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

        </section>
    );
}
