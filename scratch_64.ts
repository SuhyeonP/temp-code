function addBinary(a: string, b: string): string {
    let answer = '';
    const aLength = a.length;
    const bLength = b.length;

    const maxLength = Math.max(aLength, bLength);

    let carry = 0;
    for (let i = 0; i < maxLength; i++) {
        const val = Number(a[aLength - i - 1] || 0) + Number(b[bLength - i - 1] || 0) + carry;
        carry = Math.floor(val / 2);
        answer = (val % 2) + answer;
    }
    if (carry) answer = 1 + answer;
    return answer;
}

console.log(addBinary('11','1'));
