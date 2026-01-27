import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Button from "../../Button/Button";
import Modal from "../../Modal/Modal";
import PrayerAnsweredModal from "./PrayerAnsweredModal";
import { firestoreService } from "../../../services/firebase/firestoreService";
import ConfirmDeleteModal from "../../../features/auth/ConfirmDeleteModal";
import { notify } from "../../../features/utils/notify.js";

export default function PrayerActions({ prayer }) {
  const [showModal, setShowModal] = useState(null);
  const { user } = useAuth();

  const updatePrayerStatus = async (prayerId, status) => {
    try {
      await firestoreService.updatePrayerStatus(user.uid, prayerId, status);
    } catch (error) {
      console.error("Error updating prayer status:", error);
      notify("Something went wrong. Please try again.");
    }
  };

  const handleDeletePrayer = async () => {
    try {
      await firestoreService.deletePrayer(user.uid, prayer.id);
      setShowModal(null);
      notify("Prayer was successfully deleted.");
    } catch (error) {
      console.error("Error deleting prayer:", error);
      notify("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="prayer-actions">
        {prayer.status === "open" ? (
          <>
            <Button
              text="Mark Answered"
              onClick={() => setShowModal("prayer-answered")}
              className="button prayer-actions__link link-primary"
            />
            <Button
              text="Archive"
              onClick={() => updatePrayerStatus(prayer.id, "archived")}
              className="button prayer-actions__link link-secondary"
            />
          </>
        ) : (
          <>
            <Button
              text="Re-Open"
              onClick={() => updatePrayerStatus(prayer.id, "open")}
              className="button prayer-actions__link link-secondary"
            />
            {prayer.status === "archived" && (
              <Button
                text="Delete"
                onClick={() => setShowModal("delete")}
                className="button prayer-actions__link link-danger"
              />
            )}
          </>
        )}
      </div>
      <Modal
        isOpen={!!showModal}
        onClose={() => setShowModal(null)}
        children={
          showModal === "prayer-answered" ? (
            <PrayerAnsweredModal
              onClose={() => setShowModal(null)}
              prayer={prayer}
            />
          ) : (
            <ConfirmDeleteModal
              title="Delete Prayer"
              message="Are you sure you want to delete this prayer? This action cannot be undone."
              onConfirm={handleDeletePrayer}
              onClose={() => setShowModal(null)}
            />
          )
        }
      />
    </>
  );
}
