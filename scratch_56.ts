function backtrack(ans, cur, open, close, max) {
    if(cur.length === max * 2) {
        ans.push(cur);
        return;
    }

    if(open < max) {
        backtrack(ans, cur + '(', open + 1, close, max);
    }
    if(close < open) {
        backtrack(ans, cur + ')', open, close + 1, max);
    }
}

function generateParenthesis(n: number): string[] {
    const answer = [];

    backtrack(answer, "", 0, 0, n);

    return answer;
}

console.log(generateParenthesis(3))
