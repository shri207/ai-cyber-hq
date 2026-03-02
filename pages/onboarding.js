import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserProfile, createOrUpdateUserProfile } from "@/lib/firestore";

const SKILL_OPTIONS = [
    "Python", "JavaScript", "Rust", "Go", "C/C++",
    "Reverse Engineering", "Machine Learning", "Deep Learning",
    "Network Security", "Web Exploitation", "Cryptography",
    "Digital Forensics", "Malware Analysis", "Cloud Security",
    "Penetration Testing", "OSINT", "Blockchain", "IoT Security",
    "AI/ML Security", "Incident Response",
];

const AVATAR_OPTIONS = ["🧑‍💻", "👾", "🤖", "🦹", "🥷", "🧙", "👽", "🦾"];

export default function Onboarding() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [step, setStep] = useState(0); // 0 = basics, 1 = skills, 2 = links

    // Form state
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("🧑‍💻");
    const [team, setTeam] = useState("");
    const [skills, setSkills] = useState([]);
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                router.push("/login");
                return;
            }
            setUser(currentUser);

            // Pre-fill from existing profile or auth data
            try {
                const profile = await Promise.race([
                    getUserProfile(currentUser.uid),
                    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 3000)),
                ]);

                if (profile && profile.onboardingComplete) {
                    // Already completed onboarding
                    router.push("/profile");
                    return;
                }

                // Pre-fill what we can
                if (profile) {
                    setUsername(profile.username || currentUser.displayName || "");
                    setBio(profile.bio || "");
                    setAvatar(profile.avatar || "🧑‍💻");
                    setTeam(profile.team || "");
                    setSkills(profile.skills || []);
                    setGithub(profile.github || "");
                    setLinkedin(profile.linkedin || "");
                } else {
                    setUsername(currentUser.displayName || currentUser.email?.split("@")[0] || "");
                }
            } catch {
                // Firestore blocked or timeout — just use auth data
                setUsername(currentUser.displayName || currentUser.email?.split("@")[0] || "");
            }

            setLoading(false);
        });
        return () => unsub();
    }, [router]);

    const toggleSkill = (skill) => {
        setSkills((prev) =>
            prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
        );
    };

    const handleSubmit = async () => {
        if (!username.trim()) return;
        setSaving(true);
        try {
            const profileData = {
                username: username.trim(),
                email: user.email || "",
                avatar,
                bio: bio.trim() || "SENTINEX operative ready for deployment.",
                team: team.trim() || null,
                skills,
                github: github.trim(),
                linkedin: linkedin.trim(),
                joinDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
                points: 0,
                rank: 999,
                eventsAttended: 0,
                streak: 0,
                badges: [],
                onboardingComplete: true,
            };

            // Wrap in a timeout because Firestore queues writes indefinitely if unreachable
            const savePromise = createOrUpdateUserProfile(user.uid, profileData);
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Save timeout")), 3000));

            await Promise.race([savePromise, timeoutPromise]);

            router.push("/profile");
        } catch (err) {
            console.error("Onboarding save error or timeout:", err);
            // Still redirect even if Firestore fails or times out
            router.push("/profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4 animate-pulse">⚡</div>
                    <p className="text-sm" style={{ color: "#39FF14" }}>Initializing onboarding...</p>
                </div>
            </div>
        );
    }

    const inputStyle = {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(57,255,20,0.12)",
        color: "#fff",
    };

    const steps = [
        {
            title: "Tell us about yourself",
            subtitle: "Choose your avatar, callsign, and write a short bio",
            icon: "👾",
        },
        {
            title: "Select your skills",
            subtitle: "Pick the areas you're interested in or proficient at",
            icon: "🛠️",
        },
        {
            title: "Connect your profiles",
            subtitle: "Link your GitHub and LinkedIn (optional)",
            icon: "🔗",
        },
    ];

    return (
        <>
            <Head>
                <title>Setup Profile — SENTINEX</title>
                <meta name="description" content="Complete your SENTINEX operative profile." />
            </Head>

            <div className="min-h-[85vh] flex items-center justify-center px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 w-full max-w-lg"
                >
                    {/* Header */}
                    <div className="text-center mb-6">
                        <span className="text-4xl block mb-3">🛡️</span>
                        <h1 className="text-xl font-bold text-white">Welcome to SENTINEX</h1>
                        <p className="text-xs mt-1" style={{ color: "#64748b" }}>
                            Complete your profile to get started
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {steps.map((s, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <button
                                    onClick={() => setStep(i)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                                    style={{
                                        background: i <= step ? "rgba(57,255,20,0.15)" : "rgba(255,255,255,0.03)",
                                        border: `1px solid ${i <= step ? "rgba(57,255,20,0.4)" : "rgba(255,255,255,0.06)"}`,
                                        color: i <= step ? "#39FF14" : "#475569",
                                    }}
                                >
                                    {i < step ? "✓" : i + 1}
                                </button>
                                {i < steps.length - 1 && (
                                    <div
                                        className="w-8 h-0.5 rounded-full"
                                        style={{ background: i < step ? "#39FF14" : "rgba(255,255,255,0.06)" }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step Title */}
                    <div className="text-center mb-6">
                        <span className="text-2xl">{steps[step].icon}</span>
                        <h2 className="text-base font-bold text-white mt-2">{steps[step].title}</h2>
                        <p className="text-[10px] mt-1" style={{ color: "#64748b" }}>{steps[step].subtitle}</p>
                    </div>

                    {/* Step Content */}
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                {/* Avatar selection */}
                                <div>
                                    <label className="text-xs font-medium block mb-2" style={{ color: "#94a3b8" }}>Choose Avatar</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {AVATAR_OPTIONS.map((av) => (
                                            <button
                                                key={av}
                                                onClick={() => setAvatar(av)}
                                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all"
                                                style={{
                                                    background: avatar === av ? "rgba(57,255,20,0.12)" : "rgba(255,255,255,0.02)",
                                                    border: `2px solid ${avatar === av ? "#39FF14" : "rgba(255,255,255,0.05)"}`,
                                                    transform: avatar === av ? "scale(1.1)" : "scale(1)",
                                                }}
                                            >
                                                {av}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Username */}
                                <div>
                                    <label className="text-xs font-medium block mb-1.5" style={{ color: "#94a3b8" }}>Callsign / Username *</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="NeoCypher"
                                        maxLength={30}
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                        style={inputStyle}
                                    />
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="text-xs font-medium block mb-1.5" style={{ color: "#94a3b8" }}>Bio</label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="Cybersecurity researcher & AI enthusiast. Breaking things to make them stronger."
                                        rows={3}
                                        maxLength={200}
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                                        style={inputStyle}
                                    />
                                    <p className="text-[9px] text-right mt-1" style={{ color: "#475569" }}>{bio.length}/200</p>
                                </div>

                                {/* Team */}
                                <div>
                                    <label className="text-xs font-medium block mb-1.5" style={{ color: "#94a3b8" }}>Team (optional)</label>
                                    <input
                                        type="text"
                                        value={team}
                                        onChange={(e) => setTeam(e.target.value)}
                                        placeholder="Team Exploit"
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                        style={inputStyle}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <div className="flex flex-wrap gap-2">
                                    {SKILL_OPTIONS.map((skill) => {
                                        const selected = skills.includes(skill);
                                        return (
                                            <button
                                                key={skill}
                                                onClick={() => toggleSkill(skill)}
                                                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                                                style={{
                                                    background: selected ? "rgba(57,255,20,0.15)" : "rgba(255,255,255,0.03)",
                                                    border: `1px solid ${selected ? "rgba(57,255,20,0.4)" : "rgba(255,255,255,0.06)"}`,
                                                    color: selected ? "#39FF14" : "#94a3b8",
                                                }}
                                            >
                                                {selected ? "✓ " : ""}{skill}
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="text-[10px] mt-4" style={{ color: "#475569" }}>
                                    {skills.length} skill{skills.length !== 1 ? "s" : ""} selected
                                </p>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="text-xs font-medium block mb-1.5" style={{ color: "#94a3b8" }}>
                                        <svg className="w-3.5 h-3.5 inline mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                        </svg>
                                        GitHub Profile URL
                                    </label>
                                    <input
                                        type="url"
                                        value={github}
                                        onChange={(e) => setGithub(e.target.value)}
                                        placeholder="https://github.com/yourusername"
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                        style={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-medium block mb-1.5" style={{ color: "#94a3b8" }}>
                                        <svg className="w-3.5 h-3.5 inline mr-1.5" viewBox="0 0 24 24" fill="#0A66C2">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                        LinkedIn Profile URL
                                    </label>
                                    <input
                                        type="url"
                                        value={linkedin}
                                        onChange={(e) => setLinkedin(e.target.value)}
                                        placeholder="https://linkedin.com/in/yourusername"
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                        style={inputStyle}
                                    />
                                </div>

                                {/* Preview */}
                                <div
                                    className="p-4 rounded-xl mt-4"
                                    style={{ background: "rgba(57,255,20,0.03)", border: "1px solid rgba(57,255,20,0.1)" }}
                                >
                                    <p className="text-[10px] uppercase tracking-wider mb-3" style={{ color: "#39FF14" }}>Profile Preview</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{avatar}</span>
                                        <div>
                                            <p className="text-sm font-bold text-white">{username || "Operator"}</p>
                                            <p className="text-[10px]" style={{ color: "#64748b" }}>{bio || "No bio yet"}</p>
                                        </div>
                                    </div>
                                    {skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {skills.slice(0, 6).map((s) => (
                                                <span key={s} className="badge-chip text-[9px]">{s}</span>
                                            ))}
                                            {skills.length > 6 && (
                                                <span className="text-[9px]" style={{ color: "#475569" }}>+{skills.length - 6} more</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8">
                        {step > 0 ? (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="text-xs font-medium px-4 py-2 rounded-lg transition-all"
                                style={{ color: "#94a3b8", background: "rgba(255,255,255,0.03)" }}
                            >
                                ← Back
                            </button>
                        ) : (
                            <div />
                        )}

                        {step < 2 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                disabled={step === 0 && !username.trim()}
                                className="btn-neon btn-neon-cyan text-xs !py-2 !px-6"
                                style={{ opacity: step === 0 && !username.trim() ? 0.5 : 1 }}
                            >
                                Next →
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={saving || !username.trim()}
                                className="btn-neon btn-solid-cyan text-xs !py-2 !px-6"
                            >
                                {saving ? "⏳ Saving..." : "🚀 Launch Profile"}
                            </button>
                        )}
                    </div>

                    {/* Skip */}
                    <div className="text-center mt-4">
                        <button
                            onClick={handleSubmit}
                            className="text-[10px] transition-colors"
                            style={{ color: "#475569" }}
                        >
                            Skip for now →
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
