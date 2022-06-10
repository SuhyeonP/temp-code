function test(inpu) {
  if (
    /^[-\w\s]*[a-zA-Z\d][-\w\s]*$/g.test(inpu)
  ) {
    return 'yes'
  }else {
    return 'no'
  }
}

console.log(test('- d-_ '))
console.log(test('Adfkn   dkfj2_dfj'))
console.log(test('_-Adfkn   dkfj2_dfj'))
console.log(test('- -_ '))
console.log(test('- d--'))
console.log(test('- -==-='))
console.log(test('- -_-'))

// ^[-\w\s]*[a-zA-Z\d][-\w\s]*$

// /[-\w\s]*[a-zA-Z0-9][-\w\s]*/g