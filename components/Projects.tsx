"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import { MouseEvent, useState, useEffect } from "react"

const projects = [
    {
        title: "Subway Surfers Pose Control",
        category: "Computer Vision",
        description:
            "Real-time body gesture control to play a game using computer vision and MediaPipe.",
        tech: "Python · OpenCV · MediaPipe · pynput",
        github: "https://github.com/Arnab500th/Subway-Surfers-Pose-Control-Game-Computer-Vision-",
        demo: "https://youtu.be/IiCIRFEjUi0",
        status: "completed"
    },
    {
        title: "Computational String Art",
        category: "Creative Python Project",
        description:
            "Algorithmic image processing project that converts images into optimized string-art patterns.",
        tech: "Python · OpenCV · NumPy · Pillow",
        github: "https://github.com/Arnab500th/Computational-String-Art",
        demo: "https://youtu.be/p1gn4fEBtRE",
        status: "completed"
    },
    {
        title: "Speed Dating Compatibility Predictor",
        category: "Machine Learning",
        description:
            "ML model trained on a speed dating dataset to predict compatibility probability between two participants.",
        tech: "Python · Pandas · scikit-learn · Flask · HTML/CSS · Matplotlib · Seaborn",
        github: "https://github.com/Arnab500th/Speed-Dating-Compatibility-Predictor",
        demo: null,
        status: "in-progress"
    },
    {
        title: "Voice-Activated Personal Assistant",
        category: "Python Automation",
        description:
            "Voice assistant using speech recognition and TTS to execute commands, answer queries, and perform automation tasks.",
        tech: "Python · Pandas · SpeechRecognition · gTTS · Playsound · Requests · Word2Number",
        github: "https://github.com/Arnab500th/Voice-Activated-Personal-Assistant",
        demo: "TBA (YouTube link to be attached)",
        status: "completed"
    },
];

function NumberedImage({ project, index }: { project: any; index: number }) {
    const exts = [".png"]
    const [foundSrc, setFoundSrc] = useState<string | null>(null)
    const [checking, setChecking] = useState(true)
    const explicit = project.images && project.images.length > 0 ? project.images[0] : null

    // Check for the presence of explicit image or numbered image files.
    // If found, `foundSrc` will be set and the Image will be rendered;
    // otherwise fall back to the default design background below.
    useEffect(() => {
        let mounted = true
        setFoundSrc(null)
        setChecking(true)

        const candidates: string[] = explicit
            ? [explicit]
            : exts.map((ext) => `/project_assets/${index + 1}${ext}`)

        ;(async () => {
            for (const c of candidates) {
                if (!mounted) return
                try {
                    // Try HEAD first to avoid downloading the whole file; some servers
                    // may not support HEAD so fall back to GET.
                    let res = null
                    try {
                        res = await fetch(c, { method: 'HEAD' })
                    } catch (err) {
                        // HEAD failed — try GET
                        res = await fetch(c, { method: 'GET' })
                    }

                    if (res && res.ok) {
                        if (mounted) {
                            setFoundSrc(c)
                            setChecking(false)
                        }
                        return
                    }
                } catch (e) {
                    // ignore and continue
                }
            }

            if (mounted) setChecking(false)
        })()

        return () => {
            mounted = false
        }
    }, [explicit, index])

    // If we found a valid image, render it
    if (foundSrc) {
        return (
            <div className="absolute inset-0">
                <Image src={foundSrc} alt={`${project.title} preview`} fill className="object-cover" priority={index < 2} />
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
            </div>
        )
    }

    // While checking or if not found, fall back to the default design background
    // (this covers both loading and missing-file cases)
    return (
        <>
            {/* Invisible preload attempt removed — using fetch to detect files now */}
            {/* Show design background while loading/attempting */}
                {index === 0 && (
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/30">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-cyan-400/40 rounded-full" />
                    <div className="absolute top-1/3 left-1/3 w-24 h-24 border-2 border-blue-400/40 rounded-full" />
                    <div className="absolute bottom-1/4 right-1/4 w-28 h-28 border-2 border-purple-400/40 rounded-full" />
                </div>
            )}
            {index === 1 && (
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-purple-500/20 to-cyan-500/30">
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(236,72,153,0.3)" strokeWidth="2" />
                        <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(168,85,247,0.3)" strokeWidth="2" />
                        <line x1="50%" y1="0" x2="0" y2="100%" stroke="rgba(34,211,238,0.3)" strokeWidth="2" />
                        <line x1="50%" y1="0" x2="100%" y2="100%" stroke="rgba(236,72,153,0.3)" strokeWidth="2" />
                    </svg>
                </div>
            )}
            {index === 2 && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-indigo-500/20 to-purple-500/30">
                    <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400/60 rounded-full" />
                    <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-400/60 rounded-full" />
                    <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-indigo-400/60 rounded-full" />
                    <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-400/60 rounded-full" />
                    <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-400/60 rounded-full" />
                </div>
            )}
            {index === 3 && (
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-teal-500/20 to-blue-500/30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-cyan-400/30 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-2 border-teal-400/20 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border-2 border-blue-400/10 rounded-full" />
                </div>
            )}
        </>
    )
}

function ProjectCard({ project, index }: { project: any; index: number }) {
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

    const rotateX = useTransform(mouseY, [-200, 200], [5, -5])
    const rotateY = useTransform(mouseX, [-200, 200], [-5, 5])

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{ perspective: 1000 }}
            className="h-[400px] relative"
        >
            <motion.div
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                
                className="group relative w-full h-full overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-8 flex flex-col justify-end transition-colors hover:border-white/20"
            >
                {/* Project Visual Background: prefer project images, fallback to abstract backgrounds */}
                <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
                    <NumberedImage project={project} index={index} />
                </div>

                {/* Gradient Blob */}
                <motion.div
                    style={{
                        translateX: useTransform(mouseX, [-200, 200], [-20, 20]),
                        translateY: useTransform(mouseY, [-200, 200], [-20, 20]),
                    }}
                    className="absolute -top-1/2 -right-1/2 w-full h-full bg-blue-500/20 blur-[100px] rounded-full group-hover:bg-purple-500/20 transition-colors duration-500 pointer-events-none"
                />

                {/* Project Info */}
                <div
                    className="relative z-10 transition-transform duration-300 group-hover:-translate-y-2"
                    style={{ transform: "translateZ(20px)" }}
                >
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-blue-300 uppercase bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
                        {project.category}
                    </span>

                    <h3 className="text-3xl font-bold text-white mb-2 flex items-center">
                        {project.title}
                    </h3>

                    <p className="text-white/60 leading-relaxed font-light">
                        {project.description}
                    </p>
                </div>

                {/* Hover Action - GitHub & YouTube */}
                <div
                    className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-4 group-hover:translate-y-0"
                    style={{ transform: "translateZ(30px)" }}
                >
                    <div className="flex gap-3">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-3 hover:scale-110 hover:bg-white/20 transition-all"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                        )}
                        {project.demo &&
                            (project.demo.includes("youtube.com") || project.demo.includes("youtu.be")) && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-3 hover:scale-110 hover:bg-red-500/30 transition-all"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                    </svg>
                                </a>
                            )}
                    </div>
                </div>

                {/* Status Overlay - In Progress */}
                {project.status === "in-progress" && (
                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-transparent backdrop-blur-sm rounded-3xl flex items-center justify-center z-20 pointer-events-none">
                        <div className="relative">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />

                            {/* Status Badge */}
                            <div className="relative px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full backdrop-blur-md">
                                <span className="text-blue-300 font-bold text-lg tracking-wider uppercase flex items-center gap-2">
                                    <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    In Progress
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}


export default function Projects() {
    return (
        <section className="relative z-10 w-full min-h-screen bg-black/50 backdrop-blur-sm py-32 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-24 tracking-tight"
                >
                    Projects
                    <div className="w-26 h-1 mt-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full " />
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
