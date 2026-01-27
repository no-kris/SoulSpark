import { useEffect, useState } from "react";
import { authService } from "../services/firebase/authServices";
import { firestoreService } from "../services/firebase/firestoreService";
import { AuthContext } from "./context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let profileUnsubscribe = null;
    const authUnsubscribe = authService.subscribeToAuthChnages(
      async (currentUser) => {
        setUser(currentUser);
        // Clear existing profile subscription before creating a new subscription.
        // This avoids Zombie Listeners running in the background. If the user logs out
        // and then logs back in at a different time or maybe a different account.
        if (profileUnsubscribe) {
          profileUnsubscribe();
          profileUnsubscribe = null;
        }
        if (currentUser) {
          if (!currentUser.isAnonymous) {
            firestoreService.updateUserStreak(currentUser.uid);
          }
          profileUnsubscribe = firestoreService.subscribeToUserProfile(
            currentUser.uid,
            (profileData) => {
              setUserProfile(profileData);
            },
          );
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      },
    );
    return () => {
      authUnsubscribe();
      if (profileUnsubscribe) profileUnsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userProfile, setUserProfile, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
