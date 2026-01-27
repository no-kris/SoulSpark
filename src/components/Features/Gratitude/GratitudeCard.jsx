import { useEffect, useState } from "react";
import { firestoreService } from "../../../services/firebase/firestoreService";
import { useAuth } from "../../../hooks/useAuth";
import { notify } from "../../../features/utils/notify";
import GratitudeActions from "./GratitudeActions";

export default function GratitudeCard() {
  const [gratitudeInputs, setGratitudeInputs] = useState(["", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [gratitudeStatus, setGratitudeStatus] = useState(""); // completed | draft
  const { user } = useAuth();

  useEffect(() => {
    const fetchTodayGratitudes = async () => {
      if (!user) return;
      try {
        const data = await firestoreService.getTodayGratitudes(user.uid);
        if (data) {
          setGratitudeInputs(data.items || ["", "", ""]);
          setGratitudeStatus(data.status);
        }
      } catch (error) {
        console.log("Error fetching gratitudes", error);
      }
    };
    fetchTodayGratitudes();
  }, [user]);

  const handleAddGratitudes = async (e, isDraft) => {
    e.preventDefault();
    const filled = gratitudeInputs.filter((i) => i.trim() !== "");
    if (!isDraft && filled.length < 3) {
      setErrorMessage("Please fill out all 3 items before submitting.");
      return;
    }
    setErrorMessage("");
    try {
      await firestoreService.addGratitudesEntry(
        user.uid,
        gratitudeInputs,
        isDraft,
      );
      if (!isDraft) {
        setGratitudeStatus("completed");
        notify("All gratitudes saved!");
      } else {
        notify("Draft saved!");
      }
    } catch (error) {
      console.log("Error adding gratitudes to db", error);
      notify("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="gratitude-card">
      <div className="gratitude-card__header">
        <div className="gratitude-card__title">Nourish Your Spirit</div>
        <div className="gratitude-card__subtitle">
          Add three things to thank God for
        </div>
      </div>
      {errorMessage && <div className="auth-modal__error">{errorMessage}</div>}
      <div>
        {gratitudeInputs.map((val, index) => (
          <div key={index} className="gratitude-entry">
            <span className="gratitude-entry__num">0{index + 1}</span>
            <input
              type="text"
              value={val}
              onChange={(e) => {
                const updatedInputs = [...gratitudeInputs];
                updatedInputs[index] = e.target.value;
                setGratitudeInputs(updatedInputs);
              }}
              disabled={gratitudeStatus === "completed"}
              placeholder={
                index === 0
                  ? "Something beautiful..."
                  : index === 1
                    ? "A challenge overcome..."
                    : "His steady hand..."
              }
              className="gratitude-entry__input"
            />
          </div>
        ))}
      </div>
      <GratitudeActions
        onAddGratitudes={handleAddGratitudes}
        gratitudeStatus={gratitudeStatus}
      />
    </div>
  );
}
