import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import TeamCard from "@/components/ui/TeamCard";
import { mockTeams } from "@/lib/mockData";

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
                <title>Teams — AI × CYBER HQ</title>
                <meta name="description" content="Form teams, request to join existing squads, and compete together." />
            </Head>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">
                                👥 <span style={{ color: "#00f7ff" }}>Teams</span>
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
                                color: filter === f ? "#00f7ff" : "#64748b",
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
            </div>
        </>
    );
}
