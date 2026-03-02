import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useTheme } from "@/lib/ThemeContext";
import { useNotifications } from "@/lib/NotificationContext";

const navLinks = [
    { href: "/", label: "Home", icon: "⌂" },
    { href: "/events", label: "Events", icon: "📡" },
    { href: "/teams", label: "Teams", icon: "👥" },
    { href: "/leaderboard", label: "Board", icon: "🏆" },
    { href: "/feed", label: "Feed", icon: "💬" },
    { href: "/arena", label: "Arena", icon: "🎯" },
    { href: "/resources", label: "Resources", icon: "📚" },
    { href: "/projects", label: "Projects", icon: "🚀" },
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/cyber-map", label: "CyberMap", icon: "🗺️" },
    { href: "/profile", label: "Profile", icon: "👤" },
];

export default function Navbar() {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [notifOpen, setNotifOpen] = useState(false);
    const notifRef = useRef(null);
    const { theme, toggleTheme } = useTheme();
    const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Close notification panel on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setNotifOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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
                    background: "rgba(10, 10, 10, 0.85)",
                    backdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(57,255,20,0.08)",
                }}
            >
                <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl">🛡️</span>
                        <span className="text-lg font-bold tracking-wide" style={{ color: "#39FF14" }}>
                            SENTINEX
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden lg:flex items-center gap-0.5">
                        {navLinks.filter(link => link.href !== '/profile' || user).map((link) => {
                            const active = router.pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                                    style={{
                                        color: active ? "#39FF14" : "#94a3b8",
                                        background: active ? "rgba(57,255,20,0.08)" : "transparent",
                                    }}
                                >
                                    <span className="mr-1">{link.icon}</span>
                                    {link.label}
                                    {active && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                                            style={{ background: "#39FF14" }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right side: notif, theme, auth */}
                    <div className="hidden lg:flex items-center gap-2">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg transition-all text-sm"
                            style={{ color: "#94a3b8", background: "rgba(255,255,255,0.03)" }}
                            title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
                        >
                            {theme === "dark" ? "☀️" : "🌙"}
                        </button>

                        {/* Notification Bell */}
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => setNotifOpen(!notifOpen)}
                                className="p-2 rounded-lg transition-all text-sm relative"
                                style={{ color: "#94a3b8", background: "rgba(255,255,255,0.03)" }}
                            >
                                🔔
                                {unreadCount > 0 && (
                                    <span
                                        className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold"
                                        style={{ background: "#39FF14", color: "#0a0a0a" }}
                                    >
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            <AnimatePresence>
                                {notifOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-80 rounded-xl overflow-hidden"
                                        style={{
                                            background: "rgba(10, 14, 10, 0.97)",
                                            border: "1px solid rgba(57,255,20,0.15)",
                                            backdropFilter: "blur(20px)",
                                            boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                                        }}
                                    >
                                        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(57,255,20,0.08)" }}>
                                            <span className="text-sm font-bold text-white">Notifications</span>
                                            {unreadCount > 0 && (
                                                <button
                                                    onClick={markAllRead}
                                                    className="text-[10px] font-medium"
                                                    style={{ color: "#39FF14" }}
                                                >
                                                    Mark all read
                                                </button>
                                            )}
                                        </div>
                                        <div className="max-h-72 overflow-y-auto">
                                            {notifications.map((n) => (
                                                <div
                                                    key={n.id}
                                                    onClick={() => markAsRead(n.id)}
                                                    className="px-4 py-3 cursor-pointer transition-colors"
                                                    style={{
                                                        background: n.read ? "transparent" : "rgba(57,255,20,0.03)",
                                                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                                                    }}
                                                >
                                                    <div className="flex items-start gap-2">
                                                        {!n.read && (
                                                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#39FF14" }} />
                                                        )}
                                                        <div className={n.read ? "pl-3.5" : ""}>
                                                            <p className="text-xs font-semibold text-white">{n.title}</p>
                                                            <p className="text-[10px] mt-0.5" style={{ color: "#94a3b8" }}>{n.message}</p>
                                                            <p className="text-[9px] mt-1" style={{ color: "#475569" }}>{n.timestamp}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Auth */}
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
                    <div className="lg:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-sm"
                            style={{ color: "#94a3b8" }}
                        >
                            {theme === "dark" ? "☀️" : "🌙"}
                        </button>
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => setNotifOpen(!notifOpen)}
                                className="p-2 rounded-lg text-sm relative"
                                style={{ color: "#94a3b8" }}
                            >
                                🔔
                                {unreadCount > 0 && (
                                    <span
                                        className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold"
                                        style={{ background: "#39FF14", color: "#0a0a0a" }}
                                    >
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                            <AnimatePresence>
                                {notifOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-72 rounded-xl overflow-hidden z-50"
                                        style={{
                                            background: "rgba(10, 14, 10, 0.97)",
                                            border: "1px solid rgba(57,255,20,0.15)",
                                            backdropFilter: "blur(20px)",
                                            boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                                        }}
                                    >
                                        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(57,255,20,0.08)" }}>
                                            <span className="text-sm font-bold text-white">Notifications</span>
                                            {unreadCount > 0 && (
                                                <button onClick={markAllRead} className="text-[10px] font-medium" style={{ color: "#39FF14" }}>
                                                    Mark all read
                                                </button>
                                            )}
                                        </div>
                                        <div className="max-h-60 overflow-y-auto">
                                            {notifications.map((n) => (
                                                <div
                                                    key={n.id}
                                                    onClick={() => markAsRead(n.id)}
                                                    className="px-4 py-3 cursor-pointer"
                                                    style={{
                                                        background: n.read ? "transparent" : "rgba(57,255,20,0.03)",
                                                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                                                    }}
                                                >
                                                    <p className="text-xs font-semibold text-white">{n.title}</p>
                                                    <p className="text-[10px] mt-0.5" style={{ color: "#94a3b8" }}>{n.message}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <button
                            className="p-2 rounded-lg"
                            style={{ color: "#39FF14" }}
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
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="lg:hidden px-4 pb-4 pt-2"
                        style={{
                            background: "rgba(10, 10, 10, 0.95)",
                            backdropFilter: "blur(20px)",
                            borderBottom: "1px solid rgba(57,255,20,0.08)",
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
                                        color: active ? "#39FF14" : "#94a3b8",
                                        background: active ? "rgba(57,255,20,0.06)" : "transparent",
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
