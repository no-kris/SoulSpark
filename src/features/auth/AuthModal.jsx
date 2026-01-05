import { Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import Button from "../../components/Button/Button";
import handleModeChange from "../utils/handleModeChange";

export default function AuthModal({
  onClose,
  onSignUp,
  onLogin,
  onResetPassword,
}) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    if (mode === "reset") {
      if (!email) {
        setErrorMessage("EMAIL IS REQUIRED");
        return;
      }
      onResetPassword(email);
      onClose();
      return;
    }

    if (!email || !password) {
      setErrorMessage("CREDENTIALS REQUIRED");
      return;
    }

    if (mode === "login") {
      setErrorMessage("AUTHENTICATING...");
      onLogin({ email, password });
    } else if (mode === "signup") {
      setErrorMessage("REGISTERING...");
      onSignUp({ email, password });
    }
    onClose();
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal__icon">
        <User size={32} />
      </div>
      <h3 className="auth-modal__title">Welcome</h3>
      <p className="auth-modal__desc">
        Please create an account or sign in to save your data
      </p>
      {errorMessage && <div className="auth-modal__error">{errorMessage}</div>}
      <div className="auth-modal__content">
        <input
          aria-label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="USER@EMAIL.COM"
          className="auth-modal__content--input"
        />
        {mode !== "reset" && (
          <div className="auth-modal__input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              aria-label="PASSWORD"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="***********"
              className="auth-modal__content--input"
            />
            <Button
              onClick={() => setShowPassword(!showPassword)}
              Icon={showPassword ? Eye : EyeOff}
              className="btn--showpassword"
            />
          </div>
        )}
      </div>
      <div className="auth-modal__mode">{handleModeChange(mode, setMode)}</div>
      <Button
        onClick={handleSubmit}
        text={
          mode === "login"
            ? "LOG IN"
            : mode === "signup"
            ? "CREATE AN ACCOUNT"
            : "SEND RESET LINK"
        }
        className="button button--auth"
      />
    </div>
  );
}
