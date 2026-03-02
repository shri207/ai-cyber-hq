import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { mockCyberAttacks } from "@/lib/extendedMockData";

export default function CyberMap() {
    const [attacks, setAttacks] = useState(mockCyberAttacks);
    const [selectedAttack, setSelectedAttack] = useState(null);
    const [activeCount, setActiveCount] = useState(0);

    useEffect(() => {
        // Simulate live attack counter
        const interval = setInterval(() => {
            setActiveCount((c) => c + Math.floor(Math.random() * 3) + 1);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const severityColor = {
        Critical: "#ff4444",
        High: "#ff8c00",
        Medium: "#ffaa00",
        Low: "#39FF14",
    };

    const typeIcon = {
        DDoS: "🌊",
        Ransomware: "💀",
        Phishing: "🎣",
        Malware: "🦠",
        "Data Breach": "📦",
        "SQL Injection": "💉",
        "Zero-Day Exploit": "⚡",
        "Brute Force": "🔨",
    };

    return (
        <>
            <Head>
                <title>Cyber Map — SENTINEX</title>
                <meta name="description" content="Visualize global cyber threat activity in real-time." />
            </Head>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        🗺️ <span style={{ color: "#39FF14" }}>Cyber Threat Map</span>
                    </h1>
                    <p className="text-sm" style={{ color: "#64748b" }}>
                        Real-time visualization of global cyber threat activity
                    </p>
                </motion.div>

                {/* Live Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 mb-8"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-black" style={{ color: "#ff4444" }}>
                                <motion.span key={activeCount} initial={{ scale: 1.2 }} animate={{ scale: 1 }}>
                                    {(activeCount + 1247).toLocaleString()}
                                </motion.span>
                            </div>
                            <div className="text-[10px] uppercase tracking-wider" style={{ color: "#64748b" }}>Attacks Today</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-black" style={{ color: "#ffaa00" }}>{attacks.length}</div>
                            <div className="text-[10px] uppercase tracking-wider" style={{ color: "#64748b" }}>Active Threats</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-black" style={{ color: "#39FF14" }}>24</div>
                            <div className="text-[10px] uppercase tracking-wider" style={{ color: "#64748b" }}>Countries Affected</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2">
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#ff4444" }} />
                                <span className="text-2xl font-black" style={{ color: "#ff4444" }}>LIVE</span>
                            </div>
                            <div className="text-[10px] uppercase tracking-wider" style={{ color: "#64748b" }}>Monitoring Status</div>
                        </div>
                    </div>
                </motion.div>

                {/* Map Visualization */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 mb-8 relative overflow-hidden"
                    style={{ minHeight: "400px" }}
                >
                    {/* SVG World Map (simplified) */}
                    <svg
                        viewBox="0 0 1000 500"
                        className="w-full h-auto"
                        style={{ opacity: 0.6 }}
                    >
                        {/* Simplified continent outlines */}
                        {/* North America */}
                        <path d="M150,80 L230,70 L280,100 L290,150 L250,180 L220,200 L180,220 L150,200 L120,170 L100,130 L120,90 Z" fill="none" stroke="#39FF1430" strokeWidth="1" />
                        {/* South America */}
                        <path d="M220,240 L260,250 L280,300 L270,370 L240,400 L210,380 L200,330 L210,280 Z" fill="none" stroke="#39FF1430" strokeWidth="1" />
                        {/* Europe */}
                        <path d="M440,70 L520,60 L540,90 L520,120 L490,130 L460,120 L440,100 Z" fill="none" stroke="#39FF1430" strokeWidth="1" />
                        {/* Africa */}
                        <path d="M460,150 L520,140 L550,180 L560,250 L530,320 L490,340 L460,300 L450,230 L440,190 Z" fill="none" stroke="#39FF1430" strokeWidth="1" />
                        {/* Asia */}
                        <path d="M560,60 L720,50 L800,80 L820,120 L790,160 L720,170 L650,150 L600,130 L560,100 Z" fill="none" stroke="#39FF1430" strokeWidth="1" />
                        {/* Australia */}
                        <path d="M770,300 L840,290 L870,320 L850,360 L800,370 L770,340 Z" fill="none" stroke="#39FF1430" strokeWidth="1" />

                        {/* Grid lines */}
                        {[0, 100, 200, 300, 400, 500].map((y) => (
                            <line key={`h${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="#39FF1408" strokeWidth="0.5" />
                        ))}
                        {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((x) => (
                            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" stroke="#39FF1408" strokeWidth="0.5" />
                        ))}

                        {/* Attack vectors (animated lines) */}
                        {attacks.map((attack, i) => {
                            const fromX = ((attack.from.lng + 180) / 360) * 1000;
                            const fromY = ((90 - attack.from.lat) / 180) * 500;
                            const toX = ((attack.to.lng + 180) / 360) * 1000;
                            const toY = ((90 - attack.to.lat) / 180) * 500;
                            return (
                                <g key={attack.id}>
                                    {/* Attack line */}
                                    <line
                                        x1={fromX} y1={fromY} x2={toX} y2={toY}
                                        stroke={severityColor[attack.severity]}
                                        strokeWidth="1"
                                        strokeDasharray="4 4"
                                        opacity="0.6"
                                    >
                                        <animate attributeName="stroke-dashoffset" values="8;0" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" />
                                    </line>
                                    {/* Source point */}
                                    <circle cx={fromX} cy={fromY} r="4" fill={severityColor[attack.severity]} opacity="0.8">
                                        <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                    {/* Target point */}
                                    <circle cx={toX} cy={toY} r="3" fill="#ffffff" opacity="0.6">
                                        <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                </g>
                            );
                        })}
                    </svg>

                    {/* Overlay label */}
                    <div className="absolute top-4 left-4 text-[10px] font-mono" style={{ color: "#39FF14" }}>
                        GLOBAL THREAT MONITORING // SENTINEX
                    </div>
                </motion.div>

                {/* Attack Feed Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card overflow-hidden"
                >
                    <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(57,255,20,0.08)" }}>
                        <h3 className="text-lg font-bold text-white">🔴 Live Threat Feed</h3>
                    </div>
                    <div className="divide-y" style={{ divideColor: "rgba(255,255,255,0.03)" }}>
                        {attacks.map((attack, i) => (
                            <motion.div
                                key={attack.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="px-6 py-4 flex flex-wrap items-center gap-4 cursor-pointer transition-colors"
                                style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                                onClick={() => setSelectedAttack(selectedAttack?.id === attack.id ? null : attack)}
                            >
                                <span className="text-xl">{typeIcon[attack.type] || "⚠️"}</span>
                                <div className="flex-1 min-w-[200px]">
                                    <div className="text-sm font-medium text-white">{attack.type}</div>
                                    <div className="text-[10px]" style={{ color: "#64748b" }}>
                                        {attack.from.city} → {attack.to.city}
                                    </div>
                                </div>
                                <span
                                    className="px-2 py-0.5 rounded text-[10px] font-bold"
                                    style={{
                                        background: `${severityColor[attack.severity]}15`,
                                        color: severityColor[attack.severity],
                                        border: `1px solid ${severityColor[attack.severity]}30`,
                                    }}
                                >
                                    {attack.severity}
                                </span>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: severityColor[attack.severity] }} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </>
    );
}
