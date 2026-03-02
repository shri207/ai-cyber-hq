import { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import {
    mockDashboardStats,
    mockAchievements,
    mockNews,
} from "@/lib/extendedMockData";
import { mockProfile, mockEvents } from "@/lib/mockData";

export default function Dashboard() {
    const stats = mockDashboardStats;
    const profile = mockProfile;
    const [achievements] = useState(mockAchievements);

    const maxWeeklyPosts = Math.max(...stats.weeklyActivity.map((d) => d.posts));
    const maxMonthlyPoints = Math.max(...stats.monthlyPoints.map((d) => d.points));

    return (
        <>
            <Head>
                <title>Dashboard — SENTINEX</title>
                <meta name="description" content="Your personal activity dashboard with stats, charts, and achievements." />
            </Head>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        📊 <span style={{ color: "#39FF14" }}>Dashboard</span>
                    </h1>
                    <p className="text-sm" style={{ color: "#64748b" }}>
                        Welcome back, {profile.username}! Here&apos;s your activity overview.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
                >
                    {[
                        { label: "Events Joined", value: stats.eventsJoined, icon: "📡", color: "#39FF14" },
                        { label: "Posts Created", value: stats.postsCreated, icon: "💬", color: "#00e676" },
                        { label: "Leaderboard Rank", value: `#${stats.leaderboardRank}`, icon: "🏆", color: "#ffaa00" },
                        { label: "Badges Earned", value: stats.badgesEarned, icon: "🏅", color: "#a78bfa" },
                        { label: "Challenges Done", value: stats.challengesCompleted, icon: "🎯", color: "#06b6d4" },
                        { label: "Reputation", value: stats.reputation, icon: "⭐", color: "#ff6b6b" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                            className="glass-card p-4 text-center"
                        >
                            <div className="text-2xl mb-2">{stat.icon}</div>
                            <div className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                            <div className="text-[9px] uppercase tracking-wider mt-1" style={{ color: "#64748b" }}>{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Weekly Activity Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-6"
                    >
                        <h3 className="text-lg font-bold text-white mb-6">📈 Weekly Activity</h3>
                        <div className="flex items-end gap-3 h-40">
                            {stats.weeklyActivity.map((day, i) => (
                                <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                                    <div className="w-full flex flex-col items-center gap-1 flex-1 justify-end">
                                        {/* Posts bar */}
                                        <motion.div
                                            className="w-full rounded-t-md"
                                            style={{
                                                background: "linear-gradient(180deg, #39FF14, #39FF1440)",
                                                minHeight: "4px",
                                            }}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(day.posts / maxWeeklyPosts) * 100}%` }}
                                            transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                                        />
                                        {/* Challenges bar */}
                                        <motion.div
                                            className="w-full rounded-t-md"
                                            style={{
                                                background: "linear-gradient(180deg, #00e676, #00e67640)",
                                                minHeight: "2px",
                                            }}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(day.challenges / maxWeeklyPosts) * 80}%` }}
                                            transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                                        />
                                    </div>
                                    <span className="text-[9px] font-medium mt-1" style={{ color: "#64748b" }}>{day.day}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-4 mt-4">
                            <div className="flex items-center gap-1.5 text-[10px]" style={{ color: "#94a3b8" }}>
                                <span className="w-2 h-2 rounded" style={{ background: "#39FF14" }} /> Posts
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px]" style={{ color: "#94a3b8" }}>
                                <span className="w-2 h-2 rounded" style={{ background: "#00e676" }} /> Challenges
                            </div>
                        </div>
                    </motion.div>

                    {/* Monthly Points Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="glass-card p-6"
                    >
                        <h3 className="text-lg font-bold text-white mb-6">📊 Monthly Points Growth</h3>
                        <div className="flex items-end gap-4 h-40">
                            {stats.monthlyPoints.map((month, i) => (
                                <div key={month.month} className="flex-1 flex flex-col items-center gap-1">
                                    <span className="text-[10px] font-bold" style={{ color: "#39FF14" }}>{month.points}</span>
                                    <motion.div
                                        className="w-full rounded-t-lg"
                                        style={{
                                            background: `linear-gradient(180deg, #39FF14, rgba(57,255,20,${0.1 + (month.points / maxMonthlyPoints) * 0.3}))`,
                                            minHeight: "4px",
                                        }}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(month.points / maxMonthlyPoints) * 100}%` }}
                                        transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                                    />
                                    <span className="text-[9px] font-medium mt-1" style={{ color: "#64748b" }}>{month.month}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Achievements */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-6 lg:col-span-2"
                    >
                        <h3 className="text-lg font-bold text-white mb-4">🏅 Achievements</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {achievements.map((ach) => (
                                <div
                                    key={ach.id}
                                    className="p-4 rounded-xl text-center transition-all"
                                    style={{
                                        background: ach.unlocked ? "rgba(57,255,20,0.05)" : "rgba(255,255,255,0.02)",
                                        border: `1px solid ${ach.unlocked ? ach.color + "30" : "rgba(255,255,255,0.05)"}`,
                                        opacity: ach.unlocked ? 1 : 0.5,
                                    }}
                                >
                                    <div className="text-3xl mb-2">{ach.icon}</div>
                                    <div className="text-xs font-bold text-white mb-0.5">{ach.title}</div>
                                    <div className="text-[9px]" style={{ color: "#64748b" }}>{ach.description}</div>
                                    {ach.unlocked && (
                                        <div className="w-6 h-0.5 mx-auto mt-2 rounded-full" style={{ background: ach.color }} />
                                    )}
                                    {!ach.unlocked && (
                                        <div className="text-[9px] mt-2 font-medium" style={{ color: "#475569" }}>🔒 Locked</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* News Widget */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="glass-card p-6"
                    >
                        <h3 className="text-lg font-bold text-white mb-4">📰 Cyber News</h3>
                        <div className="space-y-3">
                            {mockNews.slice(0, 4).map((news) => (
                                <a
                                    key={news.id}
                                    href={news.link}
                                    className="block p-3 rounded-lg transition-colors"
                                    style={{ background: "rgba(255,255,255,0.02)" }}
                                >
                                    <div className="text-xs font-medium text-white mb-1 leading-relaxed">{news.title}</div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px]" style={{ color: "#64748b" }}>{news.source}</span>
                                        <span className="text-[9px]" style={{ color: "#475569" }}>{news.timestamp}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Upcoming Events Quick View */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-6 mt-8"
                >
                    <h3 className="text-lg font-bold text-white mb-4">📅 Upcoming Events</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockEvents.filter((e) => e.status === "Upcoming").slice(0, 3).map((ev) => (
                            <div key={ev.id} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xl">{ev.image}</span>
                                    <div>
                                        <div className="text-sm font-medium text-white">{ev.title}</div>
                                        <div className="text-[10px]" style={{ color: "#64748b" }}>{ev.date} • {ev.time}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="badge-chip text-[10px]">{ev.type}</span>
                                    <span className="text-xs font-bold" style={{ color: "#00ff9d" }}>+{ev.reward} pts</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </>
    );
}
