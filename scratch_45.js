const t1 = '11211'
const t2 = '110011'
console.log(t1.slice(0 , Math.floor(t1.length/2)))
console.log(t1.slice(Math.ceil(t1.length/2)))
const isPalindrome = function(x) {
    const temp = x.toString();
    const length = temp.length;
    if (length % 2 === 0) {
        return temp.slice(0,temp.length / 2).split('').reverse().join('') === temp.slice(temp.length / 2);
    } else {
        return temp.slice(0, Math.floor(length / 2)).split('').reverse().join('') === temp.slice(Math.ceil(length / 2));
    }
};

console.log(isPalindrome(1001))
