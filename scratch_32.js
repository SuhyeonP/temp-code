export const checkNumber = new RegExp(/[0-9]/g);

console.log(checkNumber.test('123'))

const a = 'a';

console.log(isNaN(Number(a)))
