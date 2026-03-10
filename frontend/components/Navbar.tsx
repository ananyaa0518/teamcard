"use client";

import { motion } from "framer-motion";

export default function Navbar() {
    const navLinks = ["Pricing", "Product", "About", "Contact"];

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
            style={{
                backdropFilter: "blur(12px)",
                background: "rgba(246, 182, 182, 0.3)",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
            }}
        >
            {/* Logo */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-white font-bold text-xl tracking-tight cursor-pointer"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
                Fashion
                <span style={{ color: "rgba(255,255,255,0.6)" }}>.ai</span>
            </motion.div>

            {/* Center Nav Links */}
            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link, i) => (
                    <motion.a
                        key={link}
                        href="#"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                        whileHover={{ y: -2 }}
                        className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        {link}
                    </motion.a>
                ))}
            </div>

            {/* CTA Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 rounded-full text-white text-sm font-semibold tracking-wide transition-all"
                style={{
                    background: "rgba(30, 20, 50, 0.85)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                }}
            >
                Get Started
            </motion.button>
        </motion.nav>
    );
}
