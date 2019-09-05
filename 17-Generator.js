//1.Generator 函数除了状态机 还是一个遍历器对象生成的函数
//Generator函数特点:一,function关键字与函数名之间有一个*号 二:函数体内部使用yield表达式 定义不同的内部状态
function* G(){
    console.log('started execute 1');
    yield 1;
    console.log('started execute 2');
    yield 2;
    console.log('started execute 3');
    yield 3;
    console.log('started return 4')
    return 4;
}
let k = G();   //返回一个遍历器对象
console.log('before excute next()!!!');
console.log('k.next()', k.next());
console.log('k.next()', k.next());
console.log('k.next()', k.next());
console.log('k.next()', k.next());

//2.Generator 函数执行后 并不会执行内部的代码 而是返回一个遍历器对象 执行遍历器对象的next方法才会执行Generator函数内的代码

//3. yield
//[1]遇到yield表达式 就暂停执行后面的操作 并将紧跟在yield后面的那个表达式的值 作为返回的对象的value属性值
//[2]下一次调用next方法时 再继续往下执行 直到遇到下一个yield表达式
//[3]如果没有再遇到yield表达式 就一直运行到函数的结果 直到return 并将return语句后面的表达式的值作为返回对象的value属性值
//[4]如果该函数没有return语句 则返回对象的value属性值为undefined

//4.与iterator接口的关系
function* G1() {
    yield 1;
    yield 2;
    yield 3;
}
let t = {
    [Symbol.iterator](){
        return G1();
    }
}
for(let k of t){
    console.log('k:', k);
}


//5. next方法的参数
function* add(){
    let a1 = yield 1;//{value:1, done:false}
    let a2 = yield 2;
    let a3 = yield 3;
    console.log('a1:',a1);
    console.log('a2:',a2);
    console.log('a3:',a3);
}

let g = Add();   //返回一个遍历器 
console.log('g.next():', g.next()); //{value:1, done:false}
console.log('g.next(33333):', g.next(33333)); //{value:1, done:false} a1 = 33333
console.log('g.next(444):', g.next(444));   //{value:2, done:false}   a2 = 444
console.log('g.next(555):', g.next(555));   // {value:3, done:false}  a3 = 555
 
g.next();

//6.for...of循环
function* G1() {
    yield 1;
    yield 2;
    yield 3;
}
for(let k of G1()){
    console.log('k:', k);
}