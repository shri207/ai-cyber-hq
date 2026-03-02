import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { mockChallenges, challengeCategories } from "@/lib/extendedMockData";
import { useNotifications } from "@/lib/NotificationContext";

export default function Arena() {
    const [category, setCategory] = useState("all");
    const [challenges, setChallenges] = useState(mockChallenges);
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [totalPoints, setTotalPoints] = useState(0);
    const { showToast } = useNotifications();

    const filtered = category === "all"
        ? challenges
        : challenges.filter((c) => c.category === category);

    const difficultyColor = {
        Easy: "#39FF14",
        Medium: "#ffaa00",
        Hard: "#ff4444",
    };

    const handleSolve = (challenge) => {
        setSelectedChallenge(challenge);
        setAnswer("");
        setFeedback("");
    };

    const handleSubmitAnswer = (e) => {
        e.preventDefault();
        if (!selectedChallenge) return;
        if (answer.trim().toLowerCase() === selectedChallenge.answer.toLowerCase()) {
            setChallenges((prev) =>
                prev.map((c) => (c.id === selectedChallenge.id ? { ...c, solved: true } : c))
            );
            setTotalPoints((p) => p + selectedChallenge.points);
            setFeedback("✅ Correct! +" + selectedChallenge.points + " points earned!");
            showToast(`You solved "${selectedChallenge.title}" and earned ${selectedChallenge.points} points!`, "Challenge Completed!");
            setTimeout(() => {
                setSelectedChallenge(null);
                setFeedback("");
            }, 2000);
        } else {
            setFeedback("❌ Incorrect. Try again or use the hint.");
        }
    };

    const solvedCount = challenges.filter((c) => c.solved).length;
    const progressPercent = (solvedCount / challenges.length) * 100;

    return (
        <>
            <Head>
                <title>Challenge Arena — SENTINEX</title>
                <meta name="description" content="Practice cybersecurity skills with interactive challenges." />
            </Head>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        🎯 <span style={{ color: "#39FF14" }}>Challenge Arena</span>
                    </h1>
                    <p className="text-sm" style={{ color: "#64748b" }}>
                        Test your cybersecurity skills — solve challenges, earn points, climb the leaderboard
                    </p>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 mb-8"
                >
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex gap-6">
                            <div>
                                <div className="text-2xl font-black" style={{ color: "#39FF14" }}>{totalPoints}</div>
                                <div className="text-[10px] uppercase tracking-wider" style={{ color: "#64748b" }}>Points Earned</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black" style={{ color: "#00e676" }}>{solvedCount}/{challenges.length}</div>
                                <div className="text-[10px] uppercase tracking-wider" style={{ color: "#64748b" }}>Solved</div>
                            </div>
                        </div>
                        <div className="badge-chip">
                            {solvedCount >= 5 ? "🏆 Challenge Hunter" : solvedCount >= 1 ? "🔰 Getting Started" : "🔒 No Badges Yet"}
                        </div>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(57,255,20,0.08)" }}>
                        <motion.div
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(90deg, #39FF14, #00e676)" }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </div>
                </motion.div>

                {/* Category Filters */}
                <div className="flex gap-2 mb-8 flex-wrap">
                    {challengeCategories.map((cat) => (
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

                {/* Challenge Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map((challenge, i) => (
                        <motion.div
                            key={challenge.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-card p-6 relative overflow-hidden"
                            style={challenge.solved ? { border: "1px solid rgba(57,255,20,0.3)" } : {}}
                        >
                            {challenge.solved && (
                                <div className="absolute top-3 right-3 text-lg">✅</div>
                            )}
                            {/* Terminal-style header */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full" style={{ background: "#ff5f56" }} />
                                <span className="w-2 h-2 rounded-full" style={{ background: "#ffbd2e" }} />
                                <span className="w-2 h-2 rounded-full" style={{ background: "#27c93f" }} />
                                <span className="text-[10px] font-mono ml-2" style={{ color: "#475569" }}>challenge://{challenge.id}</span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2">{challenge.title}</h3>
                            <p className="text-xs mb-4" style={{ color: "#94a3b8" }}>{challenge.description}</p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="px-2 py-0.5 rounded text-[10px] font-bold"
                                        style={{
                                            background: `${difficultyColor[challenge.difficulty]}15`,
                                            color: difficultyColor[challenge.difficulty],
                                            border: `1px solid ${difficultyColor[challenge.difficulty]}30`,
                                        }}
                                    >
                                        {challenge.difficulty}
                                    </span>
                                    <span className="text-xs font-bold" style={{ color: "#00ff9d" }}>
                                        +{challenge.points} pts
                                    </span>
                                </div>
                                {!challenge.solved && (
                                    <button
                                        onClick={() => handleSolve(challenge)}
                                        className="btn-neon btn-neon-cyan text-xs !py-1.5 !px-4"
                                    >
                                        ⚡ Solve
                                    </button>
                                )}
                            </div>
                            <div className="text-[10px] mt-2" style={{ color: "#475569" }}>
                                Category: {challenge.category}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Solve Modal */}
                <AnimatePresence>
                    {selectedChallenge && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
                            onClick={() => setSelectedChallenge(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="glass-card p-8 max-w-lg w-full"
                                onClick={(e) => e.stopPropagation()}
                                style={{ border: "1px solid rgba(57,255,20,0.2)" }}
                            >
                                {/* Terminal header */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f56" }} />
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#27c93f" }} />
                                    <span className="text-xs font-mono ml-2" style={{ color: "#39FF14" }}>sentinel@arena:~$</span>
                                </div>

                                <h2 className="text-xl font-bold text-white mb-2">{selectedChallenge.title}</h2>
                                <p className="text-sm mb-4" style={{ color: "#94a3b8" }}>{selectedChallenge.description}</p>

                                <div className="p-3 rounded-lg mb-4" style={{ background: "rgba(57,255,20,0.05)", border: "1px solid rgba(57,255,20,0.1)" }}>
                                    <p className="text-xs font-mono" style={{ color: "#39FF14" }}>
                                        💡 Hint: {selectedChallenge.hint}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmitAnswer} className="space-y-4">
                                    <input
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        placeholder="Enter your answer..."
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none font-mono"
                                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(57,255,20,0.1)", color: "#fff" }}
                                        autoFocus
                                    />

                                    {feedback && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-sm font-medium"
                                            style={{ color: feedback.startsWith("✅") ? "#39FF14" : "#ff4444" }}
                                        >
                                            {feedback}
                                        </motion.p>
                                    )}

                                    <div className="flex gap-3">
                                        <button type="submit" className="btn-neon btn-solid-cyan text-sm flex-1">
                                            🚀 Submit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedChallenge(null)}
                                            className="btn-neon btn-neon-purple text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
