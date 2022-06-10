const move = [
    [1,2],
    [1,-2],
    [-1,2],
    [-1,-2],
    [2,1],
    [2,-1],
    [-2,1],
    [-2,-1],
]


function solution (n, startRow, startCol, endRow, endCol) {
    if (n < 5 || n > 150) {
        return -1;
    }

    if (startRow < 0 || startCol < 0 || startRow >= n || startCol >= n) {
        return -1;
    }

    if (endRow < 0 || endCol < 0 || endRow >= n || endCol >= n) {
        return -1;
    }

    if (startRow === endRow && startCol === endCol) {
        return 0;
    }

    let moving = 0;
    let chessBoard = new Array(n).fill(new Array(n).fill(null));

    chessBoard[startRow][startCol] = moving;

    function checkMove(ches) {

    }

    return moving;
}