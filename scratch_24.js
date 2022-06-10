const solution = (n, edges) => {
  const map = new Map();
  edges.map(edge => edge.sort());
  edges.sort();
  const distance = {};

  for(let i = 1; i < n + 1; i++) {
    distance[i] = 0;
  }

  edges.forEach(([node, edge]) => {
    map.set(node, map.has(node) ? [...map.get(node), edge] : [edge])
  })

  console.log(map);


  function dfs (lib, children, parent, prev) {

  }


  console.log(distance);

  return 0;
}

// console.log(solution(6, [[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]));
console.log(solution(5, [[3, 6], [3, 2], [1, 3], [1, 2], [5, 2]]));

function loop (tree, children, parent, prev) {
  return children.reduce((before, now) => {
    const getGrandChildren = tree.get(now);

    if (getGrandChildren) {
      const temp = loop(tree, getGrandChildren, now, before);
      let txt = '';

      children.forEach((child) => {
        if (temp[child]) {
          txt += `(${child}${temp[child]})`;
        }
      })
      before[parent] = txt;
      return before;
    } else {
      const value = before[parent];
      if (value) {
        before[parent] = before[parent] + `(${now})`;
      } else {
        before[parent] = `(${now})`;
      }
      return before;
    }
  }, prev)
}



// https://programmers.co.kr/learn/courses/30/lessons/49189