import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import TeamCard from "@/components/ui/TeamCard";
import { mockTeams } from "@/lib/mockData";
import { mockMatchProfiles } from "@/lib/extendedMockData";

export default function Teams() {
    const [showCreate, setShowCreate] = useState(false);
    const [filter, setFilter] = useState("All");
    const [joinMsg, setJoinMsg] = useState("");
    const [teamName, setTeamName] = useState("");
    const [teamDesc, setTeamDesc] = useState("");

    const filtered = filter === "All" ? mockTeams : mockTeams.filter((t) => t.status === filter);

    const handleJoin = (team) => {
        setJoinMsg(`✅ Request sent to join "${team.name}"! The team leader will review it.`);
        setTimeout(() => setJoinMsg(""), 4000);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        if (teamName.trim()) {
            setJoinMsg(`🎉 Team "${teamName}" created successfully! You are the team leader.`);
            setTeamName("");
            setTeamDesc("");
            setShowCreate(false);
            setTimeout(() => setJoinMsg(""), 4000);
        }
    };

    return (
        <>
            <Head>
                <title>Teams — SENTINEX</title>
                <meta name="description" content="Form teams, request to join existing squads, and compete together." />
            </Head>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">
                                👥 <span style={{ color: "#39FF14" }}>Teams</span>
                            </h1>
                            <p className="text-sm" style={{ color: "#64748b" }}>Create or join teams of up to 4 members</p>
                        </div>
                        <button onClick={() => setShowCreate(!showCreate)} className="btn-neon btn-solid-cyan text-sm">
                            ➕ Create Team
                        </button>
                    </div>
                </motion.div>

                {/* Toast */}
                <AnimatePresence>
                    {joinMsg && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-6 p-4 rounded-xl text-sm"
                            style={{ background: "rgba(0,255,157,0.1)", border: "1px solid rgba(0,255,157,0.2)", color: "#00ff9d" }}
                        >
                            {joinMsg}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Create Team Form */}
                <AnimatePresence>
                    {showCreate && (
                        <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="glass-card p-6 mb-8 overflow-hidden"
                            onSubmit={handleCreate}
                        >
                            <h3 className="text-lg font-bold text-white mb-4">Create New Team</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-medium block mb-1" style={{ color: "#94a3b8" }}>Team Name</label>
                                    <input
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                        placeholder="e.g. Packet Storms"
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,247,255,0.1)", color: "#fff" }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium block mb-1" style={{ color: "#94a3b8" }}>Description</label>
                                    <textarea
                                        value={teamDesc}
                                        onChange={(e) => setTeamDesc(e.target.value)}
                                        rows={3}
                                        placeholder="Describe your team focus and what you're looking for..."
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,247,255,0.1)", color: "#fff" }}
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button type="submit" className="btn-neon btn-solid-cyan text-sm">
                                        🚀 Create
                                    </button>
                                    <button type="button" onClick={() => setShowCreate(false)} className="btn-neon btn-neon-purple text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Filters */}
                <div className="flex gap-2 mb-8">
                    {["All", "Recruiting", "Full"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                            style={{
                                background: filter === f ? "rgba(0,247,255,0.15)" : "rgba(255,255,255,0.03)",
                                color: filter === f ? "#39FF14" : "#64748b",
                                border: `1px solid ${filter === f ? "rgba(0,247,255,0.3)" : "rgba(255,255,255,0.05)"}`,
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Team Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map((team) => (
                        <TeamCard key={team.id} team={team} onJoin={handleJoin} />
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-lg" style={{ color: "#475569" }}>No teams found for this filter.</p>
                    </div>
                )}

                {/* ─── Recommended Teammates (Skill Matchmaking) ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12"
                >
                    <h2 className="text-2xl font-bold text-white mb-2">
                        🤝 <span style={{ color: "#39FF14" }}>Recommended Teammates</span>
                    </h2>
                    <p className="text-sm mb-6" style={{ color: "#64748b" }}>
                        Matched based on skills, interests, and participation
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockMatchProfiles.map((profile, i) => (
                            <motion.div
                                key={profile.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.05 }}
                                className="glass-card p-5"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">{profile.avatar}</span>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-white">{profile.name}</div>
                                        <div className="text-[10px]" style={{ color: "#64748b" }}>Match Score</div>
                                    </div>
                                    <div
                                        className="text-lg font-black"
                                        style={{ color: profile.matchScore >= 85 ? "#39FF14" : profile.matchScore >= 70 ? "#ffaa00" : "#94a3b8" }}
                                    >
                                        {profile.matchScore}%
                                    </div>
                                </div>
                                {/* Match score bar */}
                                <div className="w-full h-1.5 rounded-full mb-3" style={{ background: "rgba(57,255,20,0.08)" }}>
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ background: profile.matchScore >= 85 ? "#39FF14" : profile.matchScore >= 70 ? "#ffaa00" : "#94a3b8" }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${profile.matchScore}%` }}
                                        transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                                    />
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {profile.skills.map((skill) => (
                                        <span key={skill} className="badge-chip text-[10px]">{skill}</span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => handleJoin({ name: profile.name })}
                                    className="w-full btn-neon btn-neon-cyan text-xs !py-2 text-center"
                                >
                                    👥 Invite to Team
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </>
    );
}
