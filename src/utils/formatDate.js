export const formatDateForDisplay = (dateString) => {
  if (!dateString) return "Select Date Answered";
  const [year, month, day] = dateString.split("-");
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
