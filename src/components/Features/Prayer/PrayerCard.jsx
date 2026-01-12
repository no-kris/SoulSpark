import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { firestoreService } from "../../../services/firebase/firestoreService";
import { ChevronRight, Plus } from "lucide-react";
import { notify } from "../../../features/utils/notify.js";
import Button from "../../Button/Button";

export default function PrayerCard() {
  const { user, setUserProfile } = useAuth();
  const [prayerTitle, setPrayerTitle] = useState("");
  const [prayerDetails, setPrayerDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddPrayer = async (e) => {
    e.preventDefault();
    if (!user || user.isAnonymous)
      return notify("Please sign up to add prayers.");
    if (!prayerTitle.trim()) {
      setErrorMessage("Prayer title is needed.");
      return;
    }
    if (!prayerDetails.trim()) {
      setErrorMessage("Prayer details are needed.");
      return;
    }
    setErrorMessage("");
    try {
      await firestoreService.addPrayerEntry(user.uid, {
        title: prayerTitle,
        details: prayerDetails,
      });
      await firestoreService.updateUserStreak(user.uid);
      const updatedProfile = await firestoreService.getUserProfile(user.uid);
      setUserProfile(updatedProfile);
      setPrayerTitle("");
      setPrayerDetails("");
      notify("Prayer Added!");
    } catch (error) {
      setErrorMessage(`Error adding prayer ${error}`);
    }
  };

  return (
    <div className="prayer-card">
      <div className="prayer-card__header">
        <div className="prayer-card__icon">
          <Plus size={18} />
        </div>
        <h3 className="prayer-card__title">New Prayer</h3>
      </div>
      {errorMessage && <div className="auth-modal__error">{errorMessage}</div>}
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
  );
}
