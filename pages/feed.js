import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import FeedPost from "@/components/ui/FeedPost";
import { mockFeed } from "@/lib/mockData";

const tagFilters = ["All", "#AI", "#Cyber", "#CTF", "#Malware"];

export default function Feed() {
    const [filter, setFilter] = useState("All");
    const [newPost, setNewPost] = useState("");
    const [newTags, setNewTags] = useState("");
    const [posts, setPosts] = useState(mockFeed);

    const filtered = filter === "All" ? posts : posts.filter((p) => p.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase().replace("#", ""))));

    const handlePost = (e) => {
        e.preventDefault();
        if (!newPost.trim()) return;
        const tags = newTags.split(",").map((t) => t.trim()).filter(Boolean).map((t) => t.startsWith("#") ? t : `#${t}`);
        const post = {
            id: `p${Date.now()}`,
            author: "You",
            avatar: "😎",
            content: newPost,
            tags: tags.length ? tags : ["#General"],
            likes: 0,
            comments: 0,
            timestamp: "Just now",
        };
        setPosts([post, ...posts]);
        setNewPost("");
        setNewTags("");
    };

    return (
        <>
            <Head>
                <title>Community Feed — SENTINEX</title>
                <meta name="description" content="Post ideas, share writeups, discuss AI and cybersecurity topics." />
            </Head>

            <div className="max-w-3xl mx-auto px-6 py-12">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        💬 <span style={{ color: "#39FF14" }}>Community Feed</span>
                    </h1>
                    <p className="text-sm" style={{ color: "#64748b" }}>Share ideas, post writeups, and discuss with the community</p>
                </motion.div>

                {/* New Post Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handlePost}
                    className="glass-card p-6 mb-6"
                >
                    <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        rows={3}
                        placeholder="Share something with the community..."
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none mb-3"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,247,255,0.1)", color: "#fff" }}
                    />
                    <div className="flex flex-wrap items-center gap-3">
                        <input
                            value={newTags}
                            onChange={(e) => setNewTags(e.target.value)}
                            placeholder="Tags (comma separated, e.g. #AI, #CTF)"
                            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg text-xs outline-none"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,247,255,0.06)", color: "#94a3b8" }}
                        />
                        <button type="submit" className="btn-neon btn-solid-cyan text-xs">
                            📤 Post
                        </button>
                    </div>
                </motion.form>

                {/* Filters */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    {tagFilters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                            style={{
                                background: filter === f ? "rgba(122,0,255,0.15)" : "rgba(255,255,255,0.03)",
                                color: filter === f ? "#a78bfa" : "#64748b",
                                border: `1px solid ${filter === f ? "rgba(122,0,255,0.3)" : "rgba(255,255,255,0.05)"}`,
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Posts */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {filtered.map((post) => (
                            <FeedPost key={post.id} post={post} />
                        ))}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <p style={{ color: "#475569" }}>No posts matching this filter.</p>
                    </div>
                )}
            </div>
        </>
    );
}
