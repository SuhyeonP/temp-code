function loop (data, children, parent, prev) {
  return children.reduce((before, now) => {
    const checkChildren = data.get(now);
    if (checkChildren) {
      const temp = loop(data, checkChildren, now, before);
      let firstText = '';

      children.forEach((child) => {
        const childTemp = temp[child];
        if (childTemp) {
          firstText += `(${child}${childTemp})`;
        }
      })
      before[parent] = firstText;
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
  },prev);
}

function solution (nodes) {
  const nodeArr = [];
  const temp = nodes.match(/\w/g);

  const tree = new Map();

  for(let i = 0; i < temp.length/2; i++) {
    const tempArr = [temp[i*2], temp[i*2+1]];
    if(tempArr[0] > tempArr[1]) {
      return 'E3';
    }
    if(tree.has(tempArr[0])) {
      const nowTree = tree.get(tempArr[0]);
      if (nowTree.length === 2) {
        return 'E1';
      } else if (nowTree.indexOf(tempArr[1]) !== -1) {
        return 'E2';
      }
    }
    nodeArr.push(tempArr);
  }

  nodeArr.sort();

  nodeArr.forEach(([parent, child]) => {
    tree.set(parent, tree.has(parent) ? [...tree.get(parent), child] : [child]);
  });

  console.log(nodeArr);
  const top = nodeArr[0][0];

  let answer = loop(tree, tree.get(top), top, {})[top];

  return `(${top}${answer})`;
}

let ex1 = '(B,D) (D,E) (A,B) (C,F) (E,G) (A,C)';
let ex2 = '(A,B) (A,C) (B,G) (C,H) (E,F) (B,D) (C,E)';

let ex3 = '(A,B) (A,C) (B,D) (D,C)' //e3

// console.log(solution(ex1));
console.log(solution(ex2));

