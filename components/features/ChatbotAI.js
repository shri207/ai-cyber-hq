import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sentinelResponses } from "@/lib/mockData";

function getResponse(input) {
    const lower = input.toLowerCase();
    if (lower.match(/hi|hello|hey|greet/)) {
        return sentinelResponses.greetings[Math.floor(Math.random() * sentinelResponses.greetings.length)];
    }
    if (lower.match(/event|hackathon|ctf|workshop|conference/)) {
        return sentinelResponses.events[Math.floor(Math.random() * sentinelResponses.events.length)];
    }
    if (lower.match(/resource|learn|study|book|course|tutorial/)) {
        return sentinelResponses.resources[Math.floor(Math.random() * sentinelResponses.resources.length)];
    }
    if (lower.match(/tip|advice|recommend|suggest/)) {
        return sentinelResponses.tips[Math.floor(Math.random() * sentinelResponses.tips.length)];
    }
    return sentinelResponses.default[Math.floor(Math.random() * sentinelResponses.default.length)];
}

export default function ChatbotAI() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", text: "⚡ Sentinel AI online. How can I assist you, operator?" },
    ]);
    const [input, setInput] = useState("");
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const send = () => {
        if (!input.trim()) return;
        const userMsg = { role: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setTimeout(() => {
            const botMsg = { role: "bot", text: getResponse(input) };
            setMessages((prev) => [...prev, botMsg]);
        }, 600);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                style={{
                    background: "linear-gradient(135deg, #39FF14, #00e676)",
                    boxShadow: "0 0 30px rgba(57,255,20,0.3)",
                }}
            >
                {open ? "✕" : "🤖"}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.9 }}
                        className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden"
                        style={{
                            background: "rgba(10,10,10,0.95)",
                            border: "1px solid rgba(57,255,20,0.15)",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 0 60px rgba(57,255,20,0.1)",
                        }}
                    >
                        {/* Header */}
                        <div className="p-4 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(57,255,20,0.1)" }}>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{ background: "rgba(57,255,20,0.1)" }}>🛡️</div>
                            <div>
                                <div className="text-sm font-bold" style={{ color: "#39FF14" }}>Sentinel AI</div>
                                <div className="text-[10px]" style={{ color: "#76ff03" }}>● Online</div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-72 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: "thin" }}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className="max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed"
                                        style={{
                                            background: msg.role === "user"
                                                ? "rgba(0,230,118,0.15)"
                                                : "rgba(57,255,20,0.08)",
                                            color: msg.role === "user" ? "#b9f6ca" : "#b9f6ca",
                                            border: `1px solid ${msg.role === "user" ? "rgba(0,230,118,0.2)" : "rgba(57,255,20,0.1)"}`,
                                            whiteSpace: "pre-line",
                                        }}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={bottomRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 flex gap-2" style={{ borderTop: "1px solid rgba(57,255,20,0.1)" }}>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && send()}
                                placeholder="Ask Sentinel..."
                                className="flex-1 px-3 py-2 rounded-lg text-xs outline-none"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(57,255,20,0.1)",
                                    color: "#fff",
                                }}
                            />
                            <button
                                onClick={send}
                                className="px-3 py-2 rounded-lg text-xs font-bold"
                                style={{
                                    background: "rgba(57,255,20,0.15)",
                                    color: "#39FF14",
                                    border: "1px solid rgba(57,255,20,0.3)",
                                }}
                            >
                                Send
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
