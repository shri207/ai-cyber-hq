import { motion } from "framer-motion";
import { badges as badgeData } from "@/lib/mockData";

export default function ProfileCard({ profile }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8"
        >
            {/* Avatar & Name */}
            <div className="text-center mb-6">
                <div className="text-6xl mb-3">{profile.avatar}</div>
                <h2 className="text-2xl font-bold text-white">{profile.username}</h2>
                <p className="text-xs mt-1" style={{ color: "#64748b" }}>Member since {profile.joinDate}</p>
                {profile.team && (
                    <span className="badge-chip mt-2 inline-block">🛡️ {profile.team}</span>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                    { label: "Rank", value: `#${profile.rank}`, color: "#ffaa00" },
                    { label: "Points", value: profile.points.toLocaleString(), color: "#00ff9d" },
                    { label: "Events", value: profile.eventsAttended, color: "#39FF14" },
                ].map((stat) => (
                    <div key={stat.label} className="text-center py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-[10px] uppercase tracking-wider mt-1" style={{ color: "#64748b" }}>{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Bio */}
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#94a3b8" }}>{profile.bio}</p>

            {/* Skills */}
            <div className="mb-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#64748b" }}>Skills</h4>
                <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                        <span key={skill} className="text-xs px-3 py-1 rounded-lg" style={{ background: "rgba(0,230,118,0.08)", color: "#69f0ae", border: "1px solid rgba(0,230,118,0.15)" }}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Badges */}
            <div className="mb-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#64748b" }}>Badges</h4>
                <div className="flex flex-wrap gap-2">
                    {profile.badges.map((b) => {
                        const info = badgeData[b] || {};
                        return (
                            <span key={b} className="badge-chip-green text-[11px]">
                                {info.icon} {b}
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* Links */}
            <div className="flex gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {profile.github && (
                    <a href={profile.github} target="_blank" rel="noreferrer" className="btn-neon btn-neon-cyan text-xs !py-2 !px-4 flex-1 text-center">
                        GitHub ↗
                    </a>
                )}
                {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-neon btn-neon-purple text-xs !py-2 !px-4 flex-1 text-center">
                        LinkedIn ↗
                    </a>
                )}
            </div>
        </motion.div>
    );
}
