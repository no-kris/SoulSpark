import { formatDateForDisplay } from "../../../utils/formatDate";
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
        {prayer.status === "answered" && (
          <div className="prayer-item__testimony">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span className="prayer-item__testimony--title">Testimony</span>
              <span className="prayer-item__testimony--date">
                {formatDateForDisplay(prayer.answerDate)}
              </span>
            </div>
            <span className="prayer-item__testimony--note">
              "{prayer.answerNote}"
            </span>
          </div>
        )}
        <PrayerActions prayer={prayer} />
      </div>
    ));
}
