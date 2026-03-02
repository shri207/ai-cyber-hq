import "@/styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatbotAI from "@/components/features/ChatbotAI";
import { ThemeProvider } from "@/lib/ThemeContext";
import { NotificationProvider, useNotifications } from "@/lib/NotificationContext";

function ToastNotification() {
  const { toast } = useNotifications();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.95 }}
          className="toast-container"
        >
          <div
            className="p-4 rounded-xl max-w-xs"
            style={{
              background: "rgba(10, 14, 10, 0.95)",
              border: "1px solid rgba(57,255,20,0.2)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            }}
          >
            <p className="text-xs font-bold text-white">{toast.title}</p>
            <p className="text-[10px] mt-1" style={{ color: "#94a3b8" }}>{toast.message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App({ Component, pageProps, router }) {
  return (
    <ThemeProvider>
      <NotificationProvider>
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
        <ToastNotification />
      </NotificationProvider>
    </ThemeProvider>
  );
}
