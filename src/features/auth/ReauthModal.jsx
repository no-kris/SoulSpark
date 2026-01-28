import { useState } from "react";
import Button from "../../components/Button/Button";

export default function ReauthModal({ onConfirm, onClose }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onConfirm(password);
    } catch (err) {
      console.error(err);
      setError("Failed to verify password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reauth-modal">
      <h3 className="reauth-modal__title">Security Check</h3>
      <p className="reauth-modal__message">
        Please enter your password to confirm this action.
      </p>
      <form onSubmit={handleSubmit} className="reauth-modal__form">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="reauth-modal__input"
          required
        />
        {error && <p className="reauth-modal__error">{error}</p>}
        <div className="reauth-modal__actions">
          <Button
            text="Cancel"
            onClick={onClose}
            type="button"
            className="button button--cancel"
          />
          <Button
            text={loading ? "Verifying..." : "Confirm"}
            type="submit"
            className="button button--danger"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}
