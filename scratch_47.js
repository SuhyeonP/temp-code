let name = 'hong'
const privateFunction1 = () => {}
const publicFunction1 = () => {
    name = 'park';
    privateFunction1();
}

export {name, publicFunction1}

//
// class Test {
//     constructor() {}
//     private a = 10;
// }
// const instance = new Test();
// export {instance}



class Test {
    a = 10;
    constructor() {
    }
    value(){
        return this.a;
    }
}

const Test2 = {
    a : 10,
    value(){
        return this.a
    }
}

const Test3 = new Object({
    a : 10,
    value(){
        return this.a
    }
})
