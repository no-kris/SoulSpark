import { Settings, Sparkles, User } from "lucide-react";
import Button from "../components/Button/Button";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
import SettingsModal from "../features/auth/SettingsModal";

export default function Header({ user, navbar, onAuth }) {
  const { userProfile } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

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
        children={<SettingsModal onClose={() => setShowSettings(false)} />}
      />
    </>
  );
}
