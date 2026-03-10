"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionTemplate } from "framer-motion";

const FASHION_IMAGES = [
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
];

export default function PillCard() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [currentImg, setCurrentImg] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const { scrollY } = useScroll();

    // Mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for tilt
    const springConfig = { stiffness: 150, damping: 20, mass: 0.8 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

    // Parallax for image inside card
    const imgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
    const imgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig);

    // Scroll-driven morphing
    const scrollProgress = useTransform(scrollY, [0, 400], [0, 1]);
    const cardScale = useSpring(useTransform(scrollProgress, [0, 1], [1, 0.75]), { stiffness: 100, damping: 30 });
    const cardOpacity = useTransform(scrollProgress, [0, 0.8], [1, 0]);
    const cardY = useSpring(useTransform(scrollProgress, [0, 1], [0, -80]), { stiffness: 80, damping: 25 });
    const borderRadius = useTransform(scrollProgress, [0, 1], [80, 24]);

    // Shadow glow on hover
    const shadowSpring = useSpring(isHovered ? 1 : 0, { stiffness: 200, damping: 20 });
    const boxShadow = useMotionTemplate`0 ${useTransform(shadowSpring, [0, 1], [30, 60])}px ${useTransform(shadowSpring, [0, 1], [60, 120])}px rgba(180, 80, 100, 0.25), 0 0 0 1px rgba(255,255,255,0.12)`;

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    }

    // Auto-cycle images
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImg((prev) => (prev + 1) % FASHION_IMAGES.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                scale: cardScale,
                y: cardY,
                opacity: cardOpacity,
                boxShadow,
                borderRadius,
                transformStyle: "preserve-3d",
                perspective: "1000px",
                width: "260px",
                height: "420px",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(20px)",
                willChange: "transform",
            }}
            initial={{ scale: 0.85, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
            {/* Shimmer overlay */}
            <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 50%, rgba(255,255,255,0.06) 100%)",
                    opacity: isHovered ? 1 : 0.6,
                    transition: "opacity 0.4s ease",
                }}
            />

            {/* Parallax image */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ x: imgX, y: imgY, scale: isHovered ? 1.08 : 1, transition: "scale 0.5s ease" }}
            >
                {FASHION_IMAGES.map((src, i) => (
                    <motion.img
                        key={src}
                        src={src}
                        alt={`Fashion model ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        initial={false}
                        animate={{
                            opacity: i === currentImg ? 1 : 0,
                            scale: i === currentImg ? 1.05 : 1.12,
                        }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        style={{ borderRadius: "inherit" }}
                    />
                ))}
            </motion.div>

            {/* Bottom gradient */}
            <div
                className="absolute bottom-0 left-0 right-0 z-20 h-40 pointer-events-none"
                style={{
                    background: "linear-gradient(to top, rgba(180, 80, 100, 0.55) 0%, transparent 100%)",
                }}
            />

            {/* Dot indicators */}
            <div className="absolute bottom-5 left-0 right-0 z-30 flex justify-center gap-1.5">
                {FASHION_IMAGES.map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ width: i === currentImg ? 20 : 6, opacity: i === currentImg ? 1 : 0.4 }}
                        transition={{ duration: 0.4 }}
                        className="h-1.5 rounded-full bg-white cursor-pointer"
                        onClick={() => setCurrentImg(i)}
                    />
                ))}
            </div>
        </motion.div>
    );
}
