import { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            // In production, use Firebase Auth:
            // import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
            // import { auth } from "@/lib/firebase";
            // const cred = await createUserWithEmailAndPassword(auth, email, password);
            // await updateProfile(cred.user, { displayName: username });
            await new Promise((r) => setTimeout(r, 1000));
            alert("✅ Signup simulation successful! In production, this creates a Firebase account.");
        } catch (err) {
            setError(err.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Sign Up — AI × CYBER HQ</title>
            </Head>

            <div className="min-h-[85vh] flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <span className="text-4xl block mb-3">🚀</span>
                        <h1 className="text-2xl font-bold text-white">Join the Grid</h1>
                        <p className="text-xs mt-2" style={{ color: "#64748b" }}>Create your operator account and start your cyber journey</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-xl text-xs" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5" }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="text-xs font-medium block mb-1.5" style={{ color: "#94a3b8" }}>Username</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="NeoCypher"
                                required
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,247,255,0.1)", color: "#fff" }}
                                onFocus={(e) => (e.target.style.borderColor = "rgba(0,247,255,0.35)")}
                                onBlur={(e) => (e.target.style.borderColor = "rgba(0,247,255,0.1)")}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium block mb-1.5" style={{ color: "#94a3b8" }}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="operator@cyberhq.dev"
                                required
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,247,255,0.1)", color: "#fff" }}
                                onFocus={(e) => (e.target.style.borderColor = "rgba(0,247,255,0.35)")}
                                onBlur={(e) => (e.target.style.borderColor = "rgba(0,247,255,0.1)")}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium block mb-1.5" style={{ color: "#94a3b8" }}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                minLength={6}
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,247,255,0.1)", color: "#fff" }}
                                onFocus={(e) => (e.target.style.borderColor = "rgba(0,247,255,0.35)")}
                                onBlur={(e) => (e.target.style.borderColor = "rgba(0,247,255,0.1)")}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium block mb-1.5" style={{ color: "#94a3b8" }}>Confirm Password</label>
                            <input
                                type="password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                placeholder="••••••••"
                                required
                                minLength={6}
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,247,255,0.1)", color: "#fff" }}
                                onFocus={(e) => (e.target.style.borderColor = "rgba(0,247,255,0.35)")}
                                onBlur={(e) => (e.target.style.borderColor = "rgba(0,247,255,0.1)")}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-neon btn-solid-cyan w-full justify-center text-sm mt-2"
                        >
                            {loading ? "⏳ Creating Account..." : "🚀 Create Account"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs" style={{ color: "#64748b" }}>
                            Already have an account?{" "}
                            <Link href="/login" style={{ color: "#00f7ff" }} className="hover:underline font-medium">
                                Login
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
