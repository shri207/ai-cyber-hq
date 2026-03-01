import { motion } from "framer-motion";
import { useState } from "react";

export default function FeedPost({ post }) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
        >
            {/* Author header */}
            <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{post.avatar}</span>
                <div>
                    <span className="font-semibold text-white text-sm">{post.author}</span>
                    <p className="text-xs" style={{ color: "#64748b" }}>{post.timestamp}</p>
                </div>
            </div>

            {/* Content */}
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#cbd5e1" }}>
                {post.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                    <span key={tag} className="badge-chip-purple text-[10px]">{tag}</span>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <button
                    onClick={handleLike}
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                    style={{ color: liked ? "#ef4444" : "#64748b" }}
                >
                    {liked ? "❤️" : "🤍"} {likeCount}
                </button>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "#64748b" }}>
                    💬 {post.comments}
                </span>
                <button className="flex items-center gap-1.5 text-xs ml-auto" style={{ color: "#64748b" }}>
                    🔗 Share
                </button>
            </div>
        </motion.div>
    );
}
