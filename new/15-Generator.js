//Genertor是ES6提供的一种异步方案 执行Generator函数会返回一个遍历器对象 Generator就是一个状态机+遍历器函数 返回的遍历器对象 可以依次遍历Generator函数内部的每一个状态

//形式上Generator函数是一个普通函数 但是又有两个特征 
//1.function关键字与函数名之间有一个*
//2.函数体内部使用yield表达式 定义不同的内部状态 (yield 产出的意思)
function* helloWorldGenerator() {
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
function* gen() {
    yield 123 + 456;
}
//这里yield后面的表达式123+456 不会立即求值 只有在next方法调用以后才会求值

//yield表达式与return语句即相似又不同。
//相似处:每次都能返回后面紧跟的语句的表达式的值
//区别:每次遇到yield 函数暂停执行 下一次再从该为止继续向后执行 而return 语句不具备位置记忆的功能
//一个函数可以执行多次yield语句 但是只有一次return 所以拥有yield的Generator被称为"生成器"
function* f() {
    console.log('executed!')
}
var generator = f();
setTimeout(function () {
    generator.next();
}, 2000);

//yield表达式只能用在Generator函数里面 用在其他任何地方都会报错
(function () {
    yield 1;
})() //SyntaxError: Unexpected number

//yield表达式如果用在另一个表达式之中 必须放在圆括号里
function* demo() {
    console.log('Hello' + yield);   //SyntaxtError
    console.log('Hello' + yield 123); //SyntaxError
    console.log('Hello' + (yield)); //Ok
    console.log('Hello' + (yield 123)); //Ok
}
//yield表达式用作函数参数或放在赋值表达式的右边 可以不加括号
function* demo() {
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
function* gen() {
    //...
}
var g = gen();
g[Symbol.iterator]() === g   //true
//上面代码中 gen是一个Generator函数 调用它会生成一个遍历器对象g 它的Symbol.iterator属性也是一个遍历器对象生成的函数 执行后返回自己

//next方法的参数
//yield表达式本身没有返回值 或者说总是返回undefined next方法可以带一个参数 该参数就会被当作上一个yield表达式的返回值
function* f() {
    for (var i = 0; true; i++) {
        var reset = yield i;
        if (reset) { i = -1 }
    }
}
var g = f();

g.next()  //{value:0, done:false}
g.next()  //{value:1, done:false}
g.next()  //{value:0, done:false}
//这里Generator函数是一个无限运行的函数 如果next没有参数 每次运行到yield表达式 变量reset的值总是undefined 当next方法带一个参数true时 变量reset就被重置为这个参数 因此i会等于-1 下一轮循环就会从-1开始递增
//这个功能有很重要的语法意义 Generator函数从暂停状态到恢复运行 它的上下文(context)是不变的 通过next方法的参数 就有办法在Generator函数开始运行之后 继续向函数体内部注入值 也就是说 可以在Generator函数运行的不同阶段 从外部向内部注入不同的值 从而调整函数行为
function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}
var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
//由于next方法的参数表示上一个yield表达式的返回值 所以在第一次使用next方法时 传递参数是无效的 从语意上来讲 第一个next方法用来启动遍历器对象 所以不用带有参数
function* dataConsumer() {
    console.log('Started');
    console.log(`1.${yield}`);
    console.log(`2.${yield}`);
    return 'result';
}
let genObj = dataCOnsumer();
genObj.next();   //started
genObj.next('a');   //1.a
genObj.next('b');   //2.b

//如果想第一次调用next方法时 就能够输入值 可以在Generator函数外面再包一层
function wrapper(generatorFunction) {
    return function (...args) {
        let generatorObject = generatorFunction(...args);
        generatorFunction.next();
        return generatorObject;
    }
}
const wrapped = wrapper(function* () {
    console.log(`First input:${yield}`);
    return 'DONE';
});

wrapped().next('hello!')   //First inout: hello!
//这里Generator函数如果不用wrapper先包一层 是无法第一次调用next方法就输入参数的

//for...of循环
//for...of循环可以自动遍历Generator函数时生成的Iterator对象 且此时不再需要调用next方法
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}
for (let v of foo()) {
    console.log(v);   //1 2 3 4 5
}
//for...of循环可以自动遍历 越过yield的暂停 done属性为true时 循环就会中止 且不包含该返回对象 所以return 6 就被忽略了

//Generator + for...of 实现斐波那契数列
function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (; ;) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}
for (let n of fibonacci) {
    if (n > 1000) break;
    console.log(n);
}

//原生的JavaScript对象没有遍历接口 无法使用for...of循环 通过Generator函数为它加上这个接口 就可以用了
function* objectEntries(obj) {
    let propkeys = Reflect.ownKeys(obj);
    for (let propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}
let jane = { first: 'Jane', last: 'Doe' };
for (let [key, value] of objectEntries(jane)) {
    console.log(`${key}:${value}`);   //first: Jane  last:Doe
}
//这里对象jane原生不具备Iterator接口 无法用for...of遍历 这是通过Generator函数objectEntries为它街上遍历器接口 就可以使用for...of遍历了 
//另一种加上遍历器的写法 将Generator函数加到对象的Symnol.iterator属性上面
function* objectEntries() {
    let propKeys = Object.keys(this);

    for (let propKey of propKeys) {
        yield [propKey, this[propKeys]];
    }
}
let jane = { first: 'Jane', last: 'Doe' };
jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
    console.log(`${key}:${value}`);   //first:Jane last:Doe
}

//除了for...of循环以外 扩展运算符(...) 解构赋值 和Array.from方法内部调用的 都是遍历器接口 这意味着 它们都可以将Generator函数返回的Iterator对象 作为参数
function* numbers() {
    yield 1
    yield 2
    return 3
    yield 4
}
//扩展运算符
[...numbers()]   //[1,2]

//Array.from方法
Array.from(numbers())   //[1,2]

//解构赋值
let [x, y] = numbers();  //x 1 ; y 2

//for...of循环
for (let n of numbers()) {
    console.log(n)  //1 2
}

//Generator.prototype.throw()
//Generator函数返回的遍历器对象 都有一个throw方法 可以在函数体外抛出错误 然后在Generator函数体内捕获
var g = function* () {
    try {
        yield;
    } catch (e) {
        console.log('inner catcher', e)  //'inner catcher' a
    }
};
var i = g();
i.next();   //next()只执行了一次 所以函数体内部只捕捉了a错误

try {
    i.throw('a');  //函数体外部抛出 a 错误
    i.throw('b');  //函数体外部排除 b 错误
} catch (e) {
    console.log('outer catcher', e);  //'outer catcher', b
}

//throw方法可以接收一个参数 该参数会被catch语句接收 建议抛出Error对象的实例

//不要混淆遍历器对象throw方法和全局throw命令 上面代码错误 使用遍历器对象throw方法抛出的 而不是用throw命令抛出的 后者只能被函数体外的catch语句捕获

//如果Generator函数内部没有部署 try...catch代码块 那么throw方法抛出的错误 将被外部try...catch代码块捕获

//如果Generator函数内部和外部 都没有部署try...catch代码块 那么程序将报错 直接中断执行

//throw方法抛出的错误要被内部捕获 前提是必须至少执行过一次next方法
function* gen() {
    try {
        yield 1;
    } catch (e) {
        console.log('inner catcher');
    }
}
var g = gen();
// g.next();  //'inner catcher' a
g.throw(1);   //Uncaught 1
// g.next();  //uncaught 1

//throw方法被捕获之后 会附带执行下一条yield表达式 也就是说 会附带执行一次next()方法

//全局的throw命令和g.throw方法是无关的 两者互补影响
var gen = function* gen() {
    yield console.log('hello');
    yield console.log('world');
}

var g = gen();
g.next();

try {
    throw new Error();
} catch (e) {
    g.next();
}
// hello
// world

//多个yield表达式 可以只用一个try...catch代码块来捕获错误 只需要在Generator函数内部写一次catch语句就可以了

//一旦Generator执行过程中抛出错误 且没有被内部捕获 就不会再执行下去了 如果以后还调用next方法 将返回一个value属性等于undefined, done属性等于true的对象 即javaScript引擎认为这个Generator已经结束了

//Generator.prototype.return()
//Generator函数返回的遍历器对象 还有一个return方法 可以返回给定的值 并且终结遍历Generator函数
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
var g = gen();
g.next();   // { value: 1, done: false }
g.return('foo');  // { value: 'foo', done: true }
g.next();   // { value: undefined, done: true }
//g用了return方法后 Generator函数的遍历就中止了 done=true了已经 再 next() 也 next()不出什么东西来了

//如果return 方法调用时 不提供参数 则返回值的value属性为undefined
//如果Generator函数内部有try...finally代码块 那么return方法会推迟finally代码块执行完再执行
function* numbers() {
    yield 1;
    try {
        yield 2;
        yield 3;
    } finally {
        yield 4;
        yield 5;
    }
    yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }    //那么return方法会推迟finally代码块执行完再执行 实际在这个位置执行了

//next() throw() return()的共同点
//这三个方法基本上是同一件事 可以放在一起理解 它们的作用都是让Generator函数恢复执行 并且使用不同的语句替换yield表达式

//yield表达式
function* foo() {
    yield 'a';
    yield 'b';
}
function* bar() {
    yield 'x';
    foo();
    yield 'y';
}
for (let v of bar()) {
    console.log(v); //'x' 'y'
}
//foo 和bar 都是Generator函数 在bar里面调用foo 是不会有任何效果的
//这就需要提到yield*表达式 用来在一个Generator函数里面执行另一个Generator函数
function* foo() {
    yield 'a';
    yield 'b';
}
funtion * bar(){
    yield 'x';
    yield * foo();
    yield 'y';
}
//等同于
function* bar() {
    yield 'x';
    yield 'a';
    yield 'b';
    yield 'y';
}
//等同于
function* bar() {
    yield 'x';
    for (let v of foo()) {
        yield v;
    }
    yield 'y';
}
for (let v of bar()) {
    console.log(v); //'x' 'y' 'a' 'b'
}
//这里yield* 成功的在Generator里面执行另一个Generator 有点类似于展开式
function* inner() {
    yield 'hello!';
}

function* outer1() {
    yield 'open';
    yield inner();
    yield 'close';
}

var gen = outer1()
gen.next().value // "open"
gen.next().value // 返回一个遍历器对象  因为没有使用yield*  但还是没有打断遍历的继续执行到下面
gen.next().value // "close"

function* outer2() {
    yield 'open'
    yield* inner()
    yield 'close'
}

var gen = outer2()
gen.next().value // "open"
gen.next().value // "hello!"  //返回了对象的内部值 因为使用了yield*
gen.next().value // "close"

//如果yield* 后面跟了一个数组 由于数组原生支持遍历器 因此就会遍历数组成员
function* gen1() {
    yield* ['a', 'b', 'c'];
}
gen().next()  //{value:'a', done:false}  加了*返回数组的遍历器对象
function* gen2() {
    yield ['a', 'b', 'c'];
}
gen2().next()  //{value: Array(3), done: false}  不加*返回数组 

//实际上 任何数据解构只要有Iterator接口 就可以被yield*遍历

//作为对象的Generator函数
//如果一个对象的属性是Generator函数 就可以简写成下面的形式
let obj = {
    *myGeneratorMethod() {
        //...
    }
}
//上面代码中 myGeneratorMethod前面是有* 表示这个属性是一个Generator函数
//它的完整写法如下
let obj = {
    myGeneratorMethod: function* () {
        //...
    }
}

//Generator函数的this
//Generator函数总是返回一个遍历器 ES6规定这个遍历器是Generator函数的实例 也继承了Generator函数的prototype对象上的方法
function* g() { }

g.prototype.hello = function () {
    return 'hi';
};

let obj = g();  //注意 这里没有使用new 因为g()本身就返回一个遍历器对象

obj.instanceof g //true
obj.hello();   //'hi'
//继承了原型对象上的方法 但是并不会继承构造函数上的方法 如下
function* g() {
    this.a = 11;
}

let obj = g();
obj.next();
obj.a // undefined

//Generator函数也不能跟new命令一起使用 会报错
function* F() {
    yield this.x = 2;
    yield this.y = 3;
}
new F()   //TypeError: F is not a constructor
//不能和new一起用 因为F()不是构造函数

//Generator与状态机
//Generator是实现状态机的最佳结构 比如下面的clock函数就是一个状态机
var ticking = true;
var clock = function () {
    if (ticking)
        console.log('Ticking!');
    else
        console.log('Tock!');
    ticking = !ticking;
}
//这里代码clock函数一共有两种状态Tick和Tock 每运行一次就改变一次状态 这个函数如果用Generator实现 就是下面这样
var clock = function* () {
    while (ture) {
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;
    }
}

//Generator与上下文
// JavaScript 代码运行时，会产生一个全局的上下文环境（context，又称运行环境），包含了当前所有的变量和对象。然后，执行函数（或块级代码）的时候，又会在当前上下文环境的上层，产生一个函数运行的上下文，变成当前（active）的上下文，由此形成一个上下文环境的堆栈（context stack）。

// 这个堆栈是“后进先出”的数据结构，最后产生的上下文环境首先执行完成，退出堆栈，然后再执行完成它下层的上下文，直至所有代码执行完成，堆栈清空。

// Generator 函数不是这样，它执行产生的上下文环境，一旦遇到yield命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。等到对它执行next命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。
function* gen() {
    yield 1;
    return 2;
}

let g = gen();

console.log(
    g.next().value,
    g.next().value,
)
//上面代码中，第一次执行g.next()时，Generator 函数gen的上下文会加入堆栈，即开始运行gen内部的代码。等遇到yield 1时，gen上下文退出堆栈，内部状态冻结。第二次执行g.next()时，gen上下文重新加入堆栈，变成当前的上下文，重新恢复执行。

//应用 Generator可以暂停函数的执行 返回任意表达式的值 
//主要有四种应用场景
//1.异步操作的同步话表达
//可以把异步操作写在yield里面 等到调用next()时再完后执行 这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield表达式下面，反正要等到调用next方法时再执行。所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数
function* loadUI() {
    showLoadingScreen();
    yield loadUIDataAsynchonousely();
    hideLoadingScreen();
}
var loader = loadUI();
//加载UI
loader.next();
//卸载UI
loader.next()

//2.控制流管理
//如果有一个多步操作非常耗时 采用回调函数 可能会写成下面这样
step1(function (value1) {
    step2(value1, function (value2) {
        step3(value2, function (value3) {
            step4(value3, function (value4) {
                //...
            });
        });
    });
});
//采用Promise改写上面的代码
Promise.resolve(step1).then(step2).then(step3).then(step4).then(function (value4) {
    //...
}, function (error) {
    //Handle any error from step1 through step4
}).done();
// 上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量 Promise 的语法。Generator 函数可以进一步改善代码运行流程。
function* longRunningTask(value1) {
    try {
        var value2 = yield step1(value1);
        var value3 = yield step1(value1);
        var value4 = yield step1(value1);
        var value5 = yield step1(value1);
    } catch (e) {
        //handle any error from step1 through step4
    }
}
//然后 使用一个函数 按次序执行所有步骤
scheduler(longRunningTask(initialValue));

function scheduler(task) {
    var taskObj = task.next(task.value);
    // 如果Generator函数未结束，就继续调用
    if (!taskObj.done) {
        task.value = taskObj.value
        scheduler(task);
    }
}

//3.部署Iterator接口
//利用Generator函数 可以在任意位置上部署Iterator接口
function* iterEntries(obj) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        yield [key, obj[key]];
    }
}
let myObj = { foo: 3, bar: 7 };

fopr(let[key, value] of iterEntries(myObj)){
    console.log(key, value);   //foo 3 bar 7
}
// 上述代码中，myObj是一个普通对象，通过iterEntries函数，就有了 Iterator 接口。也就是说，可以在任意对象上部署next方法。

//Generator作为数据结构
//Generator可以看作是数据结构 更确切的说 可以看作是一个数组结构 因为Generator函数可以返回一系列的值 这意味着它可以对任意表达式 提供类似数组的接口
function* doStuff() {
    yield fs.readFile.bind(null, 'hello.txt');
    yield fs.readFile.bind(null, 'world.txt');
    yield fs.readFile.bind(null, 'and-such.txt');
}
//上面代码就一次返回了三个函数 但是由于使用了Generator函数 导致可以像是处理数组那样 处理这三个返回的函数
for (task of do Stuff) {
    //task是一个函数 可以像调用函数那样去使用它
}

//bind 创建一个新函数去bind一个对象 
var module = {
    x: 42,
    getX: function () {
        console.log(this)  //window
        return this.x;
    }
}

var unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

var boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42

//   在 javascript 中，call 和 apply 都是为了改变某个函数运行时的上下文（context）而存在的，换句话说，就是为了改变函数体内部 this 的指向。

//TEST
//yield表达式如果放在另一个表达式中 必须放在圆括号里
function* demo() {
    console.log('Hello' + yield); // SyntaxError
    console.log('Hello' + yield 123); // SyntaxError

    console.log('Hello' + (yield)); // OK
    console.log('Hello' + (yield 123)); // OK
}
//yield表达式 用作函数参数或放在赋值表达式右边 可以不加括号
function* demo() {
    foo(yield 'a', yield 'b'); // OK
    let input = yield; // OK
}

//Generator函数就是遍历器生成函数 因此可以把Generator赋值给对象的Symbol.iterator属性 从而使属性具有Iterator接口
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

[...myIterable] // [1, 2, 3]
//这就是用Generator给普通对象添加Iterator接口的方法
//Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。
function* gen() {
    // some code
}

var g = gen();

g[Symbol.iterator]() === g  //g[Symbol.iterator]()执行后返回自己
// true

//for...of循环可以自动遍历 Generator 函数时生成的Iterator对象，且此时不再需要调用next方法。
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
    yield 7;
    yield 9;
}
for (let v of foo()) {
    console.log(v);
}

//Generator.prototype.throw() Generator函数返回的遍历器对象 都有一个throw方法 可以在函数体外抛出错误 然后在Generator函数体内捕获

//注意，不要混淆遍历器对象的throw方法和全局的throw命令。
// 上面代码的错误，是用遍历器对象的throw方法抛出的，而不是用throw命令抛出的。后者只能被函数体外的catch语句捕获
var g = function* () {
    while (true) {
        try {
            yield;
        } catch (e) {
            if (e != 'a') throw e;
            console.log('内部捕获', e);
        }
    }
};

var i = g();
i.next();

try {
    throw new Error('a');
    throw new Error('b');
} catch (e) {
    console.log('外部捕获', e);
}
// 外部捕获 [Error: a]
// 上面代码之所以只捕获了a，是因为函数体外的catch语句块，捕获了抛出的a错误以后，就不会再继续try代码块里面剩余的语句了。

//如果Generator函数内部和外部都没有部署try...catch代码块 那么程序将会报错 直接中断执行

//throw方法抛出的错误要被内部捕获 前提是至少执行过一次next方法 
function* gen() {
    try {
        yield 1;
    } catch (e) {
        console.log('内部捕获');
    }
}

var g = gen();
g.throw(1);
// Uncaught 1

//第一次执行next方法 等于启动执行Generator函数的内部代码 

//Generator.throw方法被捕获以后 相当于自动执行了一次next方法 
var gen = function* gen() {
    try {
        yield console.log('a');
    } catch (e) {
        console.log('ignore this');
    }
    yield console.log('b');
    yield console.log('c');
}

var g = gen();
g.next() // a
g.throw() // ignore this; b
g.next() // c

//throw命令与 .throw方法是无关的 两者互不影响
var gen = function* gen() {
    yield console.log('hello');
    yield console.log('world');
}

var g = gen();
g.next();   //hello

try {
    throw new Error();  
} catch (e) {
    g.next();   //world
}
// hello
// world









