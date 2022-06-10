function solution(array) {
    let total = 0;
    let answer = Number.MAX_SAFE_INTEGER;
    const temp = [];

    array.reduce((before, now, index) => {
       temp.push(before);
       if(index === array.length - 1) {
           total = before + now;
       }
       return before + now;
    });

    for(const value of temp) {
       answer = Math.min(answer, Math.abs(2*value - total));
    }

    return answer;
}

console.log(solution([3,1,2,4,3]))
