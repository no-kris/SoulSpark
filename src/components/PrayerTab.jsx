import { ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import Button from "./Button/Button";

export default function PrayerTab() {
  const [prayerTitle, setPrayerTitle] = useState("");
  const [prayerDetails, setPrayerDetails] = useState("");
  return (
    <div style={{ maxWidth: "60rem", margin: "0 auto" }}>
      <div className="prayer-card">
        <div className="prayer-card__header">
          <div className="prayer-card__icon">
            <Plus size={18} />
          </div>
          <h3 className="prayer-card__title">New Prayer</h3>
        </div>
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
          onClick={(e) => {
            e.preventDefault();
            console.log("Button clicked");
          }}
          className="button--submit"
          Icon={ChevronRight}
          IconSize={16}
          text="Add Prayer"
        />
      </div>
    </div>
  );
}
