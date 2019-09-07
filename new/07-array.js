//扩展运算符 ...三个点 
console.log(...[1,2,3]); // 1 2 3
//该运算符主要用于函数调用
function push(array, ...items){
    array.push(...items);
}
//扩展运算符与正常的函数参数可以结合使用 非常灵活
function f(v, w, x, y, z){
    const args = [0, 1];
}
f(-1, ...args, 2, ...[3]);
//扩展运算符后面还可以放置表达式
const arr = [
    ...(x>0 ? ['a'] :[ ]),
    'b',
];

//替代函数apply方法
function f(x, y, z){
    //...
}
let args = [0, 1, 2];
f(...args);
//替代apply
Math.max.apply(null, [14,3,77]);
Math.max(...[14,3,77]);
//push
let arr1 = [0, 1, 2];
let arr2 = [3 ,4 ,5];
arr1.push(...arr2);
//扩展运算符 直接将数组传入push方法
new Date(...[2015, 1, 1]);

//复制数组 
//数组是复合的数据类型 直接复制的话 只是复制了指向底层数据解构的指针 而不是克隆全新数组
const a1 = [1,2];
const a2 = a1;
a2[0] = 2;
a1;  //[2,2]  a1随着a2的改变而改变了
//克隆方法的ES6写法 使用扩展运算符
const a1 = [1,2];
const a2 = [...a1];  //克隆
const [...a2] = a1;  //克隆

//合并数组
const arr1 = ['a','b'];
const arr2 = ['c'];
const arr3 = ['d','e'];
[...arr1, ...arr2, ...arr3]; //扩展运算符直接合并数组 但这是一种浅拷贝

//解构赋值结合扩展运算符
const [first, ...rest] = [1, 2, 3, 4, 5];
first //1 
rest //[2,3,4,5]

//扩展运算符用于数组赋值 只能放在最后一位
const[first ...middle, last] = [1,2,3,4,5,6];  //SyntaxError: Unexpected token ...

//字符串 扩展运算符将字符串转化为数组
[...'hello']  //['h','e','l','l','o']

//实现iterator接口的对象
//任何有iterator接口的对象 都可以用扩展运算符转为真正的数组
let nodeList = document.querySelectorAll('div');  //nodeList是一个类数组对象 类数组对象都有iterator接口
let array = [...nodeList];

//Map和Set解构 Generator函数
let map = new Map([ 
    [1,'one'],
    [2,'two'],
    [3,'three'],
]);
let arr = [...map.keys()];   //[1,2,3]

//Generator函数运行后 返回一个iterator对象 因此也可以使用扩展运算符
const go = function*(){
    yield 1;
    yield 2;
    yield 3;
};
[...go()];   //[1,2,3]

//Array.from方法用于将两类对象转为真正的数组 类数组对象 可遍历对象
let arrayLike = {
    '0':'a',
    '1':'b',
    '2':'c',
    lenth:3,
};
let arr2 = Array.from(arrayLike); //['a','b','c']

//实际应用中 常见的类数组对象是DOM操作返回的nodeList集合 以及函数内部的arguments对象 Array.from都可以将它们转为真正的数组
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p =>{
    return p.textContent.length > 100;
});
//arguments对象
function foo(){
    var args = Array.from(arguments);
}

//只要是部署了iterator接口 Array.fromn都会返回一个一摸一样的新数组
Array.from([1,2,3])

//扩展运算符也可以将某些数据解构转化为数组
[...document.querySelectorAll('div')]  //返回一个对象集合的数组

//扩展运算符背后调用的是遍历器接口(Symbol.iterator) 如果一个对象没有部署这个接口 就无法转换
//Array.from方法还支持类似数组的对象 所谓类似数组的对象 本质特征只有一点 即必须有length属性 因此 任何有length属性的对象 都可以通过Array.from方法转为数组 而此时扩展运算符就无法转换
//任何拥有length属性的对象 都可以通过Array.from转换为数组
Array.from({length:3});  // [undefined, undefined, undefined]

//上面的代码中 Array.from返回了一个具有三个成员的数组 每个位置的值都是undefined 扩展运算符转换不了这个对象

//Array.from还可以接收第二个参数 作用类似于map方法 用来对每个元素进行处理 将处理后的值放入返回的数组
Array.from(arrayLike, x => x*x);
//等同于
Array.from(arrayLike).map(x => x*x);

Array.from([1,2,3], (x) => x*x);   //[1,4,9]

//返回各种数据的类型
function typesOf(){
    return Array.from(arguments, value => typesOf value)
}
typesOf(null, [], NaN)  //['object','object','number']

//Array.of() 方法用于将一组值 转换为数组
Array.of(3, 11, 8)   //[3, 11, 8]
Array.of(3)   //[3]
Array.of(3).length  //1

//Array.of() 函数的方法原理
function ArrayOf(){
    return [].slice.call(arguments);
}

//数组实例 copyWithin()方法 在当前数组内部 将指定位置的成员赋值到其他位置 然后返回当前数组 也就是说是在修改当前数组
Array.prototype.copyWithin(target, start = 0, end = this.length)
//target 该位置开始替换数据; start 从该位置开始读取数据 默认为0 如果为负值 表示倒数; end 到该位置前停止读取数据 默认等于数组长度 如果为负值 表示倒数
[1,2,3,4,5].copyWithin(0, 3);   //[4,5,3,4,5]  //如果没有设定end 则直接取到最后一位

//数组的实例find()和findindex()
//数组实例find方法 用于找出第一个复合条件的数组成员 它的参数是一个回调函数 所有数组成员依次执行该回调函数 直到找出第一个返回值为true的成员 如果没有复合条件的成员 则返回undeifned
[1,4,-5,10].find(n => n < 0);   //-5

[1, 5, 10, 15].find(function(value, index, arr){
    return value > 9;  //找到第一位时停止
});   //10
//find() 接收三个参数 当前的值 当前的位置 和原数组

//数组的findIndex方法的用法与find非常类似 返回第一个符合条件的数组成员的位置 如果都不符合条件 则返回-1
[1, 5, 10, 15].findIndex(function(value, index, arr){
    return value > 9;
});   //2

//find() 和 findIndex()都可以接收第二个参数 用来绑定函数的this对象
function f(v){
    return v > this.age;
}
let person = {name:'John', age:20};
[10, 12, 26, 15].find(f, person);  //26  这里f是查找时调用的函数 person是改变this指向的对象

//两种方法也都可以找出NaN

//数组实例的fill()
['a', 'b', 'c'].fill(7); //[7,7,7]
new Array(3).fill(7);  //[7,7,7]

//上面代码表明 fill方法用于空数组的初始化非常方便 数组中所有的已有对象 会被全部抹去
//fill方法还接收第二个第三个参数 用于指定填充的起始位置和结束位置
['a','b','c'].fill(7, 1, 2);   //['a', 7, 'c']  1 2就是标记的起始位置


//数组实例的includes()
// Array.prototype.includes 方法返回一个布尔值 表示某数组是否包含给定的值 与字符串的includes方法类似
[1,2,3].includes(2)  //true
[1,2,3,NaN].includes(NaN)   //true

//该方法的第二个参数表示搜索的起始位置 默认为0 如果第二个参数为负数 则表示倒数位置 
[1,2,3].includes(3 ,3);   //false
[1,2,3].includes(3,-1);   //true

//数组的空位 
//指某一个位置没有任何值 Array构造函数返回的数组都是空位
Array(3)   //[ , , ]
//空位不是undefined 一个位置的值等于undefined 依然是有值的 in运算符可以说明这一点



