

function sortColors(nums: number[]) {
    const len = nums.length;
    for (let i = 0; i < len; i++) {
        let min = nums[i];
        for (let j = i + 1; j < len; j++) {
            if (nums[j] < min) {
                const temp = nums[i];
                min = nums[j];
                nums[i] = nums[j];
                nums[j] = temp;
            }
        }
    }
    return nums;
}


console.log(sortColors([2,0,1]))
