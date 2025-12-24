import { BookOpen, Sparkles, User } from "lucide-react";

export default function Header({ user, setUser }) {
  const handleAuth = () => {
    if (user) {
      setUser(null);
    } else {
      setUser({
        name: "John Doe",
        email: "john.doe@example.com",
      });
    }
  };

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

        <button className="button button--auth" onClick={handleAuth}>
          <User size={14} />
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </header>
  );
}
