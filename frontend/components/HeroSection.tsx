"use client";

import {
    AnimatePresence,
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { useMemo, useState, useRef } from "react";

const CARD_IMAGES = [
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80",
    "https://images.unsplash.com/photo-1528701800489-20be3c30c1d5?w=900&q=80",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=900&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4c?w=900&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4c?w=900&q=80",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=80",
    "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=900&q=80",
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&q=80",
];

type Card = {
    id: string;
    image: string;
};

export default function HeroSection() {
    const initialCards: Card[] = useMemo(
        () =>
            CARD_IMAGES.map((image, index) => ({
                id: `card-${index}`,
                image,
            })),
        []
    );

    const [cards, setCards] = useState<Card[]>(initialCards);
    const [isDispersing, setIsDispersing] = useState(false);

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
    const boxShadow = useMotionTemplate`0 ${shadowSpread}px ${shadowBlur}px rgba(120, 60, 120, 0.40)`;

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
    }

    function handleExitComplete() {
        if (isDispersing) {
            setTimeout(() => {
                setCards(initialCards);
                setIsDispersing(false);
            }, 300);
        }
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
                background: "linear-gradient(160deg, #f9caca 0%, #f6b6b6 40%, #e7a4a6 100%)",
            }}
        >
            {/* Soft blobs */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(255,200,210,0.8) 0%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />
                <div
                    className="absolute -right-40 bottom-[-120px] h-[460px] w-[460px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(230,150,170,0.65) 0%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
            </div>

            {/* Grain overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Background heading */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <h1
                    className="select-none text-center"
                    style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "clamp(64px, 11vw, 168px)",
                        fontWeight: 900,
                        color: "rgba(255,255,255,0.22)",
                        letterSpacing: "-0.04em",
                        lineHeight: 0.9,
                        textShadow: "0 26px 80px rgba(180,100,120,0.32)",
                        whiteSpace: "nowrap",
                    }}
                >
                    Take a Spin
                </h1>
            </div>

            {/* Center stack */}
            <div className="relative z-20 flex flex-col items-center gap-6">
                <div className="mb-4 text-xs font-semibold tracking-[0.35em] text-white/70 uppercase">
                    Curated looks, one swipe away
                </div>

                <motion.div
                    ref={stackRef}
                    className="relative w-[260px] sm:w-[280px] md:w-[320px] h-[440px]"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() => isHoveredTop.set(1)}
                    style={{ perspective: 1200 }}
                >
                    <AnimatePresence mode="popLayout" onExitComplete={handleExitComplete}>
                        {cards.map((card, index) => {
                            const isTop = index === 0;
                            const offset = Math.min(index, 9);
                            const yOffset = offset * 10;
                            const scale = 1 - offset * 0.03;
                            const baseOpacity = isTop ? 1 : Math.max(0.3, 0.7 - offset * 0.08);

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
                                        boxShadow: isTop ? boxShadow : "0 20px 60px rgba(170,90,120,0.45)",
                                        borderRadius: 80,
                                        transformStyle: "preserve-3d",
                                        willChange: "transform",
                                    }}
                                    initial={
                                        index === 0
                                            ? { opacity: 0, y: 40, scale: 0.9, x: 0, rotateZ: 0 }
                                            : { opacity: 0, y: yOffset + 30, scale: scale * 0.94, x: 0, rotateZ: 0 }
                                    }
                                    animate={{
                                        y: yOffset,
                                        scale,
                                        opacity: baseOpacity,
                                        x: 0,
                                        rotateZ: 0,
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
                                            borderRadius: 80,
                                            background: "linear-gradient(145deg, rgba(255,255,255,0.35), rgba(255,255,255,0.18))",
                                            border: "1px solid rgba(255,255,255,0.45)",
                                            backdropFilter: "blur(24px)",
                                        }}
                                    >
                                        {/* Parallax image */}
                                        <motion.img
                                            src={card.image}
                                            alt="Curated fashion look"
                                            className="absolute inset-0 h-full w-full object-cover object-top"
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

                                        {/* Top gradient */}
                                        <div
                                            className="pointer-events-none absolute inset-0"
                                            style={{
                                                background:
                                                    "linear-gradient(to bottom, rgba(255,255,255,0.55), transparent 45%, rgba(10,7,15,0.6) 100%)",
                                            }}
                                        />

                                        {/* Subtle content at bottom */}
                                        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 text-[11px] font-medium tracking-[0.22em] text-white/80 uppercase">
                                            <div className="rounded-full border border-white/30 bg-white/10 px-4 py-1 backdrop-blur-sm">
                                                Next Look
                                            </div>
                                            <div className="text-[10px] font-normal tracking-[0.32em] text-white/70">
                                                Tap to shuffle the deck
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                <p
                    className="max-w-xs text-center text-[13px] leading-relaxed text-white/80"
                    style={{ fontFamily: "'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
                >
                    An interactive stack of curated outfits—tap the top card to spin the deck and discover the next look.
                </p>
            </div>
        </section>
    );
}
