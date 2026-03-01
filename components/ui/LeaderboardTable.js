import { motion } from "framer-motion";

export default function LeaderboardTable({ data }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr style={{ borderBottom: "1px solid rgba(0,247,255,0.1)" }}>
                        {["Rank", "Player", "Points", "Badges", "Events", "Streak"].map((h) => (
                            <th key={h} className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-wider" style={{ color: "#64748b" }}>
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, i) => (
                        <motion.tr
                            key={user.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group"
                            style={{
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                                background: i < 3 ? `rgba(0,247,255,${0.04 - i * 0.01})` : "transparent",
                            }}
                        >
                            {/* Rank */}
                            <td className="py-4 px-4">
                                <span
                                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold"
                                    style={{
                                        background: i === 0 ? "rgba(255,170,0,0.15)" : i === 1 ? "rgba(192,192,192,0.1)" : i === 2 ? "rgba(205,127,50,0.1)" : "rgba(255,255,255,0.03)",
                                        color: i === 0 ? "#ffaa00" : i === 1 ? "#c0c0c0" : i === 2 ? "#cd7f32" : "#64748b",
                                    }}
                                >
                                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : user.rank}
                                </span>
                            </td>

                            {/* Player */}
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{user.avatar}</span>
                                    <span className="font-semibold text-white group-hover:text-[#00f7ff] transition-colors">
                                        {user.username}
                                    </span>
                                </div>
                            </td>

                            {/* Points */}
                            <td className="py-4 px-4">
                                <span className="font-bold" style={{ color: "#00ff9d" }}>{user.points.toLocaleString()}</span>
                            </td>

                            {/* Badges */}
                            <td className="py-4 px-4">
                                <div className="flex flex-wrap gap-1">
                                    {user.badges.slice(0, 2).map((b) => (
                                        <span key={b} className="badge-chip text-[10px]">{b}</span>
                                    ))}
                                    {user.badges.length > 2 && (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ color: "#64748b" }}>
                                            +{user.badges.length - 2}
                                        </span>
                                    )}
                                </div>
                            </td>

                            {/* Events */}
                            <td className="py-4 px-4" style={{ color: "#94a3b8" }}>{user.eventsAttended}</td>

                            {/* Streak */}
                            <td className="py-4 px-4">
                                <span style={{ color: "#ffaa00" }}>🔥 {user.streak}</span>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
