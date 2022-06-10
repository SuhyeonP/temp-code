
function threeSumClosest(nums: number[], target: number): number {
    let length = nums.length;
    let answer = 0;

    if(length === 3) {
        return nums[0] + nums[1] + nums[2];
    }

    nums.sort((a, b) => a - b);

    let closet = Infinity;

    for(let i = 0; i < length; i++) {
        let j = i + 1;
        let k = length - 1;

        while (j < k) {
            let sum = nums[i] + nums[j] + nums[k];

            let diff = sum - target;

            if (diff === target) {
                return sum;
            } else if (diff > 0) {
                k--;
            } else {
                diff = target - sum;
                j++;
            }

            if(diff < closet) {
                closet = diff;
                answer = sum;
            }
        }
    }

    return answer;
};

console.log(threeSumClosest([-1,2,1,-4], 1))
