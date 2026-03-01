import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import Head from "next/head";
import { mockEvents } from "@/lib/mockData";
import ThreatAnalyzer from "@/components/features/ThreatAnalyzer";

const CyberGlobe = dynamic(() => import("@/components/3d/CyberGlobe"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const stats = [
  { value: "500+", label: "Members", icon: "👥" },
  { value: "120+", label: "Events", icon: "📡" },
  { value: "50+", label: "Teams", icon: "🛡️" },
  { value: "10K+", label: "Points Earned", icon: "⚡" },
];

export default function Home() {
  const upcoming = mockEvents.filter((e) => e.status === "Upcoming" || e.status === "Live");

  return (
    <>
      <Head>
        <title>SENTINEX — Digital Headquarters</title>
        <meta name="description" content="The Digital Headquarters for an AI & Cybersecurity Student Community. Discover events, form teams, track rankings." />
      </Head>

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* 3D Globe background */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <CyberGlobe />
        </div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, #0a0a0a 75%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
          <div className="max-w-2xl">
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="mb-4">
              <span className="badge-chip text-xs">🛡️ Student Community Platform</span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-4"
            >
              <span style={{ color: "#39FF14" }} className="neon-text">SENTINEX</span>
            </motion.h1>

            <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="text-lg sm:text-xl mb-2" style={{ color: "#94a3b8" }}>
              The Digital Headquarters for an
            </motion.p>
            <motion.p custom={2.5} initial="hidden" animate="visible" variants={fadeUp} className="text-lg sm:text-xl mb-6" style={{ color: "#cbd5e1" }}>
              <strong>AI & Cybersecurity Student Community</strong>
            </motion.p>

            <motion.p custom={3} initial="hidden" animate="visible" variants={fadeUp} className="text-sm mb-8 max-w-lg" style={{ color: "#64748b" }}>
              Discover events. Form teams. Track rankings. Discuss ideas. Showcase your skills. Join the next generation of cyber defenders.
            </motion.p>

            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap gap-3">
              <Link href="/signup" className="btn-neon btn-solid-cyan">
                🚀 Join HQ
              </Link>
              <Link href="/events" className="btn-neon btn-neon-purple">
                📡 Explore Events
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ STATS BAR ═══════ */}
      <section className="py-12 px-6" style={{ background: "rgba(57,255,20,0.02)", borderTop: "1px solid rgba(57,255,20,0.06)", borderBottom: "1px solid rgba(57,255,20,0.06)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-3xl font-black" style={{ color: "#39FF14" }}>{s.value}</div>
              <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: "#64748b" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ EVENT TICKER ═══════ */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#64748b" }}>📡 Upcoming Events</span>
        </div>
        <div className="ticker-wrap">
          <div className="ticker">
            {[...upcoming, ...upcoming].map((ev, i) => (
              <div key={`${ev.id}-${i}`} className="flex items-center gap-3 whitespace-nowrap px-5 py-3 rounded-xl" style={{ background: "rgba(57,255,20,0.04)", border: "1px solid rgba(57,255,20,0.08)" }}>
                <span className="text-lg">{ev.image}</span>
                <div>
                  <div className="text-sm font-semibold text-white">{ev.title}</div>
                  <div className="text-xs" style={{ color: "#64748b" }}>{ev.date} • {ev.type}</div>
                </div>
                <span className="badge-chip-green text-[10px]">+{ev.reward} pts</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-3"
          >
            What We <span style={{ color: "#39FF14" }}>Offer</span>
          </motion.h2>
          <p className="text-center text-sm mb-12" style={{ color: "#64748b" }}>Everything you need to grow as a cyber defender</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "📡", title: "Events & Hackathons", desc: "CTFs, workshops, conferences and hackathons to sharpen your skills.", color: "#39FF14" },
              { icon: "👥", title: "Team Formation", desc: "Find your squad. Create or join teams of up to 4 members for competitions.", color: "#00e676" },
              { icon: "🏆", title: "Leaderboard & Badges", desc: "Earn points, climb rankings, and unlock achievement badges.", color: "#ffaa00" },
              { icon: "💬", title: "Community Feed", desc: "Share ideas, post writeups, and discuss the latest in AI & cyber.", color: "#76ff03" },
              { icon: "🤖", title: "Sentinel AI", desc: "Your cyber assistant — ask about events, get resource recommendations.", color: "#39FF14" },
              { icon: "🔬", title: "Threat Analyzer", desc: "Paste suspicious code and get instant mock AI threat analysis.", color: "#ef4444" },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <div className="text-3xl mb-3">{feat.icon}</div>
                <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ THREAT ANALYZER ═══════ */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <ThreatAnalyzer />
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to <span style={{ color: "#39FF14" }} className="neon-text">Join the Grid</span>?
          </h2>
          <p className="text-sm mb-8" style={{ color: "#64748b" }}>
            Become part of the fastest-growing AI & Cybersecurity student community.
          </p>
          <Link href="/signup" className="btn-neon btn-solid-cyan text-lg">
            🚀 Get Started
          </Link>
        </motion.div>
      </section>
    </>
  );
}
