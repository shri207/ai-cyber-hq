import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { mockResources, resourceCategories } from "@/lib/extendedMockData";

const difficultyColor = {
    Beginner: "#39FF14",
    Intermediate: "#ffaa00",
    Advanced: "#ff4444",
};

const typeIcon = {
    Platform: "🌐",
    Course: "🎓",
    Tool: "🔧",
    Guide: "📖",
    CTF: "🏴",
};

export default function Resources() {
    const [category, setCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [diffFilter, setDiffFilter] = useState("All");

    const filtered = useMemo(() => {
        return mockResources.filter((r) => {
            const matchCat = category === "all" || r.category === category;
            const matchSearch =
                !search ||
                r.title.toLowerCase().includes(search.toLowerCase()) ||
                r.description.toLowerCase().includes(search.toLowerCase());
            const matchDiff = diffFilter === "All" || r.difficulty === diffFilter;
            return matchCat && matchSearch && matchDiff;
        });
    }, [category, search, diffFilter]);

    return (
        <>
            <Head>
                <title>Resource Library — SENTINEX</title>
                <meta name="description" content="Central learning hub for cybersecurity, AI, and networking resources." />
            </Head>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        📚 <span style={{ color: "#39FF14" }}>Resource Library</span>
                    </h1>
                    <p className="text-sm" style={{ color: "#64748b" }}>
                        Curated learning paths, free courses, CTF practice sites, and cybersecurity tools
                    </p>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 mb-8"
                >
                    <div className="flex flex-wrap gap-4 mb-4">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="🔍 Search resources..."
                            className="flex-1 min-w-[250px] px-4 py-3 rounded-xl text-sm outline-none"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(57,255,20,0.1)", color: "#fff" }}
                        />
                        <select
                            value={diffFilter}
                            onChange={(e) => setDiffFilter(e.target.value)}
                            className="px-4 py-3 rounded-xl text-sm outline-none cursor-pointer"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(57,255,20,0.1)", color: "#94a3b8" }}
                        >
                            <option value="All">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                    {/* Category pills */}
                    <div className="flex gap-2 flex-wrap">
                        {resourceCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setCategory(cat.id)}
                                className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                                style={{
                                    background: category === cat.id ? "rgba(57,255,20,0.15)" : "rgba(255,255,255,0.03)",
                                    color: category === cat.id ? "#39FF14" : "#64748b",
                                    border: `1px solid ${category === cat.id ? "rgba(57,255,20,0.3)" : "rgba(255,255,255,0.05)"}`,
                                }}
                            >
                                {cat.icon} {cat.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Resource Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((resource, i) => (
                        <motion.a
                            key={resource.id}
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-card p-6 block group cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-2xl">{typeIcon[resource.type] || "📄"}</span>
                                <span
                                    className="px-2 py-0.5 rounded text-[10px] font-bold"
                                    style={{
                                        background: `${difficultyColor[resource.difficulty]}15`,
                                        color: difficultyColor[resource.difficulty],
                                        border: `1px solid ${difficultyColor[resource.difficulty]}30`,
                                    }}
                                >
                                    {resource.difficulty}
                                </span>
                            </div>
                            <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#39FF14] transition-colors">
                                {resource.title}
                            </h3>
                            <p className="text-xs mb-4 leading-relaxed" style={{ color: "#94a3b8" }}>
                                {resource.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="badge-chip text-[10px]">{resource.category}</span>
                                <span className="text-xs font-medium" style={{ color: "#39FF14" }}>
                                    {resource.type} →
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-4xl mb-4">🔍</div>
                        <p className="text-lg" style={{ color: "#475569" }}>No resources match your filters.</p>
                    </div>
                )}

                {/* Quick Links Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-12"
                >
                    <h2 className="text-2xl font-bold text-white mb-6">⚡ Quick Start Roadmaps</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: "Ethical Hacking", steps: "Linux → Networking → OWASP → CTFs → Bug Bounty", icon: "🏴‍☠️", color: "#39FF14" },
                            { title: "Machine Learning", steps: "Python → Math → Sklearn → Deep Learning → MLOps", icon: "🧠", color: "#00e676" },
                            { title: "Digital Forensics", steps: "OS Basics → File Systems → Memory → Network → IR", icon: "🔍", color: "#ffaa00" },
                            { title: "Network Security", steps: "TCP/IP → Wireshark → Firewalls → IDS/IPS → SIEM", icon: "🌐", color: "#a78bfa" },
                        ].map((r) => (
                            <div key={r.title} className="glass-card p-5">
                                <div className="text-2xl mb-3">{r.icon}</div>
                                <h3 className="text-sm font-bold text-white mb-2">{r.title}</h3>
                                <p className="text-[11px] leading-relaxed" style={{ color: "#94a3b8" }}>
                                    {r.steps}
                                </p>
                                <div className="w-full h-0.5 mt-3 rounded-full" style={{ background: r.color + "30" }}>
                                    <div className="h-full rounded-full" style={{ background: r.color, width: "40%" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </>
    );
}
