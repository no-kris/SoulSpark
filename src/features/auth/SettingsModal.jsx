import Button from "../../components/Button/Button";
import { useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import BugReportForm from "../../components/Misc/BugReportForm";

export default function SettingsModal() {
  const [view, setView] = useState("menu"); // menu | bug | delete

  const goBack = () => setView("menu");

  return (
    <div className="settings">
      {view === "menu" && (
        <>
          <div className="settings__header">
            <h1>Settings</h1>
          </div>
          <div className="settings__items">
            <Button
              text="Delete Account"
              className="settings__items--delacc"
              onClick={() => setView("delete")}
            />
            <a
              href="https://docs.google.com/document/d/e/2PACX-1vR9-G1PRoCg2ceBeQcpWWRoNDDTkHRcZ-FNqzqOpZ0Z9mYSqGQYEFcXKGQ7pWiEuo1rgBVdyh6usFYu/pub"
              target="_blank"
              rel="noopener noreferrer"
              className="settings__items--policy"
            >
              Privacy Policy
            </a>
            <Button
              text="Report a Bug"
              className="settings__items--bugs"
              onClick={() => setView("bug")}
            />
          </div>
        </>
      )}
      {view === "bug" && <BugReportForm onBack={() => setView("menu")} />}
      {view === "delete" && (
        <ConfirmDeleteModal
          onClose={goBack}
          onConfirm={() => console.log("Deleting Account")}
        />
      )}
    </div>
  );
}
