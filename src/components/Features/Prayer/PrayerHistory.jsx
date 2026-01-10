import { useEffect, useState } from "react";
import PrayerFilterBar from "./PrayerFilterBar";
import { firestoreService } from "../../../services/firebase/firestoreService";

export default function PrayerHistory({ user }) {
  const [prayers, setPrayers] = useState([]);
  const [prayerFilter, setPrayerFilter] = useState("open"); // open | answered | archived

  useEffect(() => {
    if (!user) return;

    const unsubscribe = firestoreService.subscribeToPrayers(
      user.uid,
      (data) => {
        setPrayers(data);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="prayer-history">
      <PrayerFilterBar
        prayerFilter={prayerFilter}
        setPrayerFilter={setPrayerFilter}
      />
      {prayers.filter((p) => p.status === prayerFilter).length === 0 ? (
        <div style={{ textAlign: "center", opacity: 0.6, padding: "3rem" }}>
          <p>No prayer entries here yet.</p>
        </div>
      ) : (
        prayers
          .filter((p) => p.status === prayerFilter)
          .map((prayer) => (
            <div key={prayer.id} className="prayer-item">
              <div className="prayer-item__header">
                <h4 className="prayer-item__header--text">{prayer.title}</h4>
                <span
                  className={`status-badge ${
                    prayer.status === "answered"
                      ? "status-answered"
                      : "status-open"
                  }`}
                >
                  {prayer.status}
                </span>
              </div>
              <p className="prayer-item__details">{prayer.details}</p>
            </div>
          ))
      )}
    </div>
  );
}
