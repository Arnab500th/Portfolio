export default function Footer() {
    return (
        <footer className="relative z-10 w-full bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-md border-t border-white/20 py-4 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Divider line */}
                <div className="w-10 h-[1px] bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-3" />

                {/* Content */}
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                    {/* Built with */}
                    <p className="text-white/80 font-light text-xs md:text-sm">
                        Built with <span className="font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">React & Tailwind</span> by <span className="font-semibold text-white">Arnab Datta</span>
                    </p>

                    {/* Copyright */}
                    <p className="text-white/50 font-light text-xs tracking-wide">
                        © 2026 Arnab Datta. All Rights Reserved.
                    </p>
                </div>

                {/* Bottom accent */}
                <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent mx-auto mt-3" />
            </div>
        </footer>
    )
}
