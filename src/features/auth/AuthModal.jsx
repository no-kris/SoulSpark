import { Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import Button from "../../components/Button/Button";
import handleModeChange from "./handleModeChange";
import { sendWelcomeEmail } from "../../utils/sendWelcomeEmail";
import { notify } from "../../utils/notify";

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
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async () => {
    setErrorMessage("");

    if (!email) {
      setErrorMessage("EMAIL IS REQUIRED");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("INVALID EMAIL FORMAT");
      return;
    }

    if (mode === "reset") {
      setLoading(true);
      try {
        await onResetPassword(email);
        onClose();
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!password) {
      setErrorMessage("PASSWORD REQUIRED");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await onLogin({ email, password });
      } else if (mode === "signup") {
        await onSignUp({ email, password });
        await sendWelcomeEmail(email);
        notify("Welcome email sent!");
      }
      onClose();
    } catch (error) {
      console.error(error);
      setErrorMessage("Authentication failed. Try again.");
    } finally {
      setLoading(false);
    }
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
          required
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
              required
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
        disabled={loading}
        text={
          loading
            ? "PLEASE WAIT..."
            : mode === "login"
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
