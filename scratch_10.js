function rotation (board, query, flag, arr) {
    const [x1, y1, x2, y2] = query.map(ele => ele - 1);
    // 상
    for (let y=y1, len = y2, x = x1; y<len; y++) {
        flag ? arr.push(board[x][y]) : board[x][y] = arr.pop();
    }
    // 우
    for (let x=x1, len = x2, y = y2; x<len; x++) {
        flag ? arr.push(board[x][y]) : board[x][y] = arr.pop();
    }
    // 하
    for (let y=y2, len = y1, x = x2; y>len; y--) {
        flag ? arr.push(board[x][y]) : board[x][y] = arr.pop();
    }
    // 좌
    for (let x=x2, len = x1, y = y1; x>len; x--) {
        flag ? arr.push(board[x][y]) : board[x][y] = arr.pop();
    }
}

function solution(rows, columns, queries) {
    let answer = [];
    let board = [];

    for(let i = 0; i< rows;i ++) {
        let newBoard = [];
        for(let j = 0; j < columns; j++) {
            newBoard.push(i*rows + j + 1);
        }
        board.push(newBoard);
    }

    if(queries.length === 1) {
        return [board[queries[0][0]][queries[0][1]]]
    }

    queries.forEach((query) => {
        const arr = []
        rotation(board, query, true, arr);
        const setSetting = arr.slice(arr.length-1).concat(arr.slice(0, arr.length-1)).reverse();
        answer.push(Math.min(...arr));

        rotation(board, query,  false, setSetting);
    })


    return answer;
}

console.log(solution(6,6,[[2,2,5,4],[3,3,6,6],[5,1,6,3]]))