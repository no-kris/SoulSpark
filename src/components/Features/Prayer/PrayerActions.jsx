import { useState } from "react";
import Button from "../../Button/Button";
import Modal from "../../Modal/Modal";
import PrayerAnsweredModal from "./PrayerAnsweredModal";

export default function PrayerActions({ prayer }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="prayer-actions">
        {prayer.status !== "answered" ? (
          <>
            <Button
              text="Mark Answered"
              onClick={() => setShowModal(true)}
              className="button prayer-actions__link link-primary"
            />
            <Button
              text="Archive"
              onClick={() => updatePrayerStatus(prayer.id, "archive")}
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
