import Link from "next/link";

const quickLinks = [
    { href: "/events", label: "Events" },
    { href: "/teams", label: "Teams" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/feed", label: "Feed" },
];

export default function Footer() {
    return (
        <footer className="mt-20 border-t" style={{ borderColor: "rgba(57,255,20,0.08)", background: "rgba(10,10,10,0.5)" }}>
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <span className="font-bold text-lg" style={{ color: "#39FF14" }}>
                            🛡️ SENTINEX
                        </span>
                        <p className="text-xs mt-3 leading-relaxed" style={{ color: "#64748b" }}>
                            The digital headquarters for an AI & Cybersecurity student community.
                            Train, compete, connect.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#94a3b8" }}>
                            Quick Links
                        </div>
                        <div className="space-y-2">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block text-sm transition-colors"
                                    style={{ color: "#64748b" }}
                                    onMouseEnter={(e) => (e.target.style.color = "#39FF14")}
                                    onMouseLeave={(e) => (e.target.style.color = "#64748b")}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#94a3b8" }}>
                            Connect
                        </div>
                        <div className="space-y-2">
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="block text-sm transition-colors" style={{ color: "#64748b" }} onMouseEnter={(e) => (e.target.style.color = "#39FF14")} onMouseLeave={(e) => (e.target.style.color = "#64748b")}>
                                GitHub
                            </a>
                            <a href="mailto:contact@sentinex.dev" className="block text-sm transition-colors" style={{ color: "#64748b" }} onMouseEnter={(e) => (e.target.style.color = "#39FF14")} onMouseLeave={(e) => (e.target.style.color = "#64748b")}>
                                contact@sentinex.dev
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 text-center text-xs" style={{ color: "#334155", borderTop: "1px solid rgba(57,255,20,0.06)" }}>
                    © 2026 SENTINEX. Built for the community, by the community.
                </div>
            </div>
        </footer>
    );
}
