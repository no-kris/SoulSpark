import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { firestoreService } from "../../../services/firebase/firestoreService";
import Button from "../../Button/Button";
import { celebrate } from "../../../features/utils/celebrate";
import { notify } from "../../../features/utils/notify";

export default function PrayerAnsweredModal({ prayer, onClose }) {
  const { user } = useAuth();
  const [answerDate, setAnswerDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [answerNote, setAnswerNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTestimonial = async (e) => {
    e.preventDefault();
    if (!answerDate) {
      setErrorMessage("Please enter a valid date.");
      return;
    }
    if (!answerNote.trim()) {
      setErrorMessage("Enter your testimony description.");
      return;
    }

    try {
      setErrorMessage("");
      await firestoreService.updatePrayer(user.uid, prayer.id, {
        status: "answered",
        answerDate: answerDate,
        answerNote: answerNote,
      });
      onClose();
      celebrate();
      notify("Praise God!");
    } catch (error) {
      console.error("Error updating prayer testimony:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="testimony-form">
      <h3 className="testimony-form__title">Testimony Time!</h3>
      <p className="testimony-form__subtitle">
        How did God answer this prayer?
      </p>

      <div className="testimony-form__prayer-title">{prayer.title}</div>
      {errorMessage && <div className="auth-modal__error">{errorMessage}</div>}
      <input
        type="date"
        value={answerDate}
        onChange={(e) => setAnswerDate(e.target.value)}
        onClick={(e) => e.target.showPicker && e.target.showPicker()}
        className="testimony-form__input--date"
      />
      <textarea
        placeholder="Write your testimony here..."
        rows="4"
        value={answerNote}
        onChange={(e) => setAnswerNote(e.target.value)}
        className="testimony-form__input--text"
      ></textarea>

      <div className="testimony-form__actions">
        <Button
          text="Close"
          onClick={() => onClose()}
          className="button testimony-form__button--cancel"
        />
        <Button
          text="Confirm"
          onClick={handleTestimonial}
          className="button testimony-form__button--confirm"
        />
      </div>
    </div>
  );
}
