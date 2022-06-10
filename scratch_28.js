const today = new Date();
console.log(today);
const lastTempYear = today.getFullYear();
const lastTempMonth = today.getMonth() + 1;

const startDay = new Date(today.setDate(1));
console.log(startDay)

const lastDay = new Date(lastTempYear, lastTempMonth, 0);
console.log(lastDay)

console.log(today.toDateString())
console.log(today.toISOString().split('T')[0])
console.log(new Date(2022,11,1))
