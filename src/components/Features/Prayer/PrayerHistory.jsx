import { useEffect, useState } from "react";
import PrayerFilterBar from "./PrayerFilterBar";
import { firestoreService } from "../../../services/firebase/firestoreService";
import PrayerList from "./PrayerList";

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
          <p>No entries here yet.</p>
        </div>
      ) : (
        <PrayerList prayers={prayers} prayerFilter={prayerFilter} />
      )}
    </div>
  );
}
