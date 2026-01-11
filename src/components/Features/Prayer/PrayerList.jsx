import PrayerActions from "./PrayerActions";

export default function PrayerList({ prayers, prayerFilter }) {
  return prayers
    .filter((p) => p.status === prayerFilter)
    .map((prayer) => (
      <div key={prayer.id} className="prayer-item">
        <div className="prayer-item__header">
          <h4 className="prayer-item__header--text">{prayer.title}</h4>
          <span
            className={`status-badge ${
              prayer.status === "answered" ? "status-answered" : "status-open"
            }`}
          >
            {prayer.status}
          </span>
        </div>
        <p className="prayer-item__details">{prayer.details}</p>
        <PrayerActions prayer={prayer} />
      </div>
    ));
}
