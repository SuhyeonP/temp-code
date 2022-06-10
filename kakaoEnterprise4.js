function tree(nodes) {
    const splitData = nodes.match(/[A-Z)]/g);
    let filteringData = [];
    let cache = [];
    let error = '';
    splitData.forEach((ele) => {
        if (ele === ')') {
            filteringData.push(cache);
            cache = [];
        } else {
            cache.push(ele);
        }
    });
    filteringData.sort();
    const head = filteringData[0][0];

    let newMap = new Map();

    filteringData.forEach((ele) => {
        if(ele[0]>ele[1]) {
            error = 'E3';
            return;
        }
        newMap.set(ele[0], newMap.has(ele[0]) ? [...newMap.get(ele[0]),ele[1] ] : [ele[1]])
        if(newMap.get(ele[0]).length > 2) {
            error = 'E1';
            return;
        }
    });

    if(error !== '') {
        return error;
    }

    let answer = loop(newMap, newMap.get(head), head, {})[head];


    return `(${head}${answer})`;
}


function loop(map, children, key, prev) {
    const temp = children.reduce((before, now) => {
        const checkChildren =  map.get(now);
        if (checkChildren) {
            const temp = loop(map, checkChildren, now, before);
            const value = before[key];
            let firstText = '';
            children.forEach((child) => {
                const childTemp = temp[child];
                if(childTemp) {
                    firstText += `(${child}${childTemp})`;
                }
            })
            if(!value) {
                before[key] = firstText;
                return before;
            } else {
                before[key] = firstText;
                return before;
            }
        } else {
            const value = before[key];
            if (value) {
                before[key] = before[key] +`(${now})`;
            } else{
                before[key] = `(${now})`;
            }
            return before;
        }
    },prev);
    return temp;
}


let ex1 = '(B,D) (D,E) (A,B) (C,F) (E,G) (A,C)';
let ex7 = '(A,B) (B,D) (A,C) (C,E)';
let ex2 = '(A,B) (A,C) (B,G) (C,H) (E,F) (B,D) (C,E)';
let ex3 = '(A,B) (A,C) (B,D) (D,C)'
console.log(tree(ex1))
console.log(tree(ex7))
console.log(tree(ex3))
console.log(tree(ex2))

// todo check error case


//function solution (str) {
//     let answer = [];
//     const split = str.match(/[^(, )]/g);
//     let makeGroup = [];
//     const checkChild = new Map();
//     let checkBucket = '';
//
//     for (let i = 0; i < split.length; i+=2) {
//         const prev = makeGroup.slice(makeGroup.length - 1, makeGroup.length + 1);
//         const temp = [split[i], split[i+1]];
//         if (prev.length > 0 && prev[0].sort().join('') === temp.sort().join('')){
//             return 'error two';
//         }
//
//         makeGroup.push([split[i], split[i+1]]);
//     }
//
//     makeGroup.sort();
//
//
//     for(let i = 0; i < makeGroup.length; i++) {
//         checkChild.set(makeGroup[i][0], checkChild.has(makeGroup[i][0]) ? [...checkChild.get(makeGroup[i][0]), makeGroup[i][1]] : [makeGroup[i][1]]);
//         if(checkChild.get(makeGroup[i][0]).length > 2) {
//             return 'error one';
//         }
//     }
//
//
//     let visited = new Array(makeGroup.length + 1).fill(false);
//
//
//     function dfs(start, temp, cnt) {
//         temp.push(start);
//         checkBucket += start;
//         if(temp.length === makeGroup.length + 1) {
//             answer = temp;
//             visited[makeGroup.length] = true;
//             return true;
//         }
//
//         for (let i = 0; i < makeGroup.length; i++) {
//             if (!visited[i] && start === makeGroup[i][0]) {
//                 if(temp[temp.length - 1] === makeGroup[i][0]){
//                     checkBucket += '('
//                 }
//                 visited[i] = true;
//                 const result = dfs(makeGroup[i][1], temp, cnt + 1);
//                 if (result) {
//                     checkBucket += ')'
//                     return true;
//                 }
//                 if (temp.indexOf(start) === i){
//                     const temp = checkBucket.replace(start, '(' + start);
//                     checkBucket = temp;
//                 } else {
//                     if(i === makeGroup.length - 1) {
//                         checkBucket += ')'
//                         console.log(i, start, checkBucket)
//                         console.log(temp, makeGroup[i],  cnt)
//                     }
//                 }
//             } else if(i === makeGroup.length - 1) {
//                 checkBucket += ')'
//             }
//         }
//
//         return false;
//     }
//
//
//
//
//     if(!dfs(makeGroup[0][0], [], 0)) {
//         if(answer.length === 0){
//             return 'error four';
//         } else {
//             return 'error five';
//         }
//     }
//     const checkSort = answer.slice().sort();
//     const checkDuplicate = checkSort.filter((ele, idx) => ele !== checkSort[idx + 1]).length;
//     if(checkDuplicate !== answer.length) {
//         return 'error three'
//     }
//
//     return answer;
// }
//
// // 검색 방지로 에러메세지 바꿈