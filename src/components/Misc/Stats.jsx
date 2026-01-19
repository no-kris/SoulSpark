import { useEffect, useState } from "react";
import { firestoreService } from "../../services/firebase/firestoreService";
import { useAuth } from "../../context/AuthContext";

export default function Stats({ userProfile }) {
  const { user } = useAuth();
  const [counts, setCounts] = useState({
    prayers: 0,
    gratitudes: 0,
  });

  useEffect(() => {
    async function fetchCounts() {
      if (!user?.uid) return;

      const [prayerCount, gratitudeCount] = await Promise.all([
        firestoreService.getCollectionCount(user.uid, "prayers"),
        firestoreService.getCollectionCount(user.uid, "gratitudes"),
      ]);

      setCounts({
        prayers: prayerCount,
        gratitudes: gratitudeCount,
      });
    }
    fetchCounts();
  }, [user?.uid]);

  return (
    <div className="stats-wrapper">
      <div className="stats-row">
        <div className="stats-row__item">
          <span className="stats-row__value">{userProfile.streak}</span>
          <span className="stats-row__label">Streak</span>
        </div>
        <div className="stats-row__item">
          <span className="stats-row__value">{counts.prayers}</span>
          <span className="stats-row__label">Prayers</span>
        </div>
        <div className="stats-row__item">
          <span className="stats-row__value">{counts.gratitudes}</span>
          <span className="stats-row__label">Gratitudes</span>
        </div>
      </div>
    </div>
  );
}
