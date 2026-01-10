import Button from "../../Button/Button";

export default function PrayerFilterBar({ prayerFilter, setPrayerFilter }) {
  return (
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
  );
}
