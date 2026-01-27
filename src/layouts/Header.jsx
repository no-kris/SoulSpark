import { Sparkles, User } from "lucide-react";
import Button from "../components/Button/Button";
import { useAuth } from "../hooks/useAuth";

export default function Header({ user, navbar, onAuth }) {
  const { userProfile } = useAuth();

  return (
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

        <Button
          text={user ? "Logout" : "Login"}
          Icon={User}
          IconSize={14}
          onClick={onAuth}
          className="button button--auth"
        />
      </div>

      {navbar}
    </header>
  );
}
