import { Archive } from "lucide-react";
import Button from "./Button/Button";

export default function GuestBanner({ handleAuth }) {
  return (
    <div className="guest-banner">
      <div className="guest-banner__content">
        <div>
          <p className="guest-banner__text">
            Hey there! You are currently in <strong>guest mode.</strong>
          </p>
          <p className="guest-banner__text">
            Please
            <Button
              text="Sign Up / Login"
              className="button button--minimal"
              onClick={handleAuth}
            />
            to sync your data.
          </p>
        </div>
        <Archive size={120} className="guest-banner__icon" />
      </div>
    </div>
  );
}
