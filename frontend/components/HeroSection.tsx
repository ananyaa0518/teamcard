"use client";

import {
    AnimatePresence,
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fetchTeamMembers } from "@/lib/api";
import type { TeamMember } from "@/types/teams";

type Card = {
    id: string;
    image: string;
    name: string;
    role: string;
};

interface HeroSectionProps {
    onTransitionComplete?: () => void;
}

export default function HeroSection({ onTransitionComplete }: HeroSectionProps) {
    const [cards, setCards] = useState<Card[]>([]);
    const [isDispersing, setIsDispersing] = useState(false);
    const hasTriggeredTransitionRef = useRef(false);
    const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const loadHeroCards = async () => {
            try {
                const members = await fetchTeamMembers();
                if (!members.length) return;

                const mappedCards: Card[] = members
                    .filter((member: TeamMember) => Boolean(member.photo_url))
                    .map((member: TeamMember) => ({
                        id: member.id,
                        image: member.photo_url,
                        name: member.name,
                        role: member.role,
                    }));

                setCards(mappedCards);
            } catch (err) {
                console.error("Failed to fetch hero team cards:", err);
            }
        };

        loadHeroCards();
    }, []);

    const stackRef = useRef<HTMLDivElement | null>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const isHoveredTop = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
        stiffness: 160,
        damping: 18,
        mass: 0.7,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
        stiffness: 160,
        damping: 18,
        mass: 0.7,
    });

    const imageX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), {
        stiffness: 140,
        damping: 20,
    });
    const imageY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), {
        stiffness: 140,
        damping: 20,
    });

    const shadowSpread = useTransform(isHoveredTop, [0, 1], [18, 40]);
    const shadowBlur = useTransform(isHoveredTop, [0, 1], [40, 90]);
    const boxShadow = useMotionTemplate`0 ${shadowSpread}px ${shadowBlur}px rgba(212, 168, 74, 0.15)`;

    useEffect(() => {
        return () => {
            if (transitionTimerRef.current) {
                clearTimeout(transitionTimerRef.current);
            }
        };
    }, []);

    function triggerTransitionOnce() {
        if (hasTriggeredTransitionRef.current) return;
        hasTriggeredTransitionRef.current = true;
        onTransitionComplete?.();
    }

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!stackRef.current) return;
        const rect = stackRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
        isHoveredTop.set(0);
    }

    function handleTopCardClick() {
        if (isDispersing || cards.length === 0) return;
        setIsDispersing(true);
        setCards([]); // Trigger exit for all

        // Start next section at 2s without changing disperse animation timings.
        transitionTimerRef.current = setTimeout(() => {
            triggerTransitionOnce();
        }, 2000);
    }

    function handleExitComplete() {
        // Fallback: if exit completes before 2s timer or timer didn't run, continue.
        if (cards.length === 0 && onTransitionComplete) {
            triggerTransitionOnce();
        }
        // Remove the setTimeout that resets the cards, so they don't pop back up
    }

    const getExitAnimation = (index: number) => {
        if (index === 0) {
            return {
                x: [0, -200, -400],
                y: [0, 10, 20],
                scale: [1, 0.95, 0.9],
                opacity: [1, 0.8, 0],
                rotateZ: [0, -2, -4],
                transition: {
                    duration: 0.6,
                    ease: [0.32, 0.72, 0, 1] as const,
                    times: [0, 0.5, 1]
                }
            };
        }

        const directions = [
            { midX: -80, midY: -100, finalX: -200, finalY: -250, rotateZ: -3 },
            { midX: 80, midY: -100, finalX: 200, finalY: -250, rotateZ: 3 },
            { midX: -100, midY: 100, finalX: -250, finalY: 250, rotateZ: -4 },
            { midX: 100, midY: 100, finalX: 250, finalY: 250, rotateZ: 4 },
            { midX: -150, midY: -30, finalX: -350, finalY: -80, rotateZ: -2 },
            { midX: 150, midY: 30, finalX: 350, finalY: 80, rotateZ: 2 },
            { midX: 100, midY: -150, finalX: 200, finalY: -300, rotateZ: 3 },
            { midX: -100, midY: 150, finalX: -200, finalY: 300, rotateZ: -3 },
            { midX: 0, midY: 150, finalX: -50, finalY: 350, rotateZ: -2 },
        ];

        const dir = directions[(index - 1) % directions.length];

        const offset = Math.min(index, 9);
        const yOffset = offset * 10;
        const scale = 1 - offset * 0.03;
        const baseOpacity = Math.max(0.3, 0.7 - offset * 0.08);

        return {
            x: [0, dir.midX, dir.finalX],
            y: [yOffset, dir.midY + yOffset, dir.finalY + yOffset],
            scale: [scale, scale * 0.95, scale * 0.9],
            opacity: [baseOpacity, baseOpacity * 0.8, 0],
            rotateZ: [0, dir.rotateZ, dir.rotateZ * 1.5],
            transition: {
                duration: 1.0,
                ease: "easeInOut" as const,
                delay: 0.15 + (index * 0.1),
                times: [0, 0.5, 1]
            }
        };
    };

    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
            style={{
                backgroundColor: "#000000",
            }}
        >
            {/* Cinematic edge shine */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="absolute"
                    style={{
                        left: "-10%",
                        top: "12%",
                        width: "34vw",
                        maxWidth: "460px",
                        height: "76vh",
                        borderRadius: "999px",
                        background:
                            "radial-gradient(ellipse at center, rgba(240, 175, 45, 0.32) 0%, rgba(116, 158, 72, 0.2) 42%, rgba(0, 0, 0, 0) 75%)",
                        filter: "blur(60px)",
                        opacity: 0.78,
                    }}
                />
                <div
                    className="absolute"
                    style={{
                        right: "-8%",
                        top: "10%",
                        width: "32vw",
                        maxWidth: "440px",
                        height: "78vh",
                        borderRadius: "999px",
                        background:
                            "radial-gradient(ellipse at center, rgba(243, 176, 43, 0.3) 0%, rgba(106, 154, 72, 0.18) 44%, rgba(0, 0, 0, 0) 78%)",
                        filter: "blur(62px)",
                        opacity: 0.72,
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, rgba(255, 214, 120, 0.08) 0%, rgba(0, 0, 0, 0) 58%), radial-gradient(ellipse at bottom, rgba(227, 170, 56, 0.1) 0%, rgba(0, 0, 0, 0) 62%)",
                    }}
                />
            </div>

            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(0, 0, 0, 0) 46%, rgba(0, 0, 0, 0.32) 100%)",
                }}
            />

            {/* Grain overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-screen"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Center stack */}
            <div className="relative z-20 flex flex-col items-center pt-[100px] md:pt-[120px]">

                <motion.div
                    ref={stackRef}
                    className="relative w-[280px] sm:w-[320px] md:w-[380px] h-[280px] sm:h-[320px] md:h-[380px]"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() => isHoveredTop.set(1)}
                    style={{ perspective: 1200 }}
                >
                    <AnimatePresence mode="popLayout" onExitComplete={handleExitComplete}>
                        {cards.map((card, index) => {
                            const isTop = index === 0;
                            const offset = Math.min(index, 9);
                            // Set yOffset to 0 so cards only peek out via right/left rotation
                            const yOffset = 0;
                            const scale = 1 - offset * 0.03;
                            // Fade out cards sharply so only the first 3-4 are visibly stacked
                            const baseOpacity = isTop ? 1 : Math.max(0, 0.9 - offset * 0.25);
                            const baseRotateZ = isTop ? 0 : (index % 2 === 1 ? -4 : 4);

                            return (
                                <motion.div
                                    key={card.id}
                                    layout
                                    className="absolute inset-0 mx-auto"
                                    style={{
                                        originY: 1,
                                        y: yOffset,
                                        scale,
                                        zIndex: 100 - index,
                                        pointerEvents: isTop ? "auto" : "none",
                                        rotateX: isTop ? rotateX : 0,
                                        rotateY: isTop ? rotateY : 0,
                                        boxShadow: isTop ? boxShadow : "0 20px 60px rgba(0,0,0,0.8)",
                                        borderRadius: 24,
                                        transformStyle: "preserve-3d",
                                        willChange: "transform",
                                    }}
                                    initial={
                                        index === 0
                                            ? { opacity: 0, y: 40, scale: 0.9, x: 0, rotateZ: 0 }
                                            : { opacity: 0, y: yOffset + 30, scale: scale * 0.94, x: 0, rotateZ: baseRotateZ }
                                    }
                                    animate={{
                                        y: yOffset,
                                        scale,
                                        opacity: baseOpacity,
                                        x: 0,
                                        rotateZ: baseRotateZ,
                                    }}
                                    exit={getExitAnimation(index)}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.32, 0.72, 0, 1]
                                    }}
                                    whileHover={
                                        isTop
                                            ? {
                                                y: yOffset - 4,
                                                scale: scale + 0.01,
                                            }
                                            : undefined
                                    }
                                    onClick={() => {
                                        if (isTop) {
                                            handleTopCardClick();
                                        }
                                    }}
                                >
                                    <div
                                        className="relative h-full w-full overflow-hidden"
                                        style={{
                                            borderRadius: 24,
                                            backgroundColor: "#0B0B0B",
                                            border: "1px solid rgba(212, 168, 74, 0.3)",
                                            boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
                                        }}
                                    >
                                        {/* Parallax image */}
                                        <motion.img
                                            src={card.image}
                                            alt={card.name}
                                            className="absolute inset-0 h-full w-full object-cover object-top opacity-80 mix-blend-luminosity"
                                            style={{
                                                x: isTop ? imageX : 0,
                                                y: isTop ? imageY : 0,
                                                scale: isTop ? 1.08 : 1.03,
                                                transformOrigin: "center",
                                            }}
                                            initial={{ opacity: isTop ? 0.7 : 1 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                        />

                                        {/* Bottom text overlay (Name & Role) */}
                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                                            <div className="mb-1">
                                                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                                                    {card.name}
                                                </h3>
                                            </div>
                                            <p className="text-[11px] md:text-[12px] font-bold tracking-[0.15em] text-white/80 uppercase">
                                                {card.role}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>


            </div>
        </section>
    );
}
