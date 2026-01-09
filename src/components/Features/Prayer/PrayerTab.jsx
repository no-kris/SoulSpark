import { ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import Button from "../../Button/Button";
import { firestoreService } from "../../../services/firebase/firestoreService";
import { toast } from "react-toastify";

export default function PrayerTab({ user }) {
  const [prayerTitle, setPrayerTitle] = useState("");
  const [prayerDetails, setPrayerDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const notify = (msg) => toast(msg);

  const handleAddPrayer = async (e) => {
    e.preventDefault();
    if (!user || user.isAnonymous)
      return notify("Please sign up to add prayers.");
    if (!prayerTitle) {
      setErrorMessage("Prayer title is needed.");
      return;
    }
    if (!prayerDetails) {
      setErrorMessage("Prayer details are needed.");
      return;
    }
    setErrorMessage("");
    try {
      await firestoreService.addPrayerEntry(user.uid, {
        title: prayerTitle,
        details: prayerDetails,
      });
      setPrayerTitle("");
      setPrayerDetails("");
      notify("Prayer Added!");
    } catch (error) {
      setErrorMessage(`Error adding prayer ${error}`);
    }
  };

  return (
    <div style={{ maxWidth: "60rem", margin: "0 auto" }}>
      <div className="prayer-card">
        <div className="prayer-card__header">
          <div className="prayer-card__icon">
            <Plus size={18} />
          </div>
          <h3 className="prayer-card__title">New Prayer</h3>
        </div>
        {errorMessage && (
          <div className="auth-modal__error">{errorMessage}</div>
        )}
        <input
          type="text"
          value={prayerTitle}
          onChange={(e) => setPrayerTitle(e.target.value)}
          placeholder="What's your prayer called."
          className="prayer-card__input"
        />
        <textarea
          value={prayerDetails}
          onChange={(e) => setPrayerDetails(e.target.value)}
          placeholder="Tell Him what's on your heart."
          className="prayer-card__textarea"
        ></textarea>
        <Button
          onClick={handleAddPrayer}
          className="button--submit"
          Icon={ChevronRight}
          IconSize={16}
          text="Add Prayer"
        />
      </div>
    </div>
  );
}
