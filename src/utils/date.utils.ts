export const displayDate = (date: Date): string => {
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
