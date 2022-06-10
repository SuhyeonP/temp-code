function rotation (board, boolean, query, arr) {
    const [x1, y1, x2, y2] = query.map((ele) => ele - 1);

    for(let i = y1; i < y2; i++) {
        boolean ? arr.push(board[x1][i]) : board[x1][i] = arr.shift();
    }

    for(let i = x1; i < x2; i++) {
        boolean ? arr.push(board[i][x2]) : board[i][x2] = arr.shift();
    }

    for(let i = y2; i < y1; i--) {
        boolean ? arr.push(board[x2][i]) : board[x2][i] = arr.shift();
    }

    for(let i = x2; i < x1; i--) {
        boolean ? arr.push(board[i][y1]) : board[i][y1] = arr.shift();
    }

}

function solution (rows, columns, queries) {
    const answer = [];

    const board = [];

    for(let i = 0; i < rows; i++) {
        const temp = [];
        for(let j = 0; j < columns; j++) {
            temp.push(i*6 + j + 1);
        }
        board.push(temp);
    }

    queries.forEach((query) => {
        const cycle = [];
        rotation(board, true, query, cycle);
        console.log(cycle)
    })



    return answer;
}

console.log(solution(6, 6, [[2,2,5,4],[3,3,6,6],[5,1,6,3]]))
// console.log(solution(100, 97,[[1,1,100,97]]))
