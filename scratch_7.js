function tree(nodes) {
    let answer = '';
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

    // let newTree = {};
    let newMap = new Map();
    // console.log(filteringData);

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

    const copy = filteringData.slice();

    let copyMap = [];

    for(const [key,value] of newMap) {
        copyMap.push(`(${key}(${value.join(')(')}))`)
    }

    console.log(copyMap)

    const last = checkLastChild(copy, newMap);

    for(const key of [last]) {
        console.log(key)
    }
    //
    // for (const key in newTree) {
    //     if (newTree[key].length > 2) {
    //         return 'E1';
    //     } else {
    //
    //     }
    // }


    return answer;
}

function loop (map, child, key) {
    const temp = child.map((ele) => {
        const children = map.get(ele);
        if(children) {
            return loop(map, children, ele);
        } else {
            return `(${ele})`;
        }
    });
    return temp;
}

function checkLastChild(arr, map) {
    const check = arr.reduce((a,b,c,d) => {
        const haveChildren = map.get(b[1]);

        if(!haveChildren) {
            console.log(b);
            const value = a[b[0]];
            if (value) {
                a[b[0]] = value +`(${b[1]})`;
            } else {
                a[b[0]] = `(${b[1]})`;
            }
            return a;
        } else {
            console.log(b)
            console.log(haveChildren)
            return a;
        }
    },{});
    console.log(check)

    for(const key in check) {
        console.log(key, check[key])
        console.log(`(${key}${check[key]})`);
        check[key] = `(${key}${check[key]})`;
    }
    console.log(check);
    return check;
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