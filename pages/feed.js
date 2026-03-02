import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import FeedPost from "@/components/ui/FeedPost";
import { mockFeed } from "@/lib/mockData";
import { mockPolls } from "@/lib/extendedMockData";

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

                {/* ─── Community Polls ─── */}
                <PollSection />
            </div>
        </>
    );
}

function PollSection() {
    const [polls, setPolls] = useState(mockPolls);
    const [votedPolls, setVotedPolls] = useState({});

    const handleVote = (pollId, optionIdx) => {
        if (votedPolls[pollId] !== undefined) return;
        setVotedPolls((prev) => ({ ...prev, [pollId]: optionIdx }));
        setPolls((prev) =>
            prev.map((p) => {
                if (p.id !== pollId) return p;
                const newOptions = p.options.map((opt, i) => ({
                    ...opt,
                    votes: i === optionIdx ? opt.votes + 1 : opt.votes,
                }));
                return { ...p, options: newOptions, totalVotes: p.totalVotes + 1 };
            })
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10"
        >
            <h2 className="text-2xl font-bold text-white mb-6">
                📊 <span style={{ color: "#39FF14" }}>Community Polls</span>
            </h2>
            <div className="space-y-4">
                {polls.map((poll) => (
                    <div key={poll.id} className="glass-card p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xl">{poll.avatar}</span>
                            <span className="text-sm font-medium text-white">{poll.author}</span>
                            <span className="text-[10px]" style={{ color: "#475569" }}>• {poll.timestamp}</span>
                        </div>
                        <h3 className="text-base font-bold text-white mb-4">{poll.question}</h3>
                        <div className="space-y-2">
                            {poll.options.map((opt, i) => {
                                const pct = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
                                const isVoted = votedPolls[poll.id] === i;
                                const hasVoted = votedPolls[poll.id] !== undefined;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleVote(poll.id, i)}
                                        disabled={hasVoted}
                                        className="w-full text-left p-3 rounded-lg relative overflow-hidden transition-all"
                                        style={{
                                            background: "rgba(255,255,255,0.02)",
                                            border: `1px solid ${isVoted ? "rgba(57,255,20,0.3)" : "rgba(255,255,255,0.05)"}`,
                                            cursor: hasVoted ? "default" : "pointer",
                                        }}
                                    >
                                        {/* Progress fill */}
                                        {hasVoted && (
                                            <motion.div
                                                className="absolute left-0 top-0 bottom-0 rounded-lg"
                                                style={{ background: "rgba(57,255,20,0.08)" }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${pct}%` }}
                                                transition={{ duration: 0.6 }}
                                            />
                                        )}
                                        <div className="relative flex items-center justify-between">
                                            <span className="text-xs font-medium text-white">{opt.label}</span>
                                            {hasVoted && (
                                                <span className="text-xs font-bold" style={{ color: "#39FF14" }}>{pct}%</span>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        <div className="text-[10px] mt-3" style={{ color: "#475569" }}>
                            {poll.totalVotes} votes
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
