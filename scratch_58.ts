export function fourSum(nums: number[], target: number) {
    const len = nums.length;

    if (len < 4) {
        return [];
    }

    const answer: number[][] = [];
    let goRight = 0;
    let goLeft = 0;
    let sum = 0;

    nums.sort((a, b) => a - b);

    for (let i = 0; i < len - 3; i ++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
        if (nums[i] + nums[len - 1] + nums[len - 2] + nums[len - 3] < target) continue;

        for(let j = i + 1; j < len - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            // todo check 25line necessary?
            if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) break;
            if (nums[i] + nums[j] + nums[len - 1] + nums[len - 2] < target) continue;

            goRight = j + 1;
            goLeft = len - 1;

            while (goRight < goLeft) {
                sum = nums[i] + nums[j] + nums[goRight] + nums[goLeft];

                if (sum < target) {
                    goRight ++;
                } else if (sum > target) {
                    goLeft --;
                } else {
                    answer.push([nums[i], nums[j], nums[goRight], nums[goLeft]]);
                    // while 을 통해서 같은 수 통과 (현재 target === sum) 과 동일하게 나올수있는 값을 없애는거임
                    while (goRight < goLeft && nums[goRight] === nums[goRight + 1]) goRight++;
                    while (goRight < goLeft && nums[goLeft] === nums[goLeft - 1]) goLeft--;
                    goRight ++;
                    goLeft --;
                }
            }
        }
    }

    return answer;
}

function newCheck(nums: number[], target: number) {
    const len = nums.length;

    if (len < 4) {
        return [];
    }
    const answer: number[][] = [];
    let sum = 0;
    let goLeft = 0;
    let goRight = 0;
    nums.sort((a, b) => a - b);

    for (let i = 0; i < len - 3; i++) {
        if (i > 0 && nums[i] === nums[i  - 1]) continue;        
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;

        const next = i + 1;
        for (let j = next; j < len - 2; j++) {
            if(j > next && nums[j] === nums[j - 1]) continue;
            goRight = j + 1;
            goLeft = len - 1;

            while (goRight < goLeft) {
                sum = nums[i] + nums[j] + nums[goRight] + nums[goLeft];

                if (sum > target) {
                   goLeft --;
                } else if (sum < target) {
                    goRight ++;
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

// console.log(newCheck([1,0,-1,0,-2,2], 0))
console.log(newCheck([2,2,2,2,2], 8))
console.log(fourSum([1,0,-1,0,-2,2], 0))
// console.log(fourSum([2,2,2,2,2], 8))
