import PrayerCard from "./PrayerCard";
import PrayerHistory from "./PrayerHistory";

export default function PrayerTab({ user }) {
  return (
    <div>
      <PrayerCard user={user} />
      <PrayerHistory user={user} />
    </div>
  );
}
