import emailjs from "@emailjs/browser";

export const sendWelcomeEmail = async (email) => {
  try {
    const templateParams = {
      to_email: email,
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_WELCOME_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    );
    console.log("SUCCESS!", response.status, response.text);
  } catch (error) {
    console.log("FAILED...", error);
  }
};
