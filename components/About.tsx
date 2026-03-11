"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
    SiPython,
    SiOpencv,
    SiPandas,
    SiNumpy,
    SiScikitlearn,
    SiTensorflow,
    SiHtml5,
    SiCss3,
    SiC,
    SiGit,
    SiFastapi,
    SiFlask,
    SiMysql,
    SiTwilio,
} from "react-icons/si";
import { FaLaptopCode } from "react-icons/fa";

const skills = [
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "Machine Learning", icon: SiScikitlearn, color: "#F7931E" }, // Using Scikit-Learn as generic ML
    { name: "Computer Vision", icon: SiOpencv, color: "#5C3EE8" },
    { name: "OpenCV", icon: SiOpencv, color: "#e87c3eff" },
    { name: "MediaPipe", icon: FaLaptopCode, color: "#00B0FF" }, // Generic icon for MediaPipe
    { name: "Flask", icon: SiFlask, color: "#ffffff" }, // Flask is black/white, making it white for dark mode
    { name: "SQL", icon: SiMysql, color: "#4479A1" },
    { name: "NumPy", icon: SiNumpy, color: "#013243" },
    { name: "Pandas", icon: SiPandas, color: "#041f58ff" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "FastAPI", icon: SiFastapi, color: "#009688" },
    { name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E" },
    { name: "HTML", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS", icon: SiCss3, color: "#1572B6" },
    { name: "C", icon: SiC, color: "#A8B9CC" },
    { name: "YOLO", icon: null, color: "#00FFAA", imgSrc: "/ultralytics.png" },
    { name: "Twilio", icon: SiTwilio, color: "#F22F46" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function About() {
    return (
        <section className="relative z-10 w-full min-h-[50vh] bg-black/50 backdrop-blur-sm py-12 md:py-20 px-4 md:px-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-start">

                {/* Left Column: Text Content */}
                <div className="md:w-1/2">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8 tracking-tight"
                    >
                        <div className="flex flex-col items-start">
                            <span>About Me</span>
                            <div className="w-24 h-1 mt-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full " />
                        </div>
                    </motion.h2>


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-4 md:space-y-6 text-white/80 font-light text-base md:text-xl leading-relaxed"
                    >
                        <p>
                            I’m a first-year Computer Science student and <span className="text-blue-300 font-medium">Python-focused developer</span> exploring machine learning and computer vision. I enjoy understanding how systems work, solving real-world problems, and experimenting with intelligent and vision-based software.
                        </p>
                        <p>
                            My work spans from data-driven ML models to real-time computer vision pipelines, with a strong focus on <span className="text-emerald-300 font-medium">learning through building</span>.

                        </p>

                        <div className="bg-white/5 border-l-4 border-blue-500 p-4 md:p-6 rounded-r-xl backdrop-blur-md mt-6 md:mt-8">
                            <p className="text-white/90 italic">
                                "Currently focused on deepening my skills in machine learning, computer vision, and backend engineering."
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Skills / Tech Stack */}
                <div className="md:w-1/2 w-full">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-2xl font-bold text-white mb-6"
                    >
                        Tech Stack
                        <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mt-2 " />

                    </motion.h3>
                    <div className="flex flex-wrap gap-2.5">
                        {skills.map((skill, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -4 }}
                                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all cursor-default group"
                            >
                                {skill.imgSrc ? (
                                    <Image src={skill.imgSrc} alt={skill.name} width={18} height={18} className="object-contain" />
                                ) : skill.icon ? (
                                    <skill.icon className="text-lg transition-colors" style={{ color: skill.color }} />
                                ) : null}
                                <span className="text-xs md:text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                    {skill.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
