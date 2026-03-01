import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const navLinks = [
    { href: "/", label: "Home", icon: "⌂" },
    { href: "/events", label: "Events", icon: "📡" },
    { href: "/teams", label: "Teams", icon: "👥" },
    { href: "/leaderboard", label: "Leaderboard", icon: "🏆" },
    { href: "/feed", label: "Feed", icon: "💬" },
    { href: "/profile", label: "Profile", icon: "👤" },
];

export default function Navbar() {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div
                className="mx-auto px-4 sm:px-6 lg:px-8"
                style={{
                    background: "rgba(11, 15, 26, 0.85)",
                    backdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(0,247,255,0.08)",
                }}
            >
                <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl">🛡️</span>
                        <span className="text-lg font-bold tracking-wide" style={{ color: "#00f7ff" }}>
                            AI<span style={{ color: "#7a00ff" }}>×</span>CYBER
                            <span className="text-white/80 font-normal ml-1">HQ</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.filter(link => link.href !== '/profile' || user).map((link) => {
                            const active = router.pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                    style={{
                                        color: active ? "#00f7ff" : "#94a3b8",
                                        background: active ? "rgba(0,247,255,0.08)" : "transparent",
                                    }}
                                >
                                    <span className="mr-1.5">{link.icon}</span>
                                    {link.label}
                                    {active && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                                            style={{ background: "#00f7ff" }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth button (desktop) */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <button onClick={handleLogout} className="btn-neon text-xs !py-2 !px-4" style={{ border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5' }}>
                                Logout
                            </button>
                        ) : (
                            <Link href="/login" className="btn-neon btn-neon-cyan text-xs !py-2 !px-4">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 rounded-lg"
                        style={{ color: "#00f7ff" }}
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            {mobileOpen ? (
                                <path d="M6 6l12 12M6 18L18 6" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden px-4 pb-4 pt-2"
                        style={{
                            background: "rgba(11, 15, 26, 0.95)",
                            backdropFilter: "blur(20px)",
                            borderBottom: "1px solid rgba(0,247,255,0.08)",
                        }}
                    >
                        {navLinks.filter(link => link.href !== '/profile' || user).map((link) => {
                            const active = router.pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-4 py-3 rounded-xl text-sm font-medium mb-1"
                                    style={{
                                        color: active ? "#00f7ff" : "#94a3b8",
                                        background: active ? "rgba(0,247,255,0.06)" : "transparent",
                                    }}
                                >
                                    <span className="mr-2">{link.icon}</span>
                                    {link.label}
                                </Link>
                            );
                        })}
                        {user ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMobileOpen(false);
                                }}
                                className="block mt-2 w-full text-center py-2 rounded-xl text-sm transition-colors"
                                style={{ border: '1px solid rgba(239, 68, 68, 0.2)', color: '#fca5a5', background: 'rgba(239, 68, 68, 0.05)' }}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="block mt-2 text-center btn-neon btn-neon-cyan text-sm"
                            >
                                Login
                            </Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
