const test = [1,3,2,5,4];

test.splice(2,1)
console.log(test)

function removeDuplicates(nums: number[]): number {
    if(nums.length < 1) return 0;
    let left = 0;
    let count = 1;

    for (let i = 0; i < nums.length; i++) {
        if(nums[i] !== nums[left]) {
            left++;
            nums[left] = nums[i];
            count++;
        }
    }

    return count;
}

console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]))
console.log(removeDuplicates([1,1,2]))
