import { CheckCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { firestoreService } from "../../../services/firebase/firestoreService";
import { useEffect, useState } from "react";

export default function GratitudeHistory() {
  const { user } = useAuth();
  const [gratitudes, setGratitudes] = useState([]);

  useEffect(() => {
    if (!user) {
      setGratitudes([]);
      return;
    }

    const unsubscribe = firestoreService.subscribeToGratitudes(
      user.uid,
      (data) => {
        setGratitudes(data);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="gratitudes-history">
      <h3>
        <CheckCircle size={14} /> Previous Records
      </h3>
      <div>
        {gratitudes
          .filter((e) => e.status === "completed")
          .map((entry) => {
            const d = new Date(entry.date);
            return (
              <div key={entry.id} className="gratitudes-history__card">
                <div className="date-box">
                  <p className="date-box__month">
                    {d.toLocaleDateString("en-US", { month: "short" })}
                  </p>
                  <p className="date-box__day">{d.getDate()}</p>
                </div>
                <ul className="gratitudes-history__list">
                  {entry.items.map((item, i) => (
                    <li key={i} className="gratitudes-history__item">
                      <span className="gratitudes-history__dot"></span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
}
