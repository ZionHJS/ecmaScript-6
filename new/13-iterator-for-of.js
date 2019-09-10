//遍历器 iterator 是一种接口 为各种不同的数据提供一个简单的访问接口 而且使得数据结构的成员能够按某种次序排列 iterator接口主要提供给for...of循环使用

//iterator的遍历过程如下
//1.创建一个指针对象 指向当前数据结构的起始位置 也就是说iterator本质上是一个指针对象
//2.第一次调用指针对象的next方法 会将指针指向数据结构的第一个成员
//3.第二次调用指针对象的next方法 指针就指向数据结构的第二个成员
//4.不断调用指针对象的next方法 直到它指向数据结构的结束位置

//总之 调用对象的next方法 就可以遍历事先给定的数据结构
//下面是一个无限遍历器对象的列子
var it = idMaker();
it.next().value  //0
it.next().value  //1
it.next().value  //2

function idMaker() {
    var index = 0;
    return {
        next: function () {
            return { value: index++, done: false };
        }
    };
}
//上面例子中 遍历器生成函数idMaker 返回一个遍历器对象 但是没有对应的数据结构 或者说遍历器对象自己描述了一个数据结构出来

//如果使用TypeScript写法 遍历器接口Iterable 指针对象Iterator 和next方法返回值的规格可以描述入下
interface Iterable {
    [Symbol.iterator](): Iterator;
}
interface Iterator {
    next(value?: any): IterationResult,
}
interface IterarionResult {
    value: AnalyserNode,
    done: Boolean,
}

//默认Iterator接口
//Iterator接口的目的 就是为所有数据结构 提供了一种统一访问的机制 即for...of循环 当使用for...of循环遍历某种数据结构时 该循环会自动去寻找Iterator接口

//默认的Iterator接口布置在数据结构的Symbol.iterator属性下 Symbol.iterator属性本身是一个函数 就是当前数据结构默认的遍历器生成函数 执行这个函数 就会返回一个遍历器 
const obj = {
    [Symbol.iterator]: function () {
        return {
            next: function () {
                return {
                    value: 1,
                    done: true
                };
            }
        };
    }
};
//上面代码中 obj对象是可遍历的 每次调用next方法都会返回一个代表当前成员的信息对象 具有value和done两个属性

//原生Iterator接口的数据结构如下
//Array Map Set String TypeArray 函数的arguments对象 NodeList对象
//例子 Array的Symbol.iterator属性
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next()  //{value:'a', done:false}
iter.next()  //{value:'b', done:false}
iter.next()  //{value:'c', done:false}
iter.next()  //{value:'undefined', done:true}

//对象object没有部署Iterator接口 是因为对象的哪个属性都是先遍历 哪个属性后遍历是不确定的 需要开发者手动指定 
//本质上 遍历是一种线性处理 对于任何非线性的数据结构 部署遍历接口 都等于部署一种线性转化 

//所以 一个对象如果要被for...of循环调用Iterator接口的话 就必须在Symbol.iterator 属性上部署遍历器生成方法(原型链上的对象具有该方法也可)
class RangeIterator {
    constructor(start, stop) {
        this.value = start;
        this.stop = stop;
    }
    [Symbol.iterator]() { return this; }
    next() {
        var value = this.value;
        if (value < this.value) {
            this.value++;
            return { done: false, value: value }
        }
        return { done: true, value: undefined }
    }
}
function range(start, stop) {
    return new RangeIterator(start, stop);
}
for (var value of range(0, 3)) {
    console.log(value); //0, 1, 2
}
//上面就是一个类部署Iterator接口的写法 Symbol.iterator属性对应一个函数 执行后返回当前对象的遍历器对象

//下面通过遍历器实现指针结构的例子
function Obj(value) {
    this.value = value;
    this.next = null;
}
Obj.prototype[Symbol.iterator] = function () {
    var iterator = { next: next };
    var current = this;
    function next() {
        if (current) {
            var value = current.value;
            current = current.next;
            return { done: false, value: value };
        } else {
            return { done: true };
        }
    }
    return iterator;
}

var one = new Obj(1);
var two = new obj(2);
var three = new Obj(3);

one.next = two;
two.next = three;

for (var i of one) {
    console.log(i);   //1, 2, 3
}
//上面代码首先在构造函数的原型链上部署Symbol.iterator方法 调用该方法会返回遍历器对象的iterator 调用对象next方法 在返回一个值的同时 自动将内部指针移动到下一个实例

//类数组对象调用数组Symbol.iterator方法的例子
let iterator = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
    console.log(item)   //'a' 'b' 'c'
}
//普通对象部署数组的Symbol.iterator 无效果
let iterable = {
    a: 'a',
    b: 'b',
    c: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
    console.log(item); // undefined, undefined, undefined
}


//调用Iterator接口的场景
//1.解构赋值 对数组和Set结构进行解构赋值时 会默认调用Symbol.iterator方法
let set = new Set().add('a').add('b').add('c');
let [x, y] = set;  //x='a'; y='b'

let [first, ...rest] = set;   //first='a'; rest=['b','c'];

//2.扩展运算符 也会默认调用Symbol.iterator方法
var str = 'hello';
[...str]   //['h','e','l','l','o']

//3.yield yield*后面跟的也是一个可遍历结构 它会调用该解构的遍历器接口
let generator = function* () {
    yield 1;
    yield* [2, 3, 4];
    yield 5;
};
var iterator = generator();
iterator.next() //{value:1, done:false}
iterator.next() //{value:2, done:false}
iterator.next() //{value:3, done:false}
iterator.next() //{value:4, done:false}
iterator.next() //{value:5, done:false}
iterator.next() //{value:undefined, done:true}

//4.其他场合
//for...of Array.from() Map() Set() WeakMap() WeakSet() Promise.all() Promise.race()

//字符串Iterator接口
//字符串是一个类似数组的对象 也原生具有iterator接口
var someString = 'hi';
typeof someString[Symbol.iterator]   //function

var iterator = someString[Symbol.iterator]();
iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }
//字符串也可以调用next()来实现遍历

//iterator接口与Generator函数
//Symbol.iterator方法的最简单实现 还是使用Generator函数
let myIterable = {
    [Symble.iterator]: function* () {
        yield: 1;
        yield: 2;
        yield: 3
    }
}
[...myIterable]   //[1,2,3]

//遍历器对象的return(), throw()
//遍历器对象除了具有next()方法 还具有return()和throw()方法 
//return()的使用场景 for...of循环提前退出
function readLinesSync(file) {
    return {
        [Symbol.iterator]() {
            return {
                next() {
                    return { done: false };
                },
                return() {
                    file.close();
                    return { done: false };
                }
            };
        },
    };
}
//上面代码中 函数readLinesSync接收一个文件对象作为函数 返回一个遍历器对象 其中除了next方法 还部署了return方法 下面三种情况 都触发执行return方法
//break continue  throw new Error()

//for...of循环

//数组 原生具备iterator接口 for...of循环本质上就是调用这个接口产生的遍历器 可以用下面的代码证明
const arr = ['red', 'green', 'blue'];

for (let v of arr) {
    console.log(v);  //red green blue
}
const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

for (let v of obj) {
    console.log(v)   //red green blue
}
//上面代码中 空对象obj部署了数组arr和Symbol.iterator属性 结果obj的for...of循环 产生了与arr完全一样的结果

//JavaScript原来有的for...in循环 只能获得对象的键名 不能直接获取键值 for...of循环允许获得键值
var arr = ['a', 'b', 'c', 'd'];
for (let a in arr) {
    console.log(a);   //0 1 2 3
}
for (let a of arr) {
    console.log(a);   //a b c d
}

//Set和Map 结构也具有Iterator接口 可以直接使用for...of循环
var engines = new Set(['Gecko', 'Trident', 'Webkit', 'Webkit']);
for (var e of engines) {
    console.log(e);   //Gecko Trident Webkit
}

var es6 = new Map();
es6.set('edition', 6);
es6.set('committee', 'TC39');
es6.set('standard', 'ECMA-262');
for (var [name, value] of es6) {
    console.log(name + ':' + value);   //edition:6   committee:TC39  standard:ECMA-262
}

//计算生成的数据结构
//entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。对于数组，键名就是索引值；对于 Set，键名与键值相同。Map 结构的 Iterator 接口，默认就是调用entries方法。
// keys() 返回一个遍历器对象，用来遍历所有的键名。
// values() 返回一个遍历器对象，用来遍历所有的键值。

//类似数组对象 包括好几个类别 for...of循环 DOM对象 NodeList对象 arguments对象 字符串

//并不是所有类似数组的对象都具有Iterator接口 一个渐变的解决方法 就是使用Array.from方法将其转为数组 
let arrayLike = {
    length: 2, 0: 'a', 1: 'b'
}
for (let x of arrayLike) {
    console.log(x);  //报错
}
for (let x of Array.from(arrayLike)) {
    console.log(x);  //正确
}

//对象 对于普通对象 for...of结构不能直接使用 会报错 必须部署了iterator接口后才能使用 但是这种情况下for...in循环依然可以用来遍历键名
let es6 = {
    edition: 6,
    committee: 'TC39',
    standard: 'ECMA-262'
};
for (let e in es6) {
    console.log(e);  //无错
}
for (let e of es6) {
    console.log(e)  //报错 因为没有部署[Symbol.iterator] 接口
}
//解决方法一 使用Object.keys方法将对象的键名生成一个数组 然后遍历这个数组
for (var key of Object.keys(someObject)) {
    console.log(key + ':' + someObject[key]);
}
//解决方法二 使用Generator函数将对象重新包装一下
function* entries(obj) {
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}
for (let [key, value] of entries(obj)) {
    console.log(key, '=>' value);
}

//与其他遍历语法的比较
//for循环 写法比较麻烦 

//forEach 无法使用 return break中途跳出循环

//for...in 是以字符串来作为键名  会主动遍历原型上的键   有些情况下 还会以任意顺序遍历键名

//TEST
//四种数据集合 Array  Object  Map Set
//遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。
//任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员。

//每一次调用next方法 就会返回数据结构的当前成员信息 就是返回一个包含value和done两个属性的对象 value属性是当前成员的值 done属性是一个布尔值 表示遍历是否结束

//ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性
const obj = {
    [Symbol.iterator]: function () {
        return {
            next: function () {
                return {
                    value: 1,
                    done: true
                };
            }
        };
    }
};


// 原生具备 Iterator 接口的数据结构如下。

// Array
// Map
// Set
// String
// TypedArray
// 函数的 arguments 对象
// NodeList 对象

//数组的Symbol.iterator属性
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }

//字符串的Iterator接口
var someString = "hi";
typeof someString[Symbol.iterator]
// "function"

var iterator = someString[Symbol.iterator]();

iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }

//调用了[Symbol.iterator]接口才能直接使用.next()方法去遍历
var iterator = someString[Symbol.iterator]();
iterator.next()

//JavaScript for...in循环获得对象键名 for...of循环 获得遍历键值
let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
    console.log(i); // "0", "1", "2", "foo"
}

for (let i of arr) {
    console.log(i); //  "3", "5", "7"
}

//其他的遍历方法
//1.for 循环
//2.forEach方法

