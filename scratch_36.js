const today = new Date();
const copy = new Date();
console.log(new Date(Date.UTC(copy.getFullYear(), copy.getMonth(), copy.getDate())))

console.log(today.toString())
console.log(today.toLocaleString())
console.log(today.toISOString())
console.log(today.toDateString())
console.log(today.toUTCString())
