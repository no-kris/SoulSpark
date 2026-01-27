import { Settings } from "lucide-react";

export default function SettingsModal() {
  return (
    <div className="settings">
      <div className="settings__header">
        <h1>Settings</h1>
      </div>

      <div className="settings__items">
        <span className="settings__items--delacc">Delete Account</span>
        <a
          href="https://docs.google.com/document/d/e/2PACX-1vR9-G1PRoCg2ceBeQcpWWRoNDDTkHRcZ-FNqzqOpZ0Z9mYSqGQYEFcXKGQ7pWiEuo1rgBVdyh6usFYu/pub"
          target="_blank"
          rel="noopener noreferrer"
          className="settings__items--policy"
        >
          Privacy Policy
        </a>
        <span className="settings__items--bugs">Report a Bug</span>
      </div>
    </div>
  );
}
