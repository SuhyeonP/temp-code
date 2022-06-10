function multiply(num1: string, num2: string): string {
    if([num1, num2].indexOf('0') !== -1) {
        return '0';
    }

    const len1 = num1.length;
    const len2 = num2.length;
    let answer = '';

    for(let i = 0; i < len1; i++) {
        const temp = [];
        let carry = 0;

        for (let j = 0; j < len2; j++) {
            const tempValue = Number(num2[len2 - j - 1] || 1) * Number(num1[len1 - i - 1] || 1) + carry;
            carry = Math.floor(tempValue / 10);
            temp.unshift(tempValue % 10);
        }

        if (carry !== 0) {
            temp.unshift(carry);
        }
        for(let k = 0; k < i; k++) {
            temp.push(0)
        }

        const nowLength = answer.length;
        const tempLength = temp.length;
        let tempCarry = 0;
        let add = [];

        for (let j = 0; j < Math.max(nowLength, tempLength); j++) {
            const value = Number(answer[nowLength - j - 1] || 0) + Number(temp[tempLength - j - 1] || 0) + tempCarry;
            tempCarry = Math.floor(value / 10);
            add.unshift(value % 10);
        }

        if (tempCarry !== 0) {
           add.unshift(tempCarry);
        }
        answer = add.join('')
    }

    return answer;
}

console.log(multiply('2','3'))
console.log(multiply('123','456'))
