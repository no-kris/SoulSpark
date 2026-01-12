import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../Button/Button";
import Modal from "../../Modal/Modal";
import PrayerAnsweredModal from "./PrayerAnsweredModal";
import { firestoreService } from "../../../services/firebase/firestoreService";

export default function PrayerActions({ prayer }) {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const updatePrayerStatus = async (prayerId, status) => {
    try {
      await firestoreService.updatePrayerStatus(user.uid, prayerId, status);
    } catch (error) {
      console.log("Error color:", error);
    }
  };

  return (
    <>
      <div className="prayer-actions">
        {prayer.status === "open" ? (
          <>
            <Button
              text="Mark Answered"
              onClick={() => setShowModal(true)}
              className="button prayer-actions__link link-primary"
            />
            <Button
              text="Archive"
              onClick={() => updatePrayerStatus(prayer.id, "archived")}
              className="button prayer-actions__link link-secondary"
            />
          </>
        ) : (
          <Button
            text="Re-Open"
            onClick={() => updatePrayerStatus(prayer.id, "open")}
            className="button prayer-actions__link link-secondary"
          />
        )}
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        children={
          <PrayerAnsweredModal
            onClose={() => setShowModal(false)}
            prayer={prayer}
          />
        }
      />
    </>
  );
}
