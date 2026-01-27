import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import PrayerFilterBar from "./PrayerFilterBar";
import { firestoreService } from "../../../services/firebase/firestoreService";
import PrayerList from "./PrayerList";

export default function PrayerHistory() {
  const { user } = useAuth();
  const [prayers, setPrayers] = useState([]);
  const [prayerFilter, setPrayerFilter] = useState("open"); // open | answered | archived

  useEffect(() => {
    if (!user) {
      setPrayers([]);
      return;
    }

    const unsubscribe = firestoreService.subscribeToPrayers(
      user.uid,
      (data) => {
        setPrayers(data);
      },
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
