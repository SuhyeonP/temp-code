function tree(nodes) {
    const splitData = nodes.match(/[A-Z)]/g);
    let filteringData = [];
    let cache = [];
    let error = '';
    let checkHead = '';
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
    });

    if(error !== '') {
        return error;
    }


    console.log(newMap)

    let answer = loop(newMap, newMap.get(head), head, {})[head];


    return `(${head}${answer})`;
}


function loop(map, children, key, prev) {
    const temp = children.reduce((before, now, idx) => {
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

function checkLastChild(arr, map) {

}
function checkLast (check, key) {

}


let ex1 = '(B,D) (D,E) (A,B) (C,F) (E,G) (A,C)';
let ex7 = '(A,B) (B,D) (A,C) (C,E)';
let ex2 = '(A,B) (A,C) (B,G) (C,H) (E,F) (B,D) (C,E)';
let ex3 = '(A,B) (A,C) (B,D) (D,C)'
// console.log(tree(ex1))
// console.log(tree(ex2))
console.log(tree(ex1))
console.log(tree(ex2))