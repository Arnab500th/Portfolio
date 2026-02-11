"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -100]);
    const opacity1 = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    const y2 = useTransform(scrollYProgress, [0.1, 0.35], [100, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [0, 1, 0]);

    const y3 = useTransform(scrollYProgress, [0.35, 0.6], [100, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.35, 0.5, 0.7], [0, 1, 0]);

    return (
        <div
            ref={ref}
            className="absolute top-0 left-0 w-full h-[2000vh] pointer-events-none z-10 flex flex-col items-center"
        >
            {/* Section 1 */}
            <motion.div
                style={{ y: y1, opacity: opacity1 }}
                className="fixed top-1/2 -translate-y-1/2 text-center"
            >
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-9xl font-bold tracking-tighter mix-blend-difference text-white"
                    >
                        Arnab Datta
                    </motion.h1>
                </div>
                <div className="overflow-hidden mt-4">
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-xl font-[var(--font-geist-mono)] text-white/80 tracking-tight"
                    >
                        Software Developer · Python · ML & Computer Vision
                    </motion.p>
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-sm md:text-base font-light text-white/60 mt-2 italic"
                    >
                        Turning curiosity into production-grade code.
                    </motion.p>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ opacity: opacity1 }} // ← Added this to fade with scroll
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute left-1/2 -translate-x-1/2 top-[250px] flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest text-white/50">Scroll to explore</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
                </motion.div>
            </motion.div>

            {/* Section 2 */}
            <motion.div
                style={{ 
                    y: y2, 
                    opacity: opacity2,
                }}
                className="fixed top-1/2 -translate-y-1/2 left-10 md:left-24 max-w-lg"
            >
                <h2 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
                    <span className="block overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="block"
                        >
                            I build intelligent, data-driven
                        </motion.span>
                    </span>
                    <span className="block overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
                        >
                            software systems.
                        </motion.span>
                    </span>
                </h2>
            </motion.div>

            {/* Section 3 */}
            <motion.div
                style={{ 
                    y: y3, 
                    opacity: opacity3,
                }}
                className="fixed top-1/2 -translate-y-1/2 right-10 md:right-24 text-right max-w-lg"
            >
                <h2 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
                    <span className="block overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="block"
                        >
                            From data pipelines to
                        </motion.span>
                    </span>
                    <span className="block overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                             className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                        >
                            real-time vision systems.
                        </motion.span>
                    </span>
                </h2>
            </motion.div>
        </div>
    );
}

