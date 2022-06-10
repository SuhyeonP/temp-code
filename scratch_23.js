function solution (n, results) {
  const range = Array.from({length: n}, (v, i) => i + 1);

  const wins = {};
  const loses = {};

  range.forEach((ele) => {
    wins[ele] = new Set([]);
    loses[ele] = new Set([]);
  });

  results.forEach(([winner, loser]) => {
    wins[winner].add(loser);
    loses[loser].add(winner);
  });

  range.forEach((i) => {
    for(const winner of [...loses[i]]) {
      if (!wins[winner]) continue;
      for (const loser of wins[i]) {
        wins[winner].add(loser);
      }
    }

    for (const loser of [...wins[i]]) {
      if (!loses[loser]) continue;
      for (const winner of loses[i]) {
        loses[loser].add(winner);
      }
    }
  })

  return range.reduce((ans, i) => (wins[i].size + loses[i].size === n - 1 ? ans + 1 : ans), 0)
}

console.log(solution(5, [[4, 3], [4, 2], [3, 2], [1, 2], [2, 5]]));

