/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type TeamMember = {
    id: string;
    name: string;
    role: string;
    bio?: string;
    photo_url: string;
    linkedin_url?: string;
    email?: string;
    location?: string;
};

export default function TeamSection() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const fetchTeam = async () => {
            try {
                setError(null);
                setIsLoading(true);

                const baseUrl =
                    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
                const response = await fetch(`${baseUrl}/team`, {
                    signal: controller.signal,
                    cache: "no-store",
                });

                if (!response.ok) throw new Error("Failed to fetch team data");

                const data: TeamMember[] = await response.json();

                // Fetched only + de-duplicate by id
                const deduped = Array.isArray(data)
                    ? data.filter(
                          (m, idx, arr) => m?.id && arr.findIndex((x) => x.id === m.id) === idx
                      )
                    : [];

                setMembers(deduped);
                setCurrentIndex(0);
                setReady(true);
            } catch (err) {
                if ((err as Error).name === "AbortError") return;
                console.error("Error fetching team data:", err);
                setError("Unable to load team right now. Please try again in a moment.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeam();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        if (!ready || members.length <= 2) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 2) % members.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [members, ready]);

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

    if (!members.length && !isLoading) return null;

    const featuredMembers =
        members.length >= 2
            ? [members[currentIndex % members.length], members[(currentIndex + 1) % members.length]]
            : members;

    // Use fetched members only (no static/fallback/duplication list)
    const marqueeMembers = members;

    return (
        <section className="min-h-screen bg-[#000000] text-white pt-12 pb-6 relative overflow-hidden flex flex-col items-center justify-center">
            {error && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-red-600/80 text-xs md:text-sm">
                    {error}
                </div>
            )}

            {/* Ambient cinematic shine */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div
                    className="absolute"
                    style={{
                        left: "-12%",
                        top: "6%",
                        width: "34vw",
                        maxWidth: "460px",
                        height: "82vh",
                        borderRadius: "999px",
                        background:
                            "radial-gradient(ellipse at center, rgba(240, 175, 45, 0.28) 0%, rgba(108, 153, 70, 0.18) 40%, rgba(0, 0, 0, 0) 76%)",
                        filter: "blur(64px)",
                        opacity: 0.76,
                    }}
                />
                <div
                    className="absolute"
                    style={{
                        right: "-10%",
                        top: "8%",
                        width: "32vw",
                        maxWidth: "430px",
                        height: "80vh",
                        borderRadius: "999px",
                        background:
                            "radial-gradient(ellipse at center, rgba(243, 176, 43, 0.26) 0%, rgba(115, 159, 72, 0.16) 43%, rgba(0, 0, 0, 0) 77%)",
                        filter: "blur(66px)",
                        opacity: 0.72,
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at top, rgba(212, 168, 74, 0.12) 0%, rgba(0, 0, 0, 0) 58%), radial-gradient(ellipse at bottom, rgba(219, 164, 58, 0.12) 0%, rgba(0, 0, 0, 0) 62%)",
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(circle at center, rgba(0, 0, 0, 0) 48%, rgba(0, 0, 0, 0.3) 100%)",
                    }}
                />
            </div>

            <div className="w-full max-w-6xl px-6 md:px-12">

                {/* Top Section: 2 Large Auto-Cycling Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {ready &&
                            featuredMembers.map((member, i) => (
                                <motion.div
                                    key={`${member.id}-${currentIndex}-${i}`}
                                    initial={false}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="group relative flex flex-col justify-end rounded-3xl bg-[#0B0B0B] border border-[rgba(212,168,74,0.15)] shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden h-60 md:h-70"
                                >
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <Image
                                            src={member.photo_url}
                                            alt={member.name}
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                                        />
                                        {/* Gradient overlay for text readability */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
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
                                                {member.bio || "Part of the team shaping the future of fashion technology."}
                                            </p>
                                        </div>

                                        <div className="pt-3 border-t border-white/10 flex items-center gap-6">
                                            {member.linkedin_url && (
                                                <a
                                                    href={member.linkedin_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-white/60 hover:text-white transition-colors text-sm font-medium tracking-wide"
                                                >
                                                    LinkedIn
                                                </a>
                                            )}
                                            {member.email && (
                                                <a
                                                    href={`mailto:${member.email}`}
                                                    className="text-white/60 hover:text-white transition-colors text-sm font-medium tracking-wide ml-auto"
                                                >
                                                    Contact
                                                </a>
                                            )}
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
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />

                <div className="flex overflow-hidden group">
                    <motion.div
                        className="flex gap-6 px-3"
                        style={{ width: "max-content" }}
                        animate={ready ? { x: ["0%", "-50%"] } : { x: "0%" }}
                        transition={ready ? { repeat: Infinity, duration: 40, ease: "linear" } : undefined}
                    >
                        {[...marqueeMembers, ...marqueeMembers].map((member, idx) => (
                            <div
                                key={`marquee-${member.id}-${idx}`}
                                className="shrink-0 w-35 h-[42.5] rounded-2xl bg-[#0B0B0B] border border-white/5 overflow-hidden relative group/card cursor-pointer"
                            >
                                <Image
                                    src={member.photo_url}
                                    alt={member.name}
                                    fill
                                    className="object-cover opacity-70 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
                                    <h4 className="text-base font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{member.name}</h4>
                                    <p className="text-[9px] font-bold tracking-widest text-[#D4A84A] uppercase">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

        </section>
    );
}
