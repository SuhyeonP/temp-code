export const emailRegExp = new RegExp(
    /^[a-zA-Z0-9+-_.]+@[a-zA-Z-]+\.[a-zA-Z-.]+$/,
);

console.log(emailRegExp.test('skdjf@dk1jf.skdjf'))
