function solution (maps) {
  let answer = 1;
  const queue = [];

  const rowLength = maps.length;
  const colLength = maps[0].length;

  const dx = [-1,1,0,0];
  const dy = [0,0,-1,1];

  const visited = maps;

  queue.push([0,0]);
  visited[0][0] = 0;

  while (queue.length > 0) {
    let size = queue.length;

    for (let i = 0; i < size; i++) {
      let [x, y] = queue.shift();

      for(let j = 0; j < 4; j++) {
        let nx = x + dx[j];
        let ny = y + dy[j];

        if (nx >= 0 && nx < rowLength && ny >= 0 && ny < colLength && visited[nx][ny] === 1) {
          if (nx === rowLength - 1 && ny === colLength - 1) {
            return ++answer;
          }

          queue.push([nx, ny]);
          visited[nx][ny] = 0;
        }
      }
    }
    answer++;
  }


  return -1;
}

let ex1 = [[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]];
console.log(ex1);
console.log(solution(ex1));
// 11
// console.log(solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,0],[0,0,0,0,1]]));