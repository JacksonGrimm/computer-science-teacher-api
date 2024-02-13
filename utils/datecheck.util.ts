export function dateCheck(date) {
  const currentDate = new Date();

  if (date) {
    return [date !== currentDate.toDateString(), currentDate.toString()];
  }

  return [true, currentDate.toDateString()];
}
