import { motion } from "framer-motion";

export default function TeamCard({ team, onJoin }) {
    const isFull = team.members.length >= team.maxMembers;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="text-lg font-bold text-white">{team.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>Led by <span style={{ color: "#00f7ff" }}>{team.leader}</span></p>
                </div>
                <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                        background: isFull ? "rgba(100,116,139,0.1)" : "rgba(0,255,157,0.1)",
                        color: isFull ? "#64748b" : "#00ff9d",
                    }}
                >
                    {team.status}
                </span>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#94a3b8" }}>
                {team.description}
            </p>

            {/* Members */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium" style={{ color: "#64748b" }}>Members</span>
                    <span className="text-xs" style={{ color: "#00f7ff" }}>
                        {team.members.length}/{team.maxMembers}
                    </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {team.members.map((m) => (
                        <span key={m} className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(0,247,255,0.06)", color: "#94a3b8" }}>
                            {m}
                        </span>
                    ))}
                    {Array.from({ length: team.maxMembers - team.members.length }).map((_, i) => (
                        <span key={`empty-${i}`} className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", color: "#334155" }}>
                            Empty
                        </span>
                    ))}
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {team.tags.map((tag) => (
                    <span key={tag} className="badge-chip-purple text-[10px]">{tag}</span>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <span className="text-xs font-semibold" style={{ color: "#00ff9d" }}>⚡ {team.points} pts</span>
                {!isFull ? (
                    <button
                        className="btn-neon btn-neon-cyan text-xs !py-1.5 !px-4"
                        onClick={() => onJoin && onJoin(team)}
                    >
                        Request to Join
                    </button>
                ) : (
                    <span className="text-xs" style={{ color: "#475569" }}>Team Full</span>
                )}
            </div>
        </motion.div>
    );
}
