import { useState } from "react";
import Button from "../../Button/Button";
import { ChevronRight } from "lucide-react";

export default function GratitudeActions({ onAddGratitudes, gratitudeStatus }) {
  const isTodayDone = gratitudeStatus === "completed";

  return !isTodayDone ? (
    <div className="gratitude-actions">
      <Button
        onClick={(e) => onAddGratitudes(e, true)}
        className="button button--save"
        text="Save Draft"
      />
      <Button
        onClick={(e) => onAddGratitudes(e, false)}
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
  );
}
