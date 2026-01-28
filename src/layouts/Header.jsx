import { Settings, Sparkles, User } from "lucide-react";
import Button from "../components/Button/Button";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
import SettingsModal from "../features/auth/SettingsModal";
import ReauthModal from "../features/auth/ReauthModal";
import { authService } from "../services/firebase/authServices";
import { firestoreService } from "../services/firebase/firestoreService";

export default function Header({ user, navbar, onAuth }) {
  const { userProfile } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [showReauth, setShowReauth] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      await firestoreService.clearUserData(user.uid);
      await authService.deleteAccount();
      alert("Your account has been successfully deleted.");
      setShowSettings(false);
    } catch (error) {
      console.log("Failed to delete the user", error);
      if (error.code === "auth/requires-recent-login") {
        setShowReauth(true);
      } else {
        alert("Failed to delete account completely. Please try again.");
      }
    }
  };

  const handleReauth = async (password) => {
    await authService.reauthenticate(password);
    setShowReauth(false);
    await handleDeleteAccount();
  };

  return (
    <>
      <header className="header">
        <div className="header__content">
          <div className="header__brand">
            <div>
              <h1 className="header__brand--title">Reflections</h1>
              <div className="header__streak">
                <Sparkles size={14} />
                <span className="header__streak--text">
                  {userProfile?.streak || 0} daily streak
                </span>
              </div>
            </div>
          </div>

          <div className="header__actions">
            <Button
              text={user ? "Logout" : "Login"}
              Icon={User}
              IconSize={14}
              onClick={onAuth}
              className="button button--auth"
            />
            {user && (
              <Button
                text=""
                Icon={Settings}
                IconSize={14}
                onClick={() => setShowSettings(true)}
                className="button button--settings"
              />
            )}
          </div>
        </div>
        {navbar}
      </header>
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        children={
          <SettingsModal
            onClose={() => setShowSettings(false)}
            onDeleteAccount={handleDeleteAccount}
          />
        }
      />
      <Modal
        isOpen={showReauth}
        onClose={() => setShowReauth(false)}
        children={
          <ReauthModal
            onConfirm={handleReauth}
            onClose={() => setShowReauth(false)}
          />
        }
      />
    </>
  );
}
