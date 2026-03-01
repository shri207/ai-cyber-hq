import Head from "next/head";
import { motion } from "framer-motion";
import ProfileCard from "@/components/ui/ProfileCard";
import { mockProfile, mockEvents } from "@/lib/mockData";

export default function Profile() {
    const attendedEvents = mockEvents.filter((e) => e.status === "Past");

    return (
        <>
            <Head>
                <title>Profile — AI × CYBER HQ</title>
                <meta name="description" content="Your member profile, stats, and achievements." />
            </Head>

            <div className="max-w-5xl mx-auto px-6 py-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        👤 <span style={{ color: "#00f7ff" }}>Profile</span>
                    </h1>
                    <p className="text-sm" style={{ color: "#64748b" }}>Your personal dashboard and achievements</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <ProfileCard profile={mockProfile} />
                    </div>

                    {/* Right column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Activity Overview */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
                            <h3 className="text-lg font-bold text-white mb-4">📊 Activity Overview</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    { label: "Total Points", value: mockProfile.points, color: "#00ff9d" },
                                    { label: "Events", value: mockProfile.eventsAttended, color: "#00f7ff" },
                                    { label: "Badges", value: mockProfile.badges.length, color: "#ffaa00" },
                                    { label: "Rank", value: `#${mockProfile.rank}`, color: "#7a00ff" },
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
                                    { text: "Registered for CyberStrike Hackathon 2026", time: "2h ago", icon: "📡", color: "#00f7ff" },
                                    { text: "Earned CTF Champion badge", time: "1d ago", icon: "🏆", color: "#ffaa00" },
                                    { text: "Posted in Community Feed", time: "2d ago", icon: "💬", color: "#7a00ff" },
                                    { text: "Joined Team Exploit", time: "5d ago", icon: "👥", color: "#00ff9d" },
                                    { text: "Completed Workshop: Intro to Pentesting", time: "1w ago", icon: "🔓", color: "#00f7ff" },
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
