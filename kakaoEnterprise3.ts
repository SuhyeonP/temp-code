function counting (length) {
    return Math.pow(2, length) - 1;
}

function solution(num: number) {
    const binaryNum = num.toString(2);

    // 예외처리
    if (binaryNum.length === 0) {
        return 0;
    } else if(binaryNum.length === 1){
        if(binaryNum === '0'){
            return 0;
        } else {
            return 1;
        }
    }

    let frontNum = counting(binaryNum.length);
    let swift = true;

    for(let i = 1; i < binaryNum.length; i++) {
        if(binaryNum[i] === '1'){
            if (swift) {
                frontNum -= counting(binaryNum.length - i);
            } else {
                frontNum += counting(binaryNum.length - i);
            }
            swift = !swift;
        }
    }

    return frontNum;
}


console.log(solution(4))
console.log(solution(13))
console.log(solution(11))



// 110 의 경우 (100 의 경우의 수) - (10의 경우의수)

// 1101101 의 경우 (1000000 의 수) - (100000 의 수) + (1000 의 수) -(100 의 수) + (1의 수)

// 2의 지수승의 경우 이진수로 표현한길이 의 제곱 -1 8의 경우 1000 => 2^4 => 길이가 4 => 2^4 - 1 이 경우의 수이다.




