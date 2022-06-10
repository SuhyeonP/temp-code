export const length30 = new RegExp(/^[가-힣a-zA-Z\W_]{1,30}$/);
export const length50 = new RegExp(/^[가-힣a-zA-Z\W0-9_]{1,50}$/);

console.log(length30.test('MLopst_p-est'))
console.log(length30.test('안녕 하셈'))
