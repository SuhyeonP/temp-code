function get(say: string): string {
    const str = say.split('');
    const bucket = [];
    let temp = [];
    temp.push(str.shift());

    while (str.length > 0) {
        const now = str.shift();
        if (now === temp[0]) {
            temp.push(now);
        } else {
            bucket.push(temp);
            temp = [now];
        }

        if(str.length === 0) {
            bucket.push(temp);
        }
    }

    let answer = '';
    for (let i = 0; i < bucket.length; i ++) {
        const now = bucket[i].length + bucket[i][0];
        answer += now;
    }

    return answer;
}


function saying(say: number): string {
    let answer = '1';
    if (say === 1) {
        return '1';
    } else if(say === 2) {
        return '11';
    } else {
        answer = get(saying(say - 1));
    }


    return answer;
}

// console.log(saying(1))
// console.log(saying(2))
// console.log(saying(3))
console.log(saying(4))
console.log(saying(5))
console.log(saying(6))
//312211
