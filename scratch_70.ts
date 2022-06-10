const check2 = new RegExp(/(?<=[detail\\=])[0-9]/g);
const check1 = new RegExp(/^(detail=)[0-9]+$/g);
const dd1 = 'detail=123'
const dd2 = 'detail=a123'
const dd3 = 'detail=123a'
const dd4 = 'detaidl=123a'
const dd5 = ''

// console.log(check2.test(dd1))
// console.log(check2.test(dd2))
// console.log(check2.test(dd3))
// console.log(check2.test(dd4))

console.log(check1.test(dd1))
console.log(check1.test(dd2))
console.log(check1.test(dd3))
console.log(check1.test(dd4))
console.log(check1.test(dd5))

console.log(check1.exec(dd1))
console.log(check1.exec(dd2))
console.log(check1.exec(dd3))
console.log(check1.exec(dd4))
console.log(check1.exec(dd5))

// console.log(check2.exec(dd1))
// console.log(check2.exec(dd2))
// console.log(check2.exec(dd3))
// console.log(check2.exec(dd4))

// console.log(dd1.split(check2))
// console.log(dd2.split(check2))
// console.log(dd3.split(check2))
// console.log(dd4.split(check2))

console.log(dd1.split(check1))
console.log(dd2.split(check1))
console.log(dd3.split(check1))
console.log(dd4.split(check1))


console.log(dd1.match(check1))
console.log(dd2.match(check1))
console.log(dd3.match(check1))
console.log(dd4.match(check1))
