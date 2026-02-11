"use client"

import React from "react"
import emailjs from "@emailjs/browser"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { useState, type MouseEvent } from "react"

const socialLinks = [
    {
        name: "Email",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
        ),
        value: "arnabdatta2007@gmail.com",
        href: "mailto:arnabdatta2007@gmail.com",
        color: "from-red-400 to-pink-400",
        hoverBorder: "hover:border-red-400/30",
    },
    {
        name: "GitHub",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        value: "@Arnab500th",
        href: "https://github.com/Arnab500th",
        color: "from-gray-400 to-gray-600",
        hoverBorder: "hover:border-gray-400/30",
    },
    {
        name: "LinkedIn",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        value: "arnab500th",
        href: "https://www.linkedin.com/in/arnab500th/",
        color: "from-blue-400 to-blue-600",
        hoverBorder: "hover:border-blue-400/30",
    },
    {
        name: "YouTube",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
        ),
        value: "@Arnab500th",
        href: "https://www.youtube.com/@Arnab500th",
        color: "from-red-500 to-red-600",
        hoverBorder: "hover:border-red-400/30",
    },
]

function SocialCard({ link, index }: { link: (typeof socialLinks)[number]; index: number }) {
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
        <motion.a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}

            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
            className={`group relative flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/10 ${link.hoverBorder}`}
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

            {/* Icon */}
            <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                {link.icon}
            </div>

            {/* Text */}
            <div className="relative flex-1 min-w-0">
                <p className="text-sm text-white/50 mb-0.5">{link.name}</p>
                <p className="text-white font-medium group-hover:text-blue-300 transition-colors truncate">
                    {link.value}
                </p>
            </div>

            {/* Arrow */}
            <svg
                className="relative w-5 h-5 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </motion.a>
    )
}

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
    const [focusedField, setFocusedField] = useState<string | null>(null)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isSubmitting) return
        setIsSubmitting(true)

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    title: "Portfolio Contact Form",
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            )

            setFormData({ name: "", email: "", message: "" })
            setSubmitStatus("success")
            setTimeout(() => {
                setSubmitStatus("idle")
            }, 3500)
        } catch (error) {
            console.error("EmailJS error:", error)
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="relative z-10 w-full min-h-screen bg-black/50 backdrop-blur-sm py-32 px-4 md:px-12">
                {/* Ambient glow */}
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}

                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">
                            {"Let's Connect"}
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto mb-4" />
                        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                            {"I'm always open to collaborating on interesting projects, internships, or just having a tech chat. Drop me a message and I'll get back to you!"}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Social Links */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}

                                className="mb-8"
                            >
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center gap-3">
                                    <span className="text-3xl">
                                        <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                        </svg>
                                    </span>
                                    Get In Touch
                                </h3>
                                <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
                            </motion.div>

                            <div className="flex flex-col gap-4">
                                {socialLinks.map((link, index) => (
                                    <SocialCard key={link.name} link={link} index={index} />
                                ))}
                            </div>

                            {/* Availability */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}

                                className="mt-8 flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                            >
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
                                </span>
                                <span className="text-sm text-green-300 font-medium">Available for opportunities</span>
                            </motion.div>
                        </div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}

                        >
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}

                                className="mb-8"
                            >
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center gap-3">
                                    <span className="text-3xl">
                                        <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                        </svg>
                                    </span>
                                    Send a Message
                                </h3>
                                <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                            </motion.div>

                            {/* Form card with corner accents */}
                            <div className="relative p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                {/* Corner accents */}
                                <div className="absolute top-0 left-0 w-16 h-[1px] bg-gradient-to-r from-blue-500/50 to-transparent" />
                                <div className="absolute top-0 left-0 w-[1px] h-16 bg-gradient-to-b from-blue-500/50 to-transparent" />
                                <div className="absolute bottom-0 right-0 w-16 h-[1px] bg-gradient-to-l from-cyan-500/50 to-transparent" />
                                <div className="absolute bottom-0 right-0 w-[1px] h-16 bg-gradient-to-t from-cyan-500/50 to-transparent" />

                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                    {/* Name */}
                                    <div className="relative">
                                        <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                            </svg>
                                            Name
                                        </label>
                                        {focusedField === "name" && (
                                            <motion.div
                                                layoutId="focus-glow"
                                                className="absolute -inset-[1px] top-7 rounded-lg bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-blue-500/20 blur-[2px] pointer-events-none"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField("name")}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            className="relative w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/40 focus:bg-white/[0.07] transition-all duration-300 backdrop-blur-md"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="relative">
                                        <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                            </svg>
                                            Email
                                        </label>
                                        {focusedField === "email" && (
                                            <motion.div
                                                layoutId="focus-glow"
                                                className="absolute -inset-[1px] top-7 rounded-lg bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-blue-500/20 blur-[2px] pointer-events-none"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField("email")}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            suppressHydrationWarning
                                            className="relative w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/40 focus:bg-white/[0.07] transition-all duration-300 backdrop-blur-md"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="relative">
                                        <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                            </svg>
                                            Message
                                        </label>
                                        {focusedField === "message" && (
                                            <motion.div
                                                layoutId="focus-glow"
                                                className="absolute -inset-[1px] top-7 rounded-lg bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-blue-500/20 blur-[2px] pointer-events-none"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField("message")}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            rows={5}
                                            className="relative w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/40 focus:bg-white/[0.07] transition-all duration-300 backdrop-blur-md resize-none"
                                            placeholder="Tell me about your project or just say hi..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold overflow-hidden hover:from-blue-400 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                    >
                                        {/* Shine sweep */}
                                        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {isSubmitting ? (
                                                <motion.span
                                                    key="loading"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="relative flex items-center justify-center gap-2"
                                                >
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Sending...
                                                </motion.span>
                                            ) : (
                                                <motion.span
                                                    key="send"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="relative flex items-center justify-center gap-2"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                                    </svg>
                                                    Send Message
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>

                                    {/* Success Message */}
                                    <AnimatePresence>
                                        {submitStatus === "success" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                                            >
                                                <svg className="w-5 h-5 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <p className="text-sm text-green-300">
                                                    {"Message sent successfully! I'll get back to you soon."}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        )
    }
