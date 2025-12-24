import { BookOpen, Sparkles, User } from "lucide-react";
import Button from "../components/Button/Button";

export default function Header({ user, navbar, handleAuth }) {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__brand">
          <div className="header__logo">
            <BookOpen size={32} />
          </div>
          <div>
            <h1 className="header__brand--title">Soul Spark</h1>
            <div className="header__streak">
              <Sparkles size={14} />
              <span className="header__streak--text">10 spirit streak</span>
            </div>
          </div>
        </div>

        <Button
          text={user ? "Logout" : "Login"}
          Icon={User}
          IconSize={14}
          onClick={handleAuth}
          className="button button--auth"
        />
      </div>

      {navbar}
    </header>
  );
}
