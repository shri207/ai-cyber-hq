import { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            // In production, use Firebase Auth:
            // import { signInWithEmailAndPassword } from "firebase/auth";
            // import { auth } from "@/lib/firebase";
            // await signInWithEmailAndPassword(auth, email, password);
            await new Promise((r) => setTimeout(r, 1000));
            alert("✅ Login simulation successful! In production, this connects to Firebase Auth.");
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Login — AI × CYBER HQ</title>
            </Head>

            <div className="min-h-[85vh] flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <span className="text-4xl block mb-3">🛡️</span>
                        <h1 className="text-2xl font-bold text-white">Welcome back, Operator</h1>
                        <p className="text-xs mt-2" style={{ color: "#64748b" }}>Login to access your HQ dashboard</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-xl text-xs" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5" }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-xs font-medium block mb-1.5" style={{ color: "#94a3b8" }}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="operator@cyberhq.dev"
                                required
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
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
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
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
                            {loading ? "⏳ Authenticating..." : "🔐 Login"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs" style={{ color: "#64748b" }}>
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" style={{ color: "#00f7ff" }} className="hover:underline font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
