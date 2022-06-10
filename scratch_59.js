function test(i1) {
    console.log(this.name, i1);
}

function applyTest(e) {
    console.log(e, this.name)
}

let first = {
    name: 'test-here'
}

test.call(first, ['123', '1111'])
applyTest.apply(first, [123,345,32])
