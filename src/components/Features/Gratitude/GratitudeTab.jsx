import { useState } from "react";
import Button from "../../Button/Button";
import { ChevronRight } from "lucide-react";

export default function GratitudeTab() {
  const [gratitudeInputs, setGratitudeInputs] = useState(["", "", ""]);
  const [saveGratitude, setSaveGratitude] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isTodayDone = false;

  const handleAddGratitudes = (e) => {
    e.preventDefault();
    for (const element of gratitudeInputs) {
      if (!element || element.trim() === "") {
        setErrorMessage("Please fill out each entry before submitting.");
        return;
      }
    }
    setErrorMessage("");
    console.log("No errors encountered.");
  };

  return (
    <div style={{ maxWidth: "60rem", margin: "0 auto" }}>
      <div className="gratitude-card">
        <div className="gratitude-card__header">
          <div className="gratitude-card__title">Nourish Your Spirit</div>
          <div className="gratitude-card__subtitle">
            Add three things to thank God for
          </div>
        </div>
        {errorMessage && (
          <div className="auth-modal__error">{errorMessage}</div>
        )}
        <div>
          {gratitudeInputs.map((val, index) => (
            <div
              key={index}
              className={`gratitude-entry ${isTodayDone ? "disabled" : ""}`}
            >
              <span className="gratitude-entry__num">0{index + 1}</span>
              <input
                type="text"
                value={val}
                onChange={(e) => {
                  const updatedInputs = [...gratitudeInputs];
                  updatedInputs[index] = e.target.value;
                  setGratitudeInputs(updatedInputs);
                }}
                disabled={isTodayDone}
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
        {!isTodayDone ? (
          <div className="gratitude-actions">
            <Button
              onClick={() => setSaveGratitude(true)}
              className="button button--save"
              text="Save Draft"
            />
            <Button
              onClick={handleAddGratitudes}
              className="button button--submit"
              text="Submit"
              Icon={ChevronRight}
              IconSize={18}
            />
          </div>
        ) : (
          <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
            Daily Gratitudes Completed!
          </p>
        )}
      </div>
    </div>
  );
}
