import Link from "next/link";

export default function Footer() {
    return (
        <footer
            className="relative mt-20 py-12 px-6"
            style={{
                background: "linear-gradient(180deg, transparent, rgba(11,15,26,0.95))",
                borderTop: "1px solid rgba(0,247,255,0.06)",
            }}
        >
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">🛡️</span>
                        <span className="font-bold text-lg" style={{ color: "#00f7ff" }}>
                            AI<span style={{ color: "#7a00ff" }}>×</span>CYBER HQ
                        </span>
                    </div>
                    <p style={{ color: "#64748b" }} className="leading-relaxed">
                        The Digital Headquarters for an AI & Cybersecurity Student Community. Learn, build, hack, repeat.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-semibold mb-3" style={{ color: "#94a3b8" }}>Quick Links</h4>
                    <div className="flex flex-col gap-2">
                        {[
                            { href: "/events", label: "Events" },
                            { href: "/teams", label: "Teams" },
                            { href: "/leaderboard", label: "Leaderboard" },
                            { href: "/feed", label: "Community Feed" },
                        ].map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="transition-colors hover:underline"
                                style={{ color: "#64748b" }}
                                onMouseEnter={(e) => (e.target.style.color = "#00f7ff")}
                                onMouseLeave={(e) => (e.target.style.color = "#64748b")}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-semibold mb-3" style={{ color: "#94a3b8" }}>Connect</h4>
                    <div className="flex flex-col gap-2" style={{ color: "#64748b" }}>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#00f7ff] transition-colors">
                            GitHub ↗
                        </a>
                        <a href="mailto:contact@aicyberhq.dev" className="hover:text-[#00f7ff] transition-colors">
                            contact@aicyberhq.dev
                        </a>
                        <span>Discord Community</span>
                    </div>
                </div>
            </div>

            <div
                className="max-w-6xl mx-auto mt-8 pt-6 text-center text-xs"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "#475569" }}
            >
                © 2026 AI×CYBER HQ. Built for the community, by the community.
            </div>
        </footer>
    );
}
