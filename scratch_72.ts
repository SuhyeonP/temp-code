function getMonday(d: string | Date) {
  const temp: Date = new Date(d);
  const day = temp.getDay();
  const monday = new Date(
    temp.setDate(temp.getDate() - day + (day == 0 ? -6 : 1)),
  );
  monday.setHours(0);
  monday.setMinutes(0);
  monday.setSeconds(0);
  return monday;
}

console.log(getMonday(new Date()));
