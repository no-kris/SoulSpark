import { useState } from "react";
import Button from "../../components/Button/Button";
import { ArrowLeft } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useAuth } from "../../hooks/useAuth";

export default function BugReportForm({ onBack }) {
  const { user } = useAuth();
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      setErrorMessage("Please fill out a description before submitting.");
      setDescription("");
      return;
    }
    setErrorMessage("");

    setIsSubmitting(true);

    const templateParams = {
      user_email: user.email,
      user_id: user.uid,
      bug_description: description,
      timestamp: new Date().toLocaleString(),
    };

    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_BUG_REPORT_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      console.log("SUCCESS!", response.status, response.text);
      window.alert("Report sent. Thank you.");
      setDescription("");
      setTimeout(() => {
        onBack();
      }, 1000);
    } catch (err) {
      console.log("FAILED...", err);
      setErrorMessage("Failed to send report. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bug-report">
      <div className="bug-report__header">
        <Button
          onClick={onBack}
          Icon={ArrowLeft}
          IconSize={20}
          className={"bug-report__back"}
        />
        <h1>Report a Bug</h1>
      </div>
      <form onSubmit={handleSubmit} className="bug-report__form">
        <p className="bug-report__form--desc">
          Found a glitch? Report it so it can be fixed!
        </p>
        {errorMessage && (
          <div className="auth-modal__error">{errorMessage}</div>
        )}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what happened..."
          required
          className="bug-report__form--textarea"
        />

        <Button
          text={isSubmitting ? "Sending..." : "Send Report"}
          type="submit"
          className="button button--submit"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}
