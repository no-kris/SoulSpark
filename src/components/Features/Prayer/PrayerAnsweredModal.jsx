import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { firestoreService } from "../../../services/firebase/firestoreService";
import Button from "../../Button/Button";
import { celebrate } from "../../../utils/celebrate";
import { notify } from "../../../utils/notify";
import { formatDateForDisplay } from "../../../utils/formatDate";

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
      setErrorMessage(`Error updating prayer testimony: ${error}`);
      notify("Something went wrong. Please try again.");
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
      <div className="testimony-form__date-wrapper">
        <div className="testimony-form__date-display">
          {formatDateForDisplay(answerDate)}
        </div>
        <input
          type="date"
          value={answerDate}
          onChange={(e) => setAnswerDate(e.target.value)}
          className="testimony-form__input--date"
          onClick={(e) => e.target.showPicker?.()}
        />
      </div>
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
