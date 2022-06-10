let ex1 = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 6], [3, 7], [3, 8], [3, 9], [4, 10], [4, 11], [5, 12], [5, 13], [6, 14], [6, 15], [6, 16], [8, 17], [8, 18]];

function solution(nodes) {
  const network = new Map();
  let computers = nodes.length + 1;

  for (let i = 0; i < nodes.length; i++) {
    network.set(nodes[i][0], network.has(nodes[i][0]) ? [...network.get(nodes[i][0]), nodes[i][1]] : [nodes[i][1]]);
  }

  function findChild(childrens, parent, prev) {
    childrens.forEach((child) => {
      if (network.has(child)) {
        findChild(network.get(child), child, prev);
        const value = prev[parent];
        if (value) {
          prev[parent].push(...[child, ...prev[child]]);
        } else {
          prev[parent] = [child, ...prev[child]];
        }
      } else {
        const value = prev[parent];
        if (value) {
          prev[parent].push(child);
        } else {
          prev[parent] = [child];
        }
      }
    });
    return prev;
  }

  console.log(network);

  const child = findChild(network.get(0), 0, {});
  console.log(child);
  let counting = 0;
  for (const [key, value] of network) {
    const max = new Array(value.length).fill(0);
    for (let i = 0; i < value.length; i++) {
      if (child[value[i]]) {
        max[i] = child[value[i]].length;
      }
    }
    counting += Math.max(...max);
  }

  return computers - counting + 1;
}

// console.log(solution(ex1));

let ex2 = [[0,1],[0,2],[1,3],[2,4],[2,5],[2,6],[3,7],[3,8],[3,9]]
let ex3 = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[2,7],[3,8],[3,9],[3,10],[4,11],[4,12],[4,13]]

console.log(solution(ex2));
// console.log(solution(ex3));
//todo 접근 잘못함 최소 감염수임