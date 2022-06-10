
function binarySearch(array, targetValue) {
    let left = 0;
    let right = array.length - 1;
    while(left <= right) {
        let mid = Math.floor((left + right) / 2);
        if(array[mid] === targetValue) {
            return array[mid];
        }
        else if(array[mid] > targetValue) {
            right = mid - 1;
        }
        else if(array[mid] < targetValue) {
            left = mid + 1;
        }
    }
    return -1;
}

