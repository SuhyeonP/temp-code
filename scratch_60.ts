function fourSum(nums: number[], target: number) {
    const len = nums.length;

    if (len < 4) return [];

    nums.sort((a, b) => a - b);
    const answer: number[][] = [];

    let sum = 0;
    let goRight = 0;
    let goLeft = 0;

    for (let i = 0; i < len - 3; i ++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;

        for (let j = i + 1; j < len - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;

            goLeft = len - 1;
            goRight = j + 1;

            while (goRight < goLeft) {
                sum = nums[i] + nums[j] + nums[goRight] + nums[goLeft];

                if (sum < target) {
                    goRight ++;
                } else if (sum > target) {
                    goLeft --;
                } else {
                    answer.push([nums[i], nums[j], nums[goRight], nums[goLeft]]);
                    while (goRight < goLeft && nums[goRight] === nums[goRight + 1]) goRight ++;
                    while (goRight < goLeft && nums[goLeft] === nums[goLeft - 1]) goLeft --;
                    goRight ++;
                    goLeft --;
                }
            }
        }
    }


    return answer;
}

console.log(fourSum([-1,2,0,0,1,-2], 0))
console.log(fourSum([2,2,2,2,2], 8))
