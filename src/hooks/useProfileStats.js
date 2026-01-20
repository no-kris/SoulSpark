import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { firestoreService } from "../services/firebase/firestoreService";

export function useProfileStats() {
  const { user } = useAuth();

  const [counts, setCounts] = useState({
    prayers: 0,
    gratitudes: 0,
  });
  const [answeredPrayersCount, setAnsweredPrayersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      if (!user?.uid) return;
      try {
        const [prayerCount, gratitudeCount] = await Promise.all([
          firestoreService.getCollectionCount(user.uid, "prayers"),
          firestoreService.getCollectionCount(user.uid, "gratitudes"),
        ]);

        const answeredPrayers =
          await firestoreService.getFilteredCollectionCount(
            user.uid,
            "prayers",
            "status",
            "answered",
          );

        setCounts({
          prayers: prayerCount,
          gratitudes: gratitudeCount,
        });

        setAnsweredPrayersCount(answeredPrayers);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCounts();
  }, [user?.uid]);

  return { counts, answeredPrayersCount, isLoading };
}
