function solution(maps) {
  let answer = 1;
  const queue = [];
  const visited = maps;

  const rows = maps.length;
  const cols = maps[0].length;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  // move

  queue.push([0,0]);// 처음 index
  visited[0][0] = 0;// 무조건 방문하는거니까

  while (queue.length > 0) {
    let size = queue.length;

    for (let i = 0; i < size; i++) {
      const [row, col] = queue.shift();

      for (let j = 0; j < 4; j++) {
        const nx = row + dx[j];
        const ny = col + dy[j];

        if (0 <= nx && nx < rows && 0 <= ny && ny < cols && visited[nx][ny]) {
          if (nx === rows - 1 && ny === cols - 1) {
            // 맨끝
            return ++answer;
          }
          queue.push([nx, ny]);
          // 마지막으로 있던위치에서 계속해서 경로탐색을 위해서
          visited[nx][ny] = 0;
          // 경로탐색전에 visited 로 만들어줌
        }
      }
    }
    answer ++;
  }

  return -1;
}


let ex1 = [[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]];
console.log(ex1);
console.log(solution(ex1));
// 11
// console.log(solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,0],[0,0,0,0,1]]));