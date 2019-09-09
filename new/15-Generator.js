//Genertor是ES6提供的一种异步方案 执行Generator函数会返回一个遍历器对象 Generator就是一个状态机+遍历器函数 返回的遍历器对象 可以依次遍历Generator函数内部的每一个状态

//形式上Generator函数是一个普通函数 但是又有两个特征 
//1.function关键字与函数名之间有一个*
//2.函数体内部使用yield表达式 定义不同的内部状态 (yield 产出的意思)
function* helloWorldGenerator(){
    yield 'hello';
    yield 'world';
    return 'ending';
}
var hw = helloWorldGenerator();
//这里代码定义了一个Generator函数 helloWorldGenerator 它内部有两个yield表达式(hello 和 world) 即该函数有三种状态 hello, world和return

//Generator函数的调用和普通函数一样 在后面加上() 调用Generator函数后 该函数并不执行 返回的也不是函数运行的结果 而是一个指向内部状态的指针对象 Iterator Object
//必须调用遍历器对象的next()方法 使得指针移向下一个状态 也就是说 每次调用next方法 内部指针就从函数头部或上一次停下来的地方开始执行 直到遇到下一个yield表达式 为止  换言之 Generator函数是分段执行的 yield表达式是暂停执行的标记 而next()可以即恢复执行
hw.next()  //{value:'hello', done:false}
hw.next()  //{value:'world', done:false}
hw.next()  //{value:'ending', done:true}
hw.next()  //{value:undefined, done:true}
//这里总共调用四次next() 每次调用都会停止在第一个遇到的yield状态结束处 等待下一次的next()

//总结一下 调用Generator函数 返回一个遍历器对象 代表Generator函数的内部指针 以后每次调用遍历器对象next方法 就返回一个有着value和done两个属性的对象 

//yield表达式
//由于Generator函数返回的遍历器对象 只有在调用next()方法才会遍历下一个内部状态 所以其实提供了一种可以暂停执行的函数 yield表达式就是暂停标志
//遍历器对象的next方法的运行逻辑如下 
//1.遇到yield表达式 就暂停执行后面的操作 并将紧跟在yield后面的哪个表达式的值 作为返回的对象的value属性值
//2.下一次调用next方法时 再继续往下执行 直到遇到下一个yield表达式
//3.如果没有再遇到新的yield表达式 就一直运行到函数结束 直到return语句为止 并将return语句后面的表达式的值 作为返回的对象的value属性值 
//4.如果函数没有return语句 则返回对象的value属性值为undefined

//需要注意的是 yield表达式后面的表达式 只有当调用next方法 内部指针指向该语句时才会执行 因此为JavaScript提供了手动的"惰性求值" 语法功能
function* gen(){
    yield 123 + 456;
}
//这里yield后面的表达式123+456 不会立即求值 只有在next方法调用以后才会求值

//yield表达式与return语句即相似又不同。
//相似处:每次都能返回后面紧跟的语句的表达式的值
//区别:每次遇到yield 函数暂停执行 下一次再从该为止继续向后执行 而return 语句不具备位置记忆的功能
//一个函数可以执行多次yield语句 但是只有一次return 所以拥有yield的Generator被称为"生成器"
function* f(){
    console.log('executed!')
}
var generator = f();
setTimeout(function(){
    generator.next();
}, 2000);

//yield表达式只能用在Generator函数里面 用在其他任何地方都会报错
(function(){
    yield 1;
})() //SyntaxError: Unexpected number

//yield表达式如果用在另一个表达式之中 必须放在圆括号里
function* demo(){
    console.log('Hello' + yield);   //SyntaxtError
    console.log('Hello' + yield 123); //SyntaxError
    console.log('Hello' +(yield)); //Ok
    console.log('Hello' +(yield 123)); //Ok
}
//yield表达式用作函数参数或放在赋值表达式的右边 可以不加括号
function* demo(){
    foo(yield 'a', yield 'b'); //OK
    let input = yield; //OK
}

//与Iterator接口的关系
//任意一个对象的Symbol.iterator方法 等于该对象的遍历器生成函数 调用该函数会返回该对象的一个遍历器对象
//由于Generator函数就是遍历器生成函数 因此可以把Generator赋值给对象的Symbol.iterator属性 从而使该对象具有Iterator接口
var myIterator = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable] //[1,2,3]
//这里Generator函数赋值给了Symbol.iterator属性 从而使得myIterator对象具有了Iterator接口 可以被...运算符遍历了
//Generator函数执行后 返回一个遍历器对象 该对象本身也具有Symbol.iterator属性 执行后返回自生
function* gen(){
    //...
}
var g = gen();
g[Symbol.iterator]() === g   //true
//上面代码中 gen是一个Generator函数 调用它会生成一个遍历器对象g 它的Symbol.iterator属性也是一个遍历器对象生成的函数 执行后返回自己

//next方法的参数
//yield表达式本身没有返回值 或者说总是返回undefined next方法可以带一个参数 该参数就会被当作上一个yield表达式的返回值
function* f(){
    for(var i = 0; true; i++){
        var reset = yield i;
        if(reset){i = -1}
    }
}
var g = f();

g.next()  //{value:0, done:false}
g.next()  //{value:1, done:false}
g.next()  //{value:0, done:false}
//这里Generator函数是一个无限运行的函数 如果next没有参数 每次运行到yield表达式 变量reset的值总是undefined 当next方法带一个参数true时 变量reset就被重置为这个参数 因此i会等于-1 下一轮循环就会从-1开始递增
//这个功能有很重要的语法意义 Generator函数从暂停状态到恢复运行 它的上下文(context)是不变的 通过next方法的参数 就有办法在Generator函数开始运行之后 继续向函数体内部注入值 也就是说 可以在Generator函数运行的不同阶段 从外部向内部注入不同的值 从而调整函数行为
function* foo(x){
    var y = 2*(yield(x+1));
    var z = yield(y/3);
    return(x+y+z);
}
var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }








