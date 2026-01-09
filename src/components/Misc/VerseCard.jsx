import { useEffect, useState } from "react";
import VERSES from "../../constants/verses";
import { BookOpen } from "lucide-react";

export default function VerseCard() {
  const [dailyVerse, setDailyVerse] = useState({
    text: "Loading...",
    ref: "Loading...",
  });

  useEffect(() => {
    const dayOfYear = Math.floor(
      (new Date() - new Date(new Date().getFullYear(), 0, 0)) /
        1000 /
        60 /
        60 /
        24
    );
    setDailyVerse(VERSES[dayOfYear % VERSES.length]);
  }, []);

  return (
    <section className="daily-verse">
      <div className="daily-verse__icon">
        <BookOpen size={120} />
      </div>
      <div className="daily-verse__content">
        <span className="daily-verse__label">Daily Manna</span>
        <h2 className="daily-verse__text">{dailyVerse.text}</h2>
        <p className="daily-verse__reference">- {dailyVerse.ref}</p>
      </div>
    </section>
  );
}
