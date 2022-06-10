function solution(n, results) {
  const range = [...Array(n).keys()].map((e) => e + 1);

  const wins = {};
  const looses = {};

  // wins 의 key가 이긴 사람, value 가 그에 진 애들


  range.forEach((key) => {
    wins[key] = new Set([]);
    looses[key] = new Set([]);
  });

  results.forEach(([winner, looser]) => {
    wins[winner].add(looser);
    looses[looser].add(winner);
  });



  range.forEach((i) => {
    // i 선수를 이긴 선수 (looses[i]는 i 선수에게 패한 선수들 (wins[i]) 도 이김)
    for (const winner of [...looses[i]]) {
      if(!wins[winner]) continue;
      for (const looser of wins[i]) {
        wins[winner].add(looser)
      }
    }

    for (const looser of [...wins[i]]) {
      if (!looses[looser]) continue;
      for (const winner of looses[i]) {
        looses[looser].add(winner)
      }
    }
  });


  return range.reduce((ans, i) => (wins[i].size + looses[i].size === n - 1 ? ans + 1 : ans), 0)
}


console.log(solution(5, [[4, 3], [4, 2], [3, 2], [1, 2], [2, 5]]));
