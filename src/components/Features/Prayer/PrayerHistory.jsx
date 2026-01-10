import { useState } from "react";
import PrayerFilterBar from "./PrayerFilterBar";

export default function PrayerHistory({ user }) {
  const [prayerFilter, setPrayerFilter] = useState(null); // open | answered | archived | null

  return (
    <div>
      <PrayerFilterBar
        prayerFilter={prayerFilter}
        setPrayerFilter={setPrayerFilter}
      />
    </div>
  );
}
