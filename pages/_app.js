import "@/styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatbotAI from "@/components/features/ChatbotAI";

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <div className="cyber-grid" />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={router.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="pt-16 min-h-screen"
        >
          <Component {...pageProps} />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ChatbotAI />
    </>
  );
}
