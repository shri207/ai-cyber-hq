import { createContext, useContext, useState, useCallback } from "react";
import { mockNotifications } from "./extendedMockData";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState(mockNotifications);
    const [toast, setToast] = useState(null);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAsRead = useCallback((id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    }, []);

    const markAllRead = useCallback(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }, []);

    const addNotification = useCallback((notification) => {
        const newNotif = {
            ...notification,
            id: `n${Date.now()}`,
            read: false,
            timestamp: "Just now",
        };
        setNotifications((prev) => [newNotif, ...prev]);
        setToast(newNotif);
        setTimeout(() => setToast(null), 4000);
    }, []);

    const showToast = useCallback((message, title = "Notification") => {
        const t = { id: `toast-${Date.now()}`, title, message };
        setToast(t);
        setTimeout(() => setToast(null), 4000);
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                toast,
                markAsRead,
                markAllRead,
                addNotification,
                showToast,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
    return ctx;
}
