import {
  BrickWall,
  Calendar,
  Flame,
  Flower,
  HandHeart,
  Heart,
  HelpingHand,
  Lightbulb,
  Sprout,
} from "lucide-react";

// --- CONSTANTS ---
const BADGES = [
  {
    id: "sower",
    name: "The Sower",
    desc: "First Gratitude Entry",
    icon: Sprout,
    condition: (stats) => stats.counts.gratitudes >= 1,
  },
  {
    id: "seeker",
    name: "The Seeker",
    desc: "First Prayer Logged",
    icon: HelpingHand,
    condition: (stats) => stats.counts.prayers >= 10,
  },
  {
    id: "harvest",
    name: "Faithful",
    desc: "3 Day Streak",
    icon: Flower,
    condition: (stats) => stats.userProfile.streak >= 3,
  },
  {
    id: "week",
    name: "Week of Grace",
    desc: "7 Day Streak",
    icon: Lightbulb,
    condition: (stats) => stats.userProfile.streak >= 7,
  },
  {
    id: "witness",
    name: "Witness",
    desc: "1 Answered Prayer",
    icon: HandHeart,
    condition: (stats) => stats.answeredPrayersCount >= 1,
  },
  {
    id: "warrior",
    name: "Prayer Warrior",
    desc: "10 Prayers Logged",
    icon: Flame,
    condition: (stats) => stats.counts.prayers >= 10,
  },
  {
    id: "builder",
    name: "Testimony Builder",
    desc: "5 Answered Prayers",
    icon: BrickWall,
    condition: (stats) => stats.answeredPrayersCount >= 5,
  },
  {
    id: "thanksgiving",
    name: "Heart of Thanks",
    desc: "50 Gratitude Entries",
    icon: Heart,
    condition: (stats) => stats.counts.gratitudes >= 50,
  },
  {
    id: "devotion",
    name: "Month of Devotion",
    desc: "30 Day Streak",
    icon: Calendar,
    condition: (stats) => stats.userProfile.streak >= 30,
  },
];

export default BADGES;
