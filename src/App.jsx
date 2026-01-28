import { useState } from "react";
import { authService } from "./services/firebase/authServices";
import "./css/index.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "./layouts/Header";
import Navbar from "./layouts/Navbar";
import GuestBanner from "./components/Misc/GuestBanner";
import VerseCard from "./components/Misc/VerseCard";
import Modal from "./components/Modal/Modal";
import AuthModal from "./features/auth/AuthModal";
import PrayerTab from "./components/Features/Prayer/PrayerTab";
import GratitudeTab from "./components/Features/Gratitude/GratitudeTab";
import SpiritTab from "./components/Features/Spirit/SpiritTab";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("prayer");
  const [showAuth, setShowAuth] = useState(false);

  const handleSignUp = async (user) => {
    await authService.signUp(user.email, user.password);
  };

  const handleLogin = async (user) => {
    await authService.signIn(user.email, user.password);
  };

  const handleResetPassword = async (email) => {
    await authService.resetPassword(email);
  };

  const handleLogout = async () => {
    await authService.logout();
  };

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
        <ToastContainer />
        {activeTab === "prayer" && <PrayerTab />}
        {activeTab === "gratitude" && <GratitudeTab />}
        {activeTab === "spirit" && <SpiritTab />}
      </main>
      <Modal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        children={
          <AuthModal
            onClose={() => setShowAuth(false)}
            onSignUp={handleSignUp}
            onLogin={handleLogin}
            onResetPassword={handleResetPassword}
          />
        }
      />
    </>
  );
}

export default App;
