
const a = {
    name: {
        my: {
            test: 'aaa',
            content: 123
        }
    }
}

const {name: {my}} = a;
console.log(my)