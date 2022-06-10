
function solution (n, a, cards) {
    let game = [];
    let j = [];

    for(let i = 0; i < a; i++) {
        game.push(cards[i]);
    }
    game.push('X');
    for(let i = a ; i < n - 1; i++) {
        game.push(cards[i]);
    }
    console.log(game);

    const rsp = 'PRS';

    while(game.length > 1) {
        let temp = [];

        while(game.length !== 0) {
            let left = game.shift();

            if(game.length === 0){
                temp.push(left);
            } else {
                let right = game.shift();

                if(left === 'X' || right === 'X') {
                    j.push(left === 'X' ? right : left);
                    temp.push('X')
                } else {
                    let l = rsp.indexOf(left);
                    let r = rsp.indexOf(right);

                    if(l - r === 1 || l - r === -2) {
                        temp.push(right)
                    } else if(l - r === -1 || l - r === 2) {
                        temp.push(left)
                    }
                }
            }
        }
        game = temp;
    }
    return j.filter((ele, idx)=>ele !== j[idx + 1]).length - 1;
}

console.log(solution(3,2,'PS'))
console.log(solution(4,1,'PRS'))

//function getScore(l, r) {
//     const rsp = 'RSP';
//
//     const diff = rsp.indexOf(l) - rsp.indexOf(r);
//
//     if(diff === -1 || diff === 2) {
//         return l;
//     } else if(diff === 1 || diff === - 2) {
//         return r;
//     }
// }
//
// function solution(n, a, cards) {
//     let j = [];
//     let game = cards.split('');
//     let last = game.splice(0,a);
//     game = last.concat(['X']).concat(game);
//     console.log(game)
//
//     while (game.length > 1) {
//         let temp = [];
//         while(game.length !== 0) {
//             let left = game.shift();
//             if(!game.length) {
//                 temp.push(left)
//             } else {
//                 let right = game.shift();
//                 if (left === 'X' || right === 'X') {
//                     temp.push('X');
//                     j.push(left === 'X' ? right : left);
//                 } else {
//                     temp.push(getScore(left, right));
//                 }
//             }
//         }
//         game = temp;
//     }
//
//     return j.length - 1;
// }
//
// console.log(solution(3,2,'RS'))
// console.log(solution(5,2,'RSSP'))
// console.log(solution(4,1,'PRS'))