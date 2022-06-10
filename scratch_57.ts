function convert(s: string, numRows: number): string {
    let len = s.length;
    if (len === 1 || len <= numRows) {
        return s;
    }
    let answer = '';


    let temp: string[][] = [];

    let split = s.split('');
    let i = 0;

    while (split.length > 0) {
        const divide = i % (numRows - 1);
        let push = [];
        let where: string[] = [];
        for(let i = 0; i < numRows; i++) {
            where.push('');
        }
        if(divide === 0) {
            push = split.splice(0, numRows);
            where = [...push];
        } else {
            push = split.splice(0, 1);
            where[numRows - divide - 1] = push[0];
        }
        console.log(where)
        temp.push(where)
        i++;
    }

    for(let i = 0; i < numRows; i++) {
        const word = [];
        for(let j = 0; j < temp.length; j++) {
            word.push(temp[j][i]);
        }
        answer += word.join('');
    }

    return answer;
};

console.log(convert('AB', 1))
// console.log(convert('PAYPALISHIRING', 4))
// PAHNAPLSIIGYIR
//PINALSIGYAHRPI

let test = 'PAYPALISHIRING';
let tt = test.split('')
console.log(tt.splice(0,2));
