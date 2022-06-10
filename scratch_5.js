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
    console.log(filteringData);

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

    console.log(newMap)



    merging(copy, newMap)
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

function merging(arr, map) {
    const check = arr.reduce((a,b,c,d) => {
        const haveChildren = map.get(b[1]);

        if(haveChildren) {
            a[b[0]] = [b[1]]
            a[b[1]] = haveChildren;
            return a;
        } else {
            const value = a[b[0]];

            if (value) {
                if(value.indexOf(b[1]) > -1) {
                    a[b[0]].splice(value.indexOf(b[1]), 1)
                }
                a[b[0]].push('(' + b[1]+')')
            } else {
                a[b[0]] = ['('+b[1] + ')']
            }

            return a;
        }

    },{});
    console.log(check)

    for(const key in check) {
        console.log(key, check[key]);
        checkLast(check[key], key);
    }

    console.log(check)
}

function checkLast (check, key) {
    const temp = check.filter((ele)=>ele.indexOf('(') === -1);
    if(temp.length > 0) {
        console.log(key, temp)
        console.log(check)
    } else {
        console.log(check, key)
        console.log(key, check.join(''))
        const lastText = `(${key+check.join('')})`;
        console.log(lastText);
    }
}


let ex1 = '(B,D) (D,E) (A,B) (C,F) (E,G) (A,C)';
let ex2 = '(A,B) (A,C) (B,G) (C,H) (E,F) (B,D) (C,E)';
let ex3 = '(A,B) (A,C) (B,D) (D,C)'
// console.log(tree(ex1))
// console.log(tree(ex2))
console.log(tree(ex2))