import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import EventCard from "@/components/ui/EventCard";
import { mockEvents } from "@/lib/mockData";

const filters = ["All", "Live", "Upcoming", "Past"];
const typeFilters = ["All Types", "Hackathon", "Workshop", "CTF", "Conference"];

export default function Events() {
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All Types");
    const [selectedEvent, setSelectedEvent] = useState(null);

    const filtered = mockEvents.filter((e) => {
        const statusMatch = statusFilter === "All" || e.status === statusFilter;
        const typeMatch = typeFilter === "All Types" || e.type === typeFilter;
        return statusMatch && typeMatch;
    });

    return (
        <>
            <Head>
                <title>Events — SENTINEX</title>
                <meta name="description" content="Discover hackathons, workshops, CTF challenges and conferences." />
            </Head>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        📡 <span style={{ color: "#39FF14" }}>Events</span>
                    </h1>
                    <p className="text-sm" style={{ color: "#64748b" }}>Hackathons, workshops, CTFs and conferences to level up your skills</p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap gap-6 mb-8">
                    <div className="flex gap-2">
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setStatusFilter(f)}
                                className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                                style={{
                                    background: statusFilter === f ? "rgba(0,247,255,0.15)" : "rgba(255,255,255,0.03)",
                                    color: statusFilter === f ? "#39FF14" : "#64748b",
                                    border: `1px solid ${statusFilter === f ? "rgba(0,247,255,0.3)" : "rgba(255,255,255,0.05)"}`,
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {typeFilters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setTypeFilter(f)}
                                className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                                style={{
                                    background: typeFilter === f ? "rgba(122,0,255,0.15)" : "rgba(255,255,255,0.03)",
                                    color: typeFilter === f ? "#a78bfa" : "#64748b",
                                    border: `1px solid ${typeFilter === f ? "rgba(122,0,255,0.3)" : "rgba(255,255,255,0.05)"}`,
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Event Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filtered.map((event) => (
                            <EventCard key={event.id} event={event} onSelect={setSelectedEvent} />
                        ))}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-lg" style={{ color: "#475569" }}>No events found for this filter.</p>
                    </div>
                )}
            </div>

            {/* Event Detail Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedEvent(null)}
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            className="relative glass-card p-8 max-w-lg w-full"
                            onClick={(e) => e.stopPropagation()}
                            style={{ border: "1px solid rgba(0,247,255,0.2)" }}
                        >
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-4 right-4 text-xl"
                                style={{ color: "#64748b" }}
                            >
                                ✕
                            </button>

                            <span className="text-5xl block mb-4">{selectedEvent.image}</span>
                            <h2 className="text-2xl font-bold text-white mb-1">{selectedEvent.title}</h2>
                            <span className="badge-chip-purple text-xs mb-4 inline-block">{selectedEvent.type}</span>

                            <p className="text-sm leading-relaxed mb-6" style={{ color: "#94a3b8" }}>{selectedEvent.description}</p>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="p-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                                    <div className="text-sm font-bold text-white">📅 {selectedEvent.date}</div>
                                    <div className="text-[10px]" style={{ color: "#64748b" }}>Date</div>
                                </div>
                                <div className="p-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                                    <div className="text-sm font-bold text-white">🕐 {selectedEvent.time}</div>
                                    <div className="text-[10px]" style={{ color: "#64748b" }}>Time</div>
                                </div>
                                <div className="p-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                                    <div className="text-sm font-bold text-white">📍 {selectedEvent.location}</div>
                                    <div className="text-[10px]" style={{ color: "#64748b" }}>Location</div>
                                </div>
                                <div className="p-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                                    <div className="text-sm font-bold" style={{ color: "#00ff9d" }}>+{selectedEvent.reward} pts</div>
                                    <div className="text-[10px]" style={{ color: "#64748b" }}>Reward</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <span className="text-xs" style={{ color: "#64748b" }}>
                                    👥 {selectedEvent.attendees}/{selectedEvent.maxAttendees} registered
                                </span>
                                <div className="flex gap-2">
                                    {selectedEvent.tags.map((t) => <span key={t} className="badge-chip text-[10px]">{t}</span>)}
                                </div>
                            </div>

                            {selectedEvent.status !== "Past" ? (
                                <button className="btn-neon btn-solid-cyan w-full justify-center text-sm">
                                    🚀 Register Now
                                </button>
                            ) : (
                                <div className="text-center text-sm py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", color: "#475569" }}>
                                    This event has ended
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
