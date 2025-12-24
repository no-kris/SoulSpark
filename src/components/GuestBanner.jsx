import { Archive } from "lucide-react";
import Button from "./Button/Button";

export default function GuestBanner({ handleAuth }) {
  return (
    <div className="guest-banner">
      <div className="guest-banner__content">
        <Archive size={42} />
        <div>
          <p className="guest-banner__text">
            You are currently in <strong>guest mode.</strong>
          </p>
          <p className="guest-banner__text">
            Please login or signup to sync your data.
          </p>
        </div>
      </div>
      <Button
        text="Sign Up"
        className="button button--minimal"
        onClick={handleAuth}
      />
    </div>
  );
}
