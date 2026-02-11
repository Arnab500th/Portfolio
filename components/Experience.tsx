"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { MouseEvent } from "react"

type WorkExperience = {
    role: string
    company: string
    duration: string
    type: string
    tech: string[]
    contributions: string[]
    current: boolean
}

type Education = {
    degree: string
    institution: string
    duration: string
    achievement: string | null
    current: boolean
}

const workExperience = [
    {
        role: "Software Engineering Intern (AI/ML)",
        company: "Venture Launcher",
        duration: "Feb 2026 – Present",
        type: "Remote",
        tech: ["Python", "Pandas", "Matplotlib", "Scikit-Learn"],
        contributions: [
            "Designing backend and search/recommendation systems",
            "Perform EDA on raw datasets",
            "Contributing to practical AI/ML solutions",
        ],
        current: true,
    },
    {
        role: "ML and Python Engineer",
        company: "SRIndia (Qskill)",
        duration: "Jan 2026 – Feb 2026",
        type: "Remote",
        tech: ["Python", "Flask", "gTTS", "NLP", "HTML", "Matplotlib", "Pandas", "Scikit-Learn"],
        contributions: [
            "Built projects: Voice Assistant, House Price Prediction, Sentiment Analysis",
            "Worked on data preprocessing, ML models, and Flask apps",
            "Developed ML classifiers: Iris Flower & Spam Email Detection",
        ],
        current: false,
    },
]

const education = [
    {
        degree: "B.Sc. Computer Science (Honours)",
        institution: "St. Xavier's College, Burdwan",
        duration: "2025 – 2029",
        achievement: null,
        current: true,
    },
    {
        degree: "Class 12th",
        institution: "Swami Vivekananda Academy for Educational Excellence",
        duration: "2023 – 2025",
        achievement: "90.6% (PCM)",
        current: false,
    },
    {
        degree: "Class 10th",
        institution: "Swami Vivekananda Academy for Educational Excellence",
        duration: "2021 – 2023",
        achievement: "89.8%",
        current: false,
    },
]

function WorkCard({ work, index }: { work: WorkExperience; index: number }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        x.set(clientX - left - width / 2)
        y.set(clientY - top - height / 2)
    }

    function onMouseLeave() {
        x.set(0)
        y.set(0)
    }

    const rotateX = useTransform(mouseY, [-200, 200], [3, -3])
    const rotateY = useTransform(mouseX, [-200, 200], [-3, 3])

    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}       // start 100px left
            whileInView={{ opacity: 1, x: 0 }}     // slide to normal position
            transition={{ duration: 0.6, delay: index * 0.1 }}
        
            style={{ perspective: 1000 }}
            className="relative pl-8 pb-12 last:pb-0"
        >
            {/* Timeline dot */}
            <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 ring-4 ring-blue-500/20" />

            {/* Timeline line */}
            {index !== workExperience.length - 1 && (
                <div className="absolute left-[7px] top-6 w-[2px] h-[calc(100%-1rem)] bg-gradient-to-b from-blue-500/50 to-transparent" />
            )}

            {/* Content Card */}
            <motion.div
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 hover:border-blue-400/30 transition-all duration-300"
            >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">{work.role}</h3>
                            <p className="text-blue-300 font-medium">{work.company}</p>
                        </div>
                        {work.current && (
                            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-green-300 uppercase bg-green-500/10 rounded-full border border-green-500/20">
                                Current
                            </span>
                        )}
                    </div>

                    {/* Duration & Type */}
                    <div className="flex flex-wrap gap-3 mb-4 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {work.duration}
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {work.type}
                        </span>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {work.tech.map((tech: string, i: number) => (
                            <span
                                key={i}
                                className="px-2 py-1 text-xs font-medium text-cyan-300 bg-cyan-500/10 rounded-md border border-cyan-500/20"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Contributions */}
                    <ul className="space-y-2">
                        {work.contributions.map((contribution: string, i: number) => (
                            <li key={i} className="flex gap-2 text-sm text-white/70">
                                <span className="text-blue-400 mt-1">▹</span>
                                <span>{contribution}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    )
}

function EducationCard({ edu, index }: { edu: Education; index: number }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        x.set(clientX - left - width / 2)
        y.set(clientY - top - height / 2)
    }

    function onMouseLeave() {
        x.set(0)
        y.set(0)
    }

    const rotateX = useTransform(mouseY, [-200, 200], [3, -3])
    const rotateY = useTransform(mouseX, [-200, 200], [-3, 3])

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}       // start 100px left
            whileInView={{ opacity: 1, x: 0 }}     // slide to normal position
            transition={{ duration: 0.6, delay: index * 0.1 }}
        
            style={{ perspective: 1000 }}
            className="relative pl-8 pb-12 last:pb-0"
        >
            {/* Timeline dot */}
            <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 ring-4 ring-emerald-500/20" />


            {/* Timeline line */}
            {index !== education.length - 1 && (
                <div className="absolute left-[7px] top-6 w-[2px] h-[calc(100%-1rem)] bg-gradient-to-b from-emerald-500/50 to-transparent" />

            )}

            {/* Content Card */}
            <motion.div
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 hover:border-emerald-400/30 transition-all duration-300"
            >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                            <p className="text-emerald-400 font-medium">{edu.institution}</p>
                        </div>
                        {edu.current && (
                            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-green-300 uppercase bg-green-500/10 rounded-full border border-green-500/20">
                                Current
                            </span>
                        )}
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-1 mb-3 text-sm text-white/60">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {edu.duration}
                    </div>

                    {/* Achievement */}
                    {edu.achievement && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-lg">
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-semibold text-white">{edu.achievement}</span>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function Experience() {
    return (
        <section className="relative z-10 w-full min-h-screen bg-black/50 backdrop-blur-sm py-32 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight leading-tight">
                        <span>Experience & Education</span>
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto mb-6" />
                    <p className="text-white/60 text-lg">My professional journey and academic background</p>
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Work Experience Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        
                            className="mb-8"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center gap-3">
                                <span className="text-3xl">💼</span>
                                Work Experience
                            </h3>
                            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
                        </motion.div>

                        <div className="space-y-0">
                            {workExperience.map((work, index) => (
                                <WorkCard key={index} work={work} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Education Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        
                            className="mb-8"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center gap-3">
                                <span className="text-3xl">🎓</span>
                                Education
                            </h3>
                            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                        </motion.div>

                        <div className="space-y-0">
                            {education.map((edu, index) => (
                                <EducationCard key={index} edu={edu} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

