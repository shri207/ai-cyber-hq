import "@/styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatbotAI from "@/components/features/ChatbotAI";
import { ThemeProvider } from "@/lib/ThemeContext";
import { NotificationProvider, useNotifications } from "@/lib/NotificationContext";
import { auth } from "@/lib/firebase";
import { getUserProfile } from "@/lib/firestore";

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

// Pages that should NOT trigger the onboarding redirect
const PUBLIC_PATHS = ["/login", "/signup", "/onboarding", "/"];

function OnboardingGuard({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Skip check on public pages
    if (PUBLIC_PATHS.includes(router.pathname)) {
      setChecked(true);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setChecked(true);
        return;
      }

      try {
        const profile = await Promise.race([
          getUserProfile(user.uid),
          new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 3000)),
        ]);

        if (!profile || !profile.onboardingComplete) {
          router.replace("/onboarding");
          return;
        }
      } catch {
        // Firestore error — don't block navigation
      }

      setChecked(true);
    });

    return () => unsub();
  }, [router.pathname, router]);

  if (!checked && !PUBLIC_PATHS.includes(router.pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl animate-pulse mb-2">⚡</div>
          <p className="text-xs" style={{ color: "#39FF14" }}>Verifying access...</p>
        </div>
      </div>
    );
  }

  return children;
}

export default function App({ Component, pageProps, router }) {
  const MatrixRain = dynamic(() => import("@/components/effects/MatrixRain"), { ssr: false });

  return (
    <ThemeProvider>
      <NotificationProvider>
        <div className="cyber-grid" />
        <MatrixRain />
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
            <OnboardingGuard>
              <Component {...pageProps} />
            </OnboardingGuard>
          </motion.main>
        </AnimatePresence>
        <Footer />
        <ChatbotAI />
        <ToastNotification />
      </NotificationProvider>
    </ThemeProvider>
  );
}

