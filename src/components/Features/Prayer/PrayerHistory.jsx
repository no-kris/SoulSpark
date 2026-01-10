import { useState } from "react";
import Button from "../../Button/Button";

export default function PrayerHistory({ user }) {
  const [prayerFilter, setPrayerFilter] = useState(null); // open | answered | archived | null

  return (
    <div>
      <div className="filter-bar">
        {["open", "answered", "archived"].map((status) => (
          <div key={status}>
            <Button
              text={
                status === "open"
                  ? "Active"
                  : status === "answered"
                  ? "Answered"
                  : "Archived"
              }
              className={`filter-option ${
                prayerFilter === status ? "active" : "inactive"
              }`}
              onClick={() => setPrayerFilter(status)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
