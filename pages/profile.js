import { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import ProfileCard from "@/components/ui/ProfileCard";
import { mockProfile, mockEvents } from "@/lib/mockData";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserProfile, createOrUpdateUserProfile } from "@/lib/firestore";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const attendedEvents = mockEvents.filter((e) => e.status === "Past");

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Try to load from Firestore with a 3-second timeout
                    const fetchProfile = getUserProfile(user.uid);
                    const timeout = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error("Firestore fetch timeout")), 3000)
                    );

                    let firestoreProfile = await Promise.race([fetchProfile, timeout]);

                    if (!firestoreProfile) {
                        // First login — create a profile in Firestore from Auth data
                        const newProfile = {
                            username: user.displayName || user.email?.split("@")[0] || "Operator",
                            email: user.email || "",
                            avatar: "🧑‍💻",
                            joinDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
                            points: 0,
                            rank: 999,
                            eventsAttended: 0,
                            streak: 0,
                            badges: [],
                            skills: [],
                            bio: "SENTINEX operative ready for deployment.",
                            team: null,
                            github: "",
                            linkedin: "",
                        };
                        await createOrUpdateUserProfile(user.uid, newProfile);
                        firestoreProfile = { id: user.uid, ...newProfile };
                    }

                    setProfile(firestoreProfile);
                } catch (error) {
                    console.error("Firestore error (possibly blocked):", error);
                    // Fall back to mock NeoCypher profile on network error
                    setProfile(mockProfile);
                }
            } else {
                // Not logged in — use mock data
                setProfile(mockProfile);
            }
            setLoading(false);
        });

        return () => unsub();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4 animate-pulse">⚡</div>
                    <p className="text-sm" style={{ color: "#39FF14" }}>Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Profile — SENTINEX</title>
                <meta name="description" content="Your member profile, stats, and achievements." />
            </Head>

            <div className="max-w-5xl mx-auto px-6 py-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        👤 <span style={{ color: "#39FF14" }}>Profile</span>
                    </h1>
                    <p className="text-sm" style={{ color: "#64748b" }}>Your personal dashboard and achievements</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <ProfileCard profile={profile} />
                    </div>

                    {/* Right column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Activity Overview */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
                            <h3 className="text-lg font-bold text-white mb-4">📊 Activity Overview</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    { label: "Total Points", value: profile.points || 0, color: "#00ff9d" },
                                    { label: "Events", value: profile.eventsAttended || 0, color: "#39FF14" },
                                    { label: "Badges", value: (profile.badges || []).length, color: "#ffaa00" },
                                    { label: "Rank", value: `#${profile.rank || "—"}`, color: "#00e676" },
                                ].map((stat) => (
                                    <div key={stat.label} className="p-4 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                                        <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                                        <div className="text-[10px] uppercase tracking-wider mt-1" style={{ color: "#64748b" }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Recent Activity */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
                            <h3 className="text-lg font-bold text-white mb-4">🕐 Recent Activity</h3>
                            <div className="space-y-3">
                                {[
                                    { text: "Registered for CyberStrike Hackathon 2026", time: "2h ago", icon: "📡", color: "#39FF14" },
                                    { text: "Earned CTF Champion badge", time: "1d ago", icon: "🏆", color: "#ffaa00" },
                                    { text: "Posted in Community Feed", time: "2d ago", icon: "💬", color: "#00e676" },
                                    { text: "Joined Team Exploit", time: "5d ago", icon: "👥", color: "#00ff9d" },
                                    { text: "Completed Workshop: Intro to Pentesting", time: "1w ago", icon: "🔓", color: "#39FF14" },
                                ].map((act, i) => (
                                    <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg transition-colors" style={{ background: "rgba(255,255,255,0.01)" }}>
                                        <span className="text-lg">{act.icon}</span>
                                        <div className="flex-1">
                                            <p className="text-sm text-white">{act.text}</p>
                                            <p className="text-[10px]" style={{ color: "#64748b" }}>{act.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Events Attended */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
                            <h3 className="text-lg font-bold text-white mb-4">📋 Events Attended</h3>
                            <div className="space-y-2">
                                {attendedEvents.map((ev) => (
                                    <div key={ev.id} className="flex items-center justify-between py-3 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{ev.image}</span>
                                            <div>
                                                <div className="text-sm font-medium text-white">{ev.title}</div>
                                                <div className="text-[10px]" style={{ color: "#64748b" }}>{ev.date} • {ev.type}</div>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold" style={{ color: "#00ff9d" }}>+{ev.reward} pts</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
