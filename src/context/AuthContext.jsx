import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/firebase/authServices";
import { firestoreService } from "../services/firebase/firestoreService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChnages(
      async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          const profile = await firestoreService.getUserProfile(
            currentUser.uid,
          );
          setUserProfile(profile);
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userProfile, setUserProfile, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
