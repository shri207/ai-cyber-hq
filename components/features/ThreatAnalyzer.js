import { useState } from "react";
import { motion } from "framer-motion";

const mockAnalysis = (text) => {
    const suspiciousPatterns = [
        { pattern: /eval\(|exec\(|system\(|os\./, risk: "HIGH", label: "Code Injection" },
        { pattern: /DROP\s+TABLE|DELETE\s+FROM|UNION\s+SELECT/i, risk: "CRITICAL", label: "SQL Injection" },
        { pattern: /<script|javascript:|onerror=/i, risk: "HIGH", label: "XSS Attack" },
        { pattern: /password|passwd|secret|token/i, risk: "MEDIUM", label: "Credential Exposure" },
        { pattern: /base64|atob|btoa/i, risk: "MEDIUM", label: "Obfuscation Detected" },
        { pattern: /\.\.\/|\.\.\\|%2e%2e/i, risk: "HIGH", label: "Path Traversal" },
    ];

    const findings = suspiciousPatterns.filter((p) => p.pattern.test(text));
    if (findings.length === 0) {
        return { risk: "LOW", findings: [], explanation: "No known threat patterns detected. The input appears clean.", suggestions: ["Continue monitoring.", "Always validate user inputs server-side."] };
    }

    const maxRisk = findings.some((f) => f.risk === "CRITICAL") ? "CRITICAL" : findings.some((f) => f.risk === "HIGH") ? "HIGH" : "MEDIUM";
    return {
        risk: maxRisk,
        findings: findings.map((f) => f.label),
        explanation: `Detected ${findings.length} potential threat(s): ${findings.map((f) => f.label).join(", ")}.`,
        suggestions: [
            "Sanitize all user inputs immediately.",
            "Implement parameterized queries for database operations.",
            "Use Content Security Policy (CSP) headers.",
            "Review code for injection vulnerabilities.",
        ],
    };
};

const riskColors = {
    LOW: { bg: "rgba(0,255,157,0.1)", text: "#00ff9d", border: "rgba(0,255,157,0.2)" },
    MEDIUM: { bg: "rgba(255,170,0,0.1)", text: "#ffaa00", border: "rgba(255,170,0,0.2)" },
    HIGH: { bg: "rgba(239,68,68,0.1)", text: "#ef4444", border: "rgba(239,68,68,0.2)" },
    CRITICAL: { bg: "rgba(239,68,68,0.15)", text: "#ff2222", border: "rgba(239,68,68,0.3)" },
};

export default function ThreatAnalyzer() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);
    const [scanning, setScanning] = useState(false);

    const analyze = () => {
        if (!input.trim()) return;
        setScanning(true);
        setResult(null);
        setTimeout(() => {
            setResult(mockAnalysis(input));
            setScanning(false);
        }, 1500);
    };

    return (
        <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                🔬 Threat Analyzer <span className="badge-chip text-[10px]">DEMO</span>
            </h3>
            <p className="text-xs mb-4" style={{ color: "#64748b" }}>
                Paste suspicious text or code for mock AI analysis
            </p>

            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                placeholder={'e.g. <script>alert("XSS")</script>\nor: SELECT * FROM users WHERE 1=1; DROP TABLE users;'}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none mb-4"
                style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(0,247,255,0.1)",
                    color: "#e2e8f0",
                    fontFamily: "var(--font-mono)",
                }}
            />

            <button onClick={analyze} disabled={scanning} className="btn-neon btn-solid-cyan text-sm w-full justify-center">
                {scanning ? "⏳ Scanning..." : "🛡️ Analyze Threat"}
            </button>

            {/* Scanning animation */}
            {scanning && (
                <div className="mt-4">
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(0,247,255,0.1)" }}>
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(90deg, #00f7ff, #7a00ff)" }}
                        />
                    </div>
                    <p className="text-xs mt-2 text-center" style={{ color: "#00f7ff" }}>Analyzing threat vectors...</p>
                </div>
            )}

            {/* Results */}
            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl"
                    style={{
                        background: riskColors[result.risk].bg,
                        border: `1px solid ${riskColors[result.risk].border}`,
                    }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-bold" style={{ color: riskColors[result.risk].text }}>
                            Risk Level: {result.risk}
                        </span>
                    </div>
                    <p className="text-xs mb-3" style={{ color: "#cbd5e1" }}>{result.explanation}</p>
                    {result.findings.length > 0 && (
                        <div className="mb-3">
                            <p className="text-xs font-semibold mb-1" style={{ color: "#94a3b8" }}>Findings:</p>
                            <div className="flex flex-wrap gap-1">
                                {result.findings.map((f) => (
                                    <span key={f} className="text-[10px] px-2 py-1 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#fca5a5" }}>{f}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    <div>
                        <p className="text-xs font-semibold mb-1" style={{ color: "#94a3b8" }}>Suggestions:</p>
                        <ul className="text-xs space-y-1" style={{ color: "#cbd5e1" }}>
                            {result.suggestions.map((s, i) => (
                                <li key={i}>• {s}</li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
