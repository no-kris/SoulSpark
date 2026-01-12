import { toast } from "react-toastify";

export const notify = (msg) => {
  console.log("Notification triggered:", msg);
  return toast(msg);
};
