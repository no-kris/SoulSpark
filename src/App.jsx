import { useEffect, useState } from "react";
import { authService } from "./services/firebase/authServices";
import "./css/index.css";
import Header from "./layouts/Header";
import Navbar from "./layouts/Navbar";
import GuestBanner from "./components/GuestBanner";
import VerseCard from "./components/VerseCard";
import Modal from "./components/Modal/Modal";
import AuthModal from "./features/auth/AuthModal";

import PrayerTab from "./components/PrayerTab";
import GratitudeTab from "./components/GratitudeTab";
import SpiritualTab from "./components/SpiritualTab";

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Prayer");
  const [showAuth, setShowAuth] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (user) => {
    try {
      await authService.signUp(user.email, user.password);
      setShowAuth(false);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleLogin = async (user) => {
    try {
      await authService.signIn(user.email, user.password);
      setShowAuth(false);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleResetPassword = async (email) => {
    try {
      await authService.resetPassword(email);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChnages(
      async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header
        user={user}
        onAuth={() => {
          user ? handleLogout() : setShowAuth(true);
        }}
        navbar={<Navbar activeTab={activeTab} setActiveTab={setActiveTab} />}
      />
      <main className="main">
        {!user && <GuestBanner user={user} onAuth={() => setShowAuth(true)} />}
        <VerseCard />
        {activeTab === "prayer" && <PrayerTab />}
        {activeTab === "gratitude" && <GratitudeTab />}
        {activeTab === "spiritual" && <SpiritualTab />}
      </main>
      <Modal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        children={
          <>
            {errorMessage && (
              <div className="auth-modal__error">{errorMessage}</div>
            )}
            <AuthModal
              onClose={() => setShowAuth(false)}
              onSignUp={handleSignUp}
              onLogin={handleLogin}
              onResetPassword={handleResetPassword}
            />
          </>
        }
      />
    </>
  );
}

export default App;
