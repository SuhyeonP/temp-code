export function lengthOfLongestSubstring(s: string): number {
    if(s.length <= 1) {
        return s.length;
    }

    const answer: string[] = [];
    let temp: string[] = [];

    for(let i = 0; i < s.length; i++) {
        const now = s[i];
        if (temp.includes(now)) {
            temp.splice(0, temp.indexOf(now) + 1);
            temp.push(now);
            console.log(temp)
        } else {
            temp.push(now);
            console.log(temp)
            answer.push(temp.join(''))
        }
    }
    console.log(answer);

    answer.sort((a, b) => b.length - a.length)
    return answer[0].length;
}

console.log(lengthOfLongestSubstring('aab'))
console.log(lengthOfLongestSubstring('pwwkew'))
console.log(lengthOfLongestSubstring('bbbbbb'))
console.log(lengthOfLongestSubstring('au'))
console.log(lengthOfLongestSubstring('dvdf'))
console.log(lengthOfLongestSubstring('aabaab!bb'))

