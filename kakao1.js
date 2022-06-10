function solution (heights, speeds) {
    let answer = 1;

    let times = heights.map((ele, idx) => Math.floor(ele/speeds[idx]) + (ele % speeds[idx]));
    times.sort((a,b) => a-b);
    times.shift();
    for(let i = 0; i < times.length; i++) {
        if(answer < times[i]) {
            answer++;
        }
    }


    return answer;
}

console.log(solution([4,3,1],[3,2,1]))
console.log(solution([1,3,5,4,8],[1,2,2,1,2]))
console.log(solution([4,3],[2,2]))