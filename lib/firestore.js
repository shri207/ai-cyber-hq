import {
    doc,
    getDoc,
    setDoc,
    collection,
    query,
    orderBy,
    limit as firestoreLimit,
    getDocs,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Get a user profile from Firestore
 */
export async function getUserProfile(uid) {
    const snap = await getDoc(doc(db, "users", uid));
    if (snap.exists()) {
        return { id: snap.id, ...snap.data() };
    }
    return null;
}

/**
 * Create or update a user profile in Firestore
 */
export async function createOrUpdateUserProfile(uid, data) {
    const ref = doc(db, "users", uid);
    await setDoc(
        ref,
        {
            ...data,
            updatedAt: serverTimestamp(),
        },
        { merge: true }
    );
}

/**
 * Get the leaderboard (top users sorted by points descending)
 */
export async function getLeaderboard(max = 20) {
    const q = query(
        collection(db, "users"),
        orderBy("points", "desc"),
        firestoreLimit(max)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d, i) => ({
        id: d.id,
        rank: i + 1,
        ...d.data(),
    }));
}
