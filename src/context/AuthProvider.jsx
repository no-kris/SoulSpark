import { useEffect, useState } from "react";
import { authService } from "../services/firebase/authServices";
import { firestoreService } from "../services/firebase/firestoreService";
import { AuthContext } from "./context";
import { SplashScreen } from "@capacitor/splash-screen";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let profileUnsubscribe = null;
    let authUnsubscribe = null;

    // Safety timeout to prevent infinite loading
    const timeoutId = setTimeout(async () => {
       setLoading(false);
       await SplashScreen.hide();
    }, 4000);

    authUnsubscribe = authService.subscribeToAuthChnages(
      async (currentUser) => {
        clearTimeout(timeoutId); // Clear timeout if auth resolves
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
        await SplashScreen.hide();
      },
    );
    return () => {
      if (authUnsubscribe) authUnsubscribe();
      if (profileUnsubscribe) profileUnsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userProfile, setUserProfile, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
