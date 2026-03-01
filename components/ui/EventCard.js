import { motion } from "framer-motion";

export default function EventCard({ event, onSelect }) {
    const statusColors = {
        Live: { bg: "rgba(239,68,68,0.12)", text: "#ef4444", dot: "#ef4444" },
        Upcoming: { bg: "rgba(57,255,20,0.1)", text: "#39FF14", dot: "#39FF14" },
        Past: { bg: "rgba(100,116,139,0.1)", text: "#64748b", dot: "#64748b" },
    };
    const s = statusColors[event.status] || statusColors.Past;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 cursor-pointer"
            onClick={() => onSelect && onSelect(event)}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{event.image}</span>
                <span
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: s.bg, color: s.text }}
                >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                    {event.status === "Live" && "● "}{event.status}
                </span>
            </div>

            {/* Title & Type */}
            <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
            <p className="text-xs font-medium mb-3" style={{ color: "#00e676" }}>{event.type}</p>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#94a3b8" }}>
                {event.description.length > 100 ? event.description.slice(0, 100) + "..." : event.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs mb-4" style={{ color: "#64748b" }}>
                <span>📅 {event.date}</span>
                <span>📍 {event.location}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag) => (
                    <span key={tag} className="badge-chip text-[10px]">{tag}</span>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <span className="text-xs" style={{ color: "#64748b" }}>
                    👥 {event.attendees}/{event.maxAttendees}
                </span>
                <span className="text-xs font-semibold" style={{ color: "#00ff9d" }}>+{event.reward} pts</span>
            </div>
        </motion.div>
    );
}
