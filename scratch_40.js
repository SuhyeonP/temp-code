export const newNameCheck = new RegExp(/^[가-힣a-zA-Z]+$/g);
export const nameCheck = new RegExp(/[가-힣a-zA-Z]/g);
export const newNameCheck1 = new RegExp(/^[가-힣a-zA-Z]{1,10}$/g);
const test = new RegExp(/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,30}$/)
export const pnCheck = new RegExp(/^\d{2,3}\d{3,4}\d{4}/g);

console.log(test.test('a'))
console.log(newNameCheck.test(''))
console.log(newNameCheck1.test('홍'))
console.log(pnCheck.test('01012341234'))
console.log(pnCheck.test('0532342344'))

const pnc = new RegExp(/^[\S]{9,30}$/);
const pn = ''
console.log(pn === '' ? false : !pnc.test(pn))
export const length30 = new RegExp(/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,30}$/);
console.log(length30.test('skdfj skdjflaksj skdf-0329['))


const aaa =  new RegExp(/^\d{2,3}\d{3,4}\d{4}/g);

console.log(aaa.test(''))
