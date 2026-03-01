import { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/profile");
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            router.push("/profile");
        } catch (err) {
            setError(err.message || "Google Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Login — SENTINEX</title>
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

                    <div className="mt-4 flex items-center justify-between">
                        <span className="w-1/5 border-b border-gray-700"></span>
                        <span className="text-xs text-gray-500 uppercase">Or</span>
                        <span className="w-1/5 border-b border-gray-700"></span>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="btn-neon w-full justify-center text-sm mt-4"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                    >
                        🌐 Login with Google
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-xs" style={{ color: "#64748b" }}>
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" style={{ color: "#39FF14" }} className="hover:underline font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
