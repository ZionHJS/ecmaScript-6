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

function idMaker(){
    var index = 0;
    return {
        next:function(){
            return{value:index++, done:false};
        }
    };
}
//上面例子中 遍历器生成函数idMaker 返回一个遍历器对象 但是没有对应的数据结构 或者说遍历器对象自己描述了一个数据结构出来

//如果使用TypeScript写法 遍历器接口Iterable 指针对象Iterator 和next方法返回值的规格可以描述入下
interface Iterable{
    [Symbol.iterator]():Iterator;
}
interface Iterator{
    next(value?:any):IterationResult,
}
interface IterarionResult{
    value:AnalyserNode,
    done:Boolean,
}

//默认Iterator接口
//Iterator接口的目的 就是为所有数据结构 提供了一种统一访问的机制 即for...of循环 当使用for...of循环遍历某种数据结构时 该循环会自动去寻找Iterator接口

//默认的Iterator接口布置在数据结构的Symbol.iterator属性下 Symbol.iterator属性本身是一个函数 就是当前数据结构默认的遍历器生成函数 执行这个函数 就会返回一个遍历器 
const obj = {
    [Symbol.iterator]:function(){
        return {
            next:function(){
                return {
                    value:1,
                    done:true
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
class RangeIterator{
    constructor(start, stop){
        this.value = start;
        this.stop = stop;
    }
    [Symbol.iterator](){return this;}
    next(){
        var value = this.value;
        if(value <this.value){
            this.value++;
            return{done:false, value:value}
        }
        return{done:true, value:undefined}
    }
}
function range(start, stop){
    return new RangeIterator(start, stop);
}
for(var value of range(0,3)){
    console.log(value); //0, 1, 2
}
//上面就是一个类部署Iterator接口的写法 Symbol.iterator属性对应一个函数 执行后返回当前对象的遍历器对象

//下面通过遍历器实现指针结构的例子
function Obj(value){
    this.value = value;
    this.next = null;
}
Obj.prototype[Symbol.iterator] = function(){
    var iterator ={next:next};
    var current = this;
    function next(){
        if(current){
            var value = current.value;
            current= current.next;
            return{done:false, value:value};
        }else{
            return{done:true};
        }
    }
    return iterator;
}

var one = new Obj(1);
var two = new obj(2);
var three = new Obj(3);

one.next = two;
two.next = three;

for(var i of one){
    console.log(i);   //1, 2, 3
}
//上面代码首先在构造函数的原型链上部署Symbol.iterator方法 调用该方法会返回遍历器对象的iterator 调用对象next方法 在返回一个值的同时 自动将内部指针移动到下一个实例

//类数组对象调用数组Symbol.iterator方法的例子
let iterator={
    0:'a',
    1:'b',
    2:'c',
    length:3,
    [Symbol.iterator]:Array.prototype[Symbol.iterator]
};
for(let item of iterable){
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
  //1.解构赋值
  
