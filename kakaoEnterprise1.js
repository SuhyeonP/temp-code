function solution (arr) {
    let answer = [];

    let dataMap = new Map();

    arr.sort((a,b)=>a-b).forEach((ele) => {
        const counting = ele.toString(2).split('').filter((find) => find === '1').length;

        dataMap.set(counting, dataMap.has(counting) ? [...dataMap.get(counting), ele] : [ele]);
    });
    console.log(dataMap);

    return answer;
}

// console.log(solution([5,3,2,1,4]))
console.log(solution([5,8,4,12,11]))