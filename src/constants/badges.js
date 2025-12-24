import {
  BrickWall,
  Calendar,
  Candlestick,
  Flame,
  Flower,
  HandHeart,
  Heart,
  HelpingHand,
  Sprout,
} from "lucide-react";

// --- CONSTANTS ---
const BADGES = [
  {
    id: "sower",
    name: "The Sower",
    desc: "First Gratitude Entry",
    icon: <Sprout />,
  },
  {
    id: "seeker",
    name: "The Seeker",
    desc: "First Prayer Logged",
    icon: <HelpingHand />,
  },
  {
    id: "harvest",
    name: "Faithful",
    desc: "3 Day Streak",
    icon: <Flower />,
  },
  {
    id: "week",
    name: "Week of Grace",
    desc: "7 Day Streak",
    icon: <Candlestick />,
  },
  {
    id: "witness",
    name: "Witness",
    desc: "1 Answered Prayer",
    icon: <HandHeart />,
  },
  {
    id: "warrior",
    name: "Prayer Warrior",
    desc: "10 Prayers Logged",
    icon: <Flame />,
  },
  {
    id: "builder",
    name: "Testimony Builder",
    desc: "5 Answered Prayers",
    icon: <BrickWall />,
  },
  {
    id: "thanksgiving",
    name: "Heart of Thanks",
    desc: "50 Gratitude Entries",
    icon: <Heart />,
  },
  {
    id: "devotion",
    name: "Month of Devotion",
    desc: "30 Day Streak",
    icon: <Calendar />,
  },
];

export default BADGES;
