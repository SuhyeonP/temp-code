// // fishing
//
// function solution (A, B) {
//     const N = A.length;
//     const alive = [];
//
//     alive.push(0);
//     let i = 1;
//
//     while (i < N) {
//         if(B[i] === 0 && B[alive[alive.length - 1]] === 1) {
//             if (A[i] > A[alive[alive.length - 1]]) {
//                alive.pop()
//             } else {
//                 i++;
//             }
//         } else {
//             alive.push(i);
//             i++;
//         }
//     }
//
//     return alive.length;
// }
//
// console.log(solution([4,3,2,1,5],[0,1,0,0,0]))
