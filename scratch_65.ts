function merge(intervals: number[][]): number[][] {
    const len = intervals.length;

    if (len < 2) return intervals;

    const result = [];
    let previous = intervals[0];

    for (let i = 1; i < len; i++) {
        if (previous[1] > intervals[i][0]) {
            previous[1] = Math.max(intervals[i][0], previous[1]);
        } else {
            result.push(previous);
            previous = intervals[i];
        }
    }

    result.push(previous)
    return result;
}

console.log(merge([[1,3],[2,6],[8,10],[15,18]]))
