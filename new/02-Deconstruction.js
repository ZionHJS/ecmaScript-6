//基本写法
let [a,b,c] = [1,2,3];   //a 1, b 2, c 3

//嵌套数组进行解构赋值
let [foo, [[bar],baz]] = [1,[[2], 3]];   //foo 1, bar 2, baz 3

let [x, y, ...z] = ['a'];   //x 'a', y undefined, z []

//不完全解构
let[a, [b], d] = [1, [2,3], 4];   //a 1, b 2, d 4

//如果等号右边不是数组 则会报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};   

//配合Set进行解构赋值
let[x,y,z] = new Set(['a', 'b', 'c']);   //x 'a', y 'b', z 'c'

//解构赋值允许指定默认值
let [foo = true] = []; //foo true

let [x,y='b'] = ['a']; //x='a', y='b'
let[x,y='b'] = ['a', undefined];  //x='a', y='b'

//undefined 与 null 只有当一个成员的赋值严格等于undefined的时候 默认值才会生效 但null不严格等于undefined
let [x=1] = [undefined];  //x = 1
let [x=1] = [null];  //x = null

//默认值是表达式的情况
function f(){
    console.log('aaa');
}
let [x = f()] = [1];   //x = 1

//默认值可以引用解构的其他变量 但该变量必须已经声明
let [x=1, y=x] = []; //x=1 y=1
let [x=1, y=x] = [2]; //x=2, y=2
let [x=1, y=x] = [1,2] //x=1 y=2
let[x=y, y=1] = []  //ReferenceError: y is not defined

//对象的解构赋值
let{foo, bar} = {foo:'aaa', bar:'bbb'};   //foo 'aaa', bar 'bbb'
//对象的属性没有次序 变量必须与属性同名才能取到值
let{foo, bar, baz, nka} = {bar:'aaa', foo:'bbb'}  //foo "bbb", bar "aaa", baz undefined, nka undefined

//变量名与属性名不一致的情况
let{first:f, last:l} = {first:"hello", last:"world"};   //f "hello", l "world"
//这里f , l 才是变量，真正被赋值的是变量f l 而不是前者

//解构的嵌套结构
let obj = {
    p:[
        'hello',
        {y:'world'}
    ]
};
let{p:[x,{y}], p} = obj;   //x 'Hello' y 'World' p['hello',{y:'world'}]

//对象的解构赋值指定默认值
var {x=3} = {};   //x=3
var {x,y=5} = {x:1};   //x=1 y=5
var {x:y=3} = {x:z=4}; //y=4 

//默认值生效的条件 对象属性值严格等于undefined
var {x=3} = {x:undefined};   //x = 3
  
//对象解构基本格式: 前面 = 是赋值, 后面 : 是属性
let {foo='aaa'} = {bar:'baz'}

//对象解构是嵌套模式时，如果子对象所在的父属性不存在 那么将会报错
let {foo:{bar}} = {bar:'baz'}//这里报错是因为等号左边foo属性，对应一个子对象。该子对象的bar属性，解构时会报错。因为foo这时等于undefined,再取子对象就会报错
let _tmp = {baz:'baz'};
_tmp.foo.bar  //TypeError: Cannot read property 'bar' of undefined

//通过解构对象的赋值 获得 现有对象的方法
let {log, sin, cos} = Math;

//因为数组的本质是特殊的对象 因此可以对数组进行对象属性的解构
let arr = [1,2,3];
let {0: first, [arr.length - 1]:last} = arr;  //first 1, last 3

//字符串的解构赋值
const [a,b,c,d,e] = 'hello'; // a 'h', b 'e', c 'l', d 'l', e 'o'
//类数组对象有一个length属性 因此可以对length属性就行解构赋值
let{length : len} = 'hello';
len //5

//数值和布尔的解构赋值
let {toString:s} = 123;
s === Number.prototype.toString   //true

let {toString:s} = true;
s === Boolean.prototype.toString //true

//解构的规则是  等号右边的值不是对象或者数组的时,就先将其转化为对象 由于undeifned 和 null无法转为对象,所以对它们进行解构赋值 会报错 
let {prop:x} = undeifned; //ReferenceError: undeifned is not defined
let {prop:y} = null;  //TypeError: Cannot destructure property `prop` of 'undefined' or 'null'.

//函数参数的解构赋值
function add([x,y]){
    return x + y;
}
add([1,2]);   //3
//另一个例子
[[1,2],[3,4]].map(([a,b]) => a+b);   //[3,7]

//函数参数的解构使用默认值
function move({x=0, y=0} = {}){
    return [x, y];
}
move({x:3, y:8});   //[3,8]
move({x:3});  //[3,0]
move({}); //[0,0]
move(); //[0,0]

//undefined 会触发函数参数的默认值
[1,undefined,3].map((x='yes') => x);   //[1, 'yes', 3]

//圆括号的问题 不能使用圆括号的情况
//1.变量声明
let[(a)] = [1];   //SyntaxError: Unexpected token
let[x:(c)] = {};  //SyntaxError: Unexpected token
let({x:c}) = {};  //SyntaxError: Unexpected token
let{(x:c)} = {};  //SyntaxError: Unexpected token
let{(x):c} = {};  //SyntaxError: Unexpected token

let{o:({p:p})} = {o:{p:2}};  //SyntaxError: Unexpected token

//test
[(p: a ), { x: c }] = [(), {}];   //Uncaught SyntaxError: Unexpected token :
[(p), { x: c }] = [(), {}];   //Uncaught SyntaxError: Unexpected token )

//2.函数参数
function f([z]){return z;};  //SyntaxError: Unexpected token
function f([z,(x)]){return x;}  //SyntaxError: Unexpected token

//用途 变量的机构赋值用途很多
//1.交换变量的值
let x = 1;
let y = 2;
[x,y] = [y,x];   //x=2, y=1

//2.从函数返回多个值
function example(){
    return [1,2,3];
}
let[a,b,c] = example();   //a=1, b=2, c=3
//返回一个对象
function example(){
    return{
        foo:1, 
        bar:2
    };
}
let {foo,bar} = example();   //foo=1, bar=2

//函数参数的定义
//解构赋值可以很方便的将一组参数与变量名对应起来
//参数是一组有次序的值
function f([x,y,z]){}
f([1,2,3]);
//参数是一组无次序的值
function f({x,y,z}){}
f({z:3,y:2,x:1});

//4.提取JSON数据
let jsonData = {
    id:42,
    status:"OK",
    data:[867,5309]
};
let{id, status, data:number} = jsonData;
console.log(id, status, number);   //42, "OK", [867, 5309]

//5.函数参数的默认值

//6.遍历Map结构 任何部署了iterator接口的对象 都可以用for...of循环遍历 Map结构原生支持iterator结构 配合变量的结构赋值 获取键名和键值就非常方便
const map = new Map();
map.set('first','hello');
map.set('second', 'world');

for(let [key, value] of map){
    console.log(key + 'is' + value);   //first is hello    //second is world
}

//数组 结构赋值 到 对象
let {a:'aaa', b:'bbb', c:'ccc'} = [a:2,b:3,c:4];  //Uncaught SyntaxError: Invalid destructuring assignment target

let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
// 0: 1
// 1: 2
// 2: 3
// length: 3

let str = 'hello';
const [a, b, c, d, e] = 'hello';
// 0: "h"
// 1: "e"
// 2: "l"
// 3: "l"
// 4: "o"
// length: 5




