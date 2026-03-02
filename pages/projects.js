import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { mockProjects } from "@/lib/extendedMockData";
import { useNotifications } from "@/lib/NotificationContext";

export default function Projects() {
    const [projects, setProjects] = useState(mockProjects);
    const [showSubmit, setShowSubmit] = useState(false);
    const [search, setSearch] = useState("");
    const [formData, setFormData] = useState({
        name: "", description: "", techStack: "", githubLink: "",
    });
    const { showToast } = useNotifications();

    const filtered = projects.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase()) ||
            p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );

    const handleLike = (id) => {
        setProjects((prev) =>
            prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
        );
    };

    const handleSubmitProject = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) return;
        const newProject = {
            id: `proj${Date.now()}`,
            name: formData.name,
            author: "You",
            avatar: "😎",
            description: formData.description,
            techStack: formData.techStack.split(",").map((s) => s.trim()).filter(Boolean),
            githubLink: formData.githubLink,
            likes: 0,
            screenshots: [],
        };
        setProjects([newProject, ...projects]);
        setFormData({ name: "", description: "", techStack: "", githubLink: "" });
        setShowSubmit(false);
        showToast(`Project "${newProject.name}" submitted successfully!`, "Project Submitted");
    };

    return (
        <>
            <Head>
                <title>Project Showcase — SENTINEX</title>
                <meta name="description" content="Showcase your projects and discover what the community is building." />
            </Head>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">
                                🚀 <span style={{ color: "#39FF14" }}>Project Showcase</span>
                            </h1>
                            <p className="text-sm" style={{ color: "#64748b" }}>Discover and share community projects</p>
                        </div>
                        <button
                            onClick={() => setShowSubmit(!showSubmit)}
                            className="btn-neon btn-solid-cyan text-sm"
                        >
                            ➕ Submit Project
                        </button>
                    </div>
                </motion.div>

                {/* Search */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-6">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="🔍 Search projects by name, description, or tech stack..."
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(57,255,20,0.1)", color: "#fff" }}
                    />
                </motion.div>

                {/* Submit Project Form */}
                <AnimatePresence>
                    {showSubmit && (
                        <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="glass-card p-6 mb-8 overflow-hidden"
                            onSubmit={handleSubmitProject}
                        >
                            <h3 className="text-lg font-bold text-white mb-4">Submit Your Project</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-medium block mb-1" style={{ color: "#94a3b8" }}>Project Name *</label>
                                    <input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. CyberGuard Pro"
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(57,255,20,0.1)", color: "#fff" }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium block mb-1" style={{ color: "#94a3b8" }}>Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        placeholder="Describe your project..."
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(57,255,20,0.1)", color: "#fff" }}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium block mb-1" style={{ color: "#94a3b8" }}>Tech Stack (comma separated)</label>
                                        <input
                                            value={formData.techStack}
                                            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                            placeholder="React, Python, TensorFlow"
                                            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(57,255,20,0.1)", color: "#fff" }}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium block mb-1" style={{ color: "#94a3b8" }}>GitHub Link</label>
                                        <input
                                            value={formData.githubLink}
                                            onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                                            placeholder="https://github.com/..."
                                            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(57,255,20,0.1)", color: "#fff" }}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button type="submit" className="btn-neon btn-solid-cyan text-sm">🚀 Submit</button>
                                    <button type="button" onClick={() => setShowSubmit(false)} className="btn-neon btn-neon-purple text-sm">Cancel</button>
                                </div>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-card p-6"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl">{project.avatar}</span>
                                <div>
                                    <h3 className="text-base font-bold text-white">{project.name}</h3>
                                    <p className="text-[10px]" style={{ color: "#64748b" }}>by {project.author}</p>
                                </div>
                            </div>

                            <p className="text-xs mb-4 leading-relaxed" style={{ color: "#94a3b8" }}>
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="badge-chip text-[10px]">{tech}</span>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                <button
                                    onClick={() => handleLike(project.id)}
                                    className="flex items-center gap-1.5 text-xs transition-colors"
                                    style={{ color: "#94a3b8" }}
                                >
                                    ❤️ <span style={{ color: "#ff6b6b" }}>{project.likes}</span>
                                </button>
                                {project.githubLink && (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-medium transition-colors"
                                        style={{ color: "#39FF14" }}
                                    >
                                        GitHub →
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-4xl mb-4">🔍</div>
                        <p className="text-lg" style={{ color: "#475569" }}>No projects found.</p>
                    </div>
                )}
            </div>
        </>
    );
}
