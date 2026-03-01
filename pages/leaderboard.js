import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import LeaderboardTable from "@/components/ui/LeaderboardTable";
import { mockLeaderboard, badges as badgeData, pointSystem } from "@/lib/mockData";
import { getLeaderboard } from "@/lib/firestore";

export default function Leaderboard() {
    const [tab, setTab] = useState("rankings");
    const [leaderboardData, setLeaderboardData] = useState(mockLeaderboard);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const firestoreData = await getLeaderboard(20);
                if (firestoreData && firestoreData.length > 0) {
                    // Ensure all required fields exist with defaults
                    const normalized = firestoreData.map((u, i) => ({
                        id: u.id,
                        rank: i + 1,
                        username: u.username || u.email?.split("@")[0] || "Unknown",
                        avatar: u.avatar || "🧑‍💻",
                        points: u.points || 0,
                        badges: u.badges || [],
                        eventsAttended: u.eventsAttended || 0,
                        streak: u.streak || 0,
                    }));
                    setLeaderboardData(normalized);
                }
                // If Firestore is empty, keep mock data
            } catch (err) {
                console.error("Leaderboard fetch error:", err);
                // Fall back to mock data on error
            }
            setLoading(false);
        }
        fetchLeaderboard();
    }, []);

    return (
        <>
            <Head>
                <title>Leaderboard — SENTINEX</title>
                <meta name="description" content="Track rankings, points, and achievement badges." />
            </Head>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        🏆 <span style={{ color: "#39FF14" }}>Leaderboard</span>
                    </h1>
                    <p className="text-sm" style={{ color: "#64748b" }}>Top community members ranked by points and achievements</p>
                </motion.div>

                {/* Top 3 podium */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-4 animate-pulse">⚡</div>
                        <p className="text-sm" style={{ color: "#39FF14" }}>Loading rankings...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto">
                        {[1, 0, 2].map((idx) => {
                            const user = leaderboardData[idx];
                            if (!user) return null;
                            const isFirst = idx === 0;
                            return (
                                <motion.div
                                    key={user.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.15 }}
                                    className={`glass-card p-4 text-center ${isFirst ? "md:-mt-4" : ""}`}
                                    style={isFirst ? { border: "1px solid rgba(255,170,0,0.3)", boxShadow: "0 0 30px rgba(255,170,0,0.08)" } : {}}
                                >
                                    <div className="text-4xl mb-2">{user.avatar}</div>
                                    <div className="text-2xl mb-1">{idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}</div>
                                    <div className="text-sm font-bold text-white">{user.username}</div>
                                    <div className="text-lg font-black mt-1" style={{ color: "#00ff9d" }}>{(user.points || 0).toLocaleString()}</div>
                                    <div className="text-[10px] uppercase tracking-wider" style={{ color: "#64748b" }}>points</div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    {[
                        { id: "rankings", label: "📊 Full Rankings" },
                        { id: "badges", label: "🏅 Badges" },
                        { id: "points", label: "⚡ Point System" },
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                            style={{
                                background: tab === t.id ? "rgba(57,255,20,0.15)" : "rgba(255,255,255,0.03)",
                                color: tab === t.id ? "#39FF14" : "#64748b",
                                border: `1px solid ${tab === t.id ? "rgba(57,255,20,0.3)" : "rgba(255,255,255,0.05)"}`,
                            }}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {tab === "rankings" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card overflow-hidden">
                        <LeaderboardTable data={leaderboardData} />
                    </motion.div>
                )}

                {tab === "badges" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.entries(badgeData).map(([name, info]) => (
                            <div key={name} className="glass-card p-6 text-center">
                                <div className="text-4xl mb-3">{info.icon}</div>
                                <h3 className="text-sm font-bold text-white mb-1">{name}</h3>
                                <p className="text-xs" style={{ color: "#94a3b8" }}>{info.description}</p>
                                <div className="w-8 h-0.5 mx-auto mt-3 rounded-full" style={{ background: info.color }} />
                            </div>
                        ))}
                    </motion.div>
                )}

                {tab === "points" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Point System</h3>
                        <div className="space-y-3">
                            {Object.entries(pointSystem).map(([activity, points]) => (
                                <div key={activity} className="flex items-center justify-between py-3 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
                                    <span className="text-sm capitalize text-white">{activity.replace(/([A-Z])/g, " $1")}</span>
                                    <span className="text-sm font-bold" style={{ color: "#00ff9d" }}>+{points} pts</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </>
    );
}
