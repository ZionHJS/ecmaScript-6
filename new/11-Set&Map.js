//Set
//Set是新的数据解构 它类似于数组 但是成员都是唯一的没有重复的值
//Set本身也是一个构造函数 用来生成Set数据解构
const s = new Set();
[1,2,3,4,5,2,3,5,6,7].forEach(x => s.add(x));
for(let i of s){
    console.log(i);  //1,2,3,4,5,6,7
}

//Set函数可以接收一个数组 或具有iterator接口的其他数据解构作为参数 用来初始化
const set = new Set([1,2,3,4,5,2,3,4]);
[...set]   //[1,2,3,4,5]

const set = new Set(document.querySelectorsAll('div'));
set.size //56
//类似于
const set = new Set();
document.querySelectorsAll('div').forEach(div => set.add(div));
set.size //56
//数组去重的方法
[...new Set(array)]

//向Set加入值的时候 不会进行类型转换 所以5和'5'是两个不同的值 Set判断两个值是否相等的机制类似于 === 但是这里NaN等于自身
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set //Set{NaN}  //Set认为NaN等与NaN所以这里就只有一个NaN了 
 
//另外 两个对象总是不相等的
let set = new Set();
set.add({});
set.size    //1
set.add({});
set.size    //2 //两个对象总是不相等的

//Set实例的属性和方法
//Set结构有如下属性
//Set.prototype.constructor 构造函数 默认就是Set 函数
//Set.prototype.size 返回Set实例的成员总数
//Set实例的方法 分为两大类 操作方法 和 遍历方法 
//操作方法
//add(value):添加某个值 返回Set结构本身 delete(value):删除某个值 返回一个布尔值 表示删除是否成功
//has(value):返回一个布尔值 表示该值是否为Set成员  clear():清除所有成员 没有返回值
s.add(1).add(2).add(2); //2被添加了两次
s.size //2
s.has(1)  //true
s.has(2)  //true
s.has(3)  //false

s.delete(2)
s.has(2)  //false

//下面是一个对比 看看在判断是否包括一个键上面Object结构和Set结构的写法不同
//对象的写法
const properties = {
    'width': 1,
    'height': 1
};
if(properties[someName]){
    //doSomething
}

//Set的写法
const properties = new Set();
properties.add('width');
properties.add('height');

if(properties.has(someName)){
    //doSomething
}

//Array.from方法可以将Set结构转为数组
const items = new Set([1,2,3,4,5]);
const array = Array.form(items); //Array.from()将Set结构转为数组
//这样我门就可以对数组进行去重了
function dedupe(array){
    return Array.from(new Set(array));
}
dedupe([1,1,2,3])  //[1,2,3]

//遍历操作
//Set结构有四个遍历方法用于遍历成员
//keys():返回键名的遍历器; values():返回键值的遍历器; entries(); 返回键值对的遍历器; forEach():使用回调函数遍历每个成员

//由于Set()结构只有键值没有键名 所以keys方法和values方法的行为完全一致
let set = new Set(['red', 'green', 'blue']);

for(let item of set.keys()){
    console.log(item);  //red green blue
}
for(let item of set.values()){
    console.log(item);  //red green blue
}

for(let item of set.entries()){
    console.log(item);  //['red':'red'] ['green':'green']  ['blue':'blue']  //注意 这里keys和values相等了 因为Set里面只有键值没有键名
}

//Set结构的实例默认可遍历 它的默认遍历器 生成函数就是它的values方法
Set.prototype[Symbol.iterator] === Set.prototype.values   //true

//这意味着 可以省略values方法 直接用for...of循环遍历Set
let set = new Set(['red', 'green', 'blue']);
for(let x of set){
    console.log(x);  //red green blue
}

//forEach()

//遍历的应用
//扩展运算符(...)内部使用for...of循环 所以也可以用于Set结构
let set = new Set(['red','green','blue']);
let arr = [...set];   //['red', 'green', 'blue']

//扩展运算符和Set结构相结合 就可以去除数组的重复成员
let arr = [3,5,2,2,5,5];
let unique = [...new Set(arr)];   //[3,5,2]

//WeakSet  略过现在

//Map
//JavaScript的对象 本质上是键值对的集合 但是传统上只能用字符串当作键 这边给它带来很大的限制
const data = {};
const element = document.getElementById('myDiv');

data[element] = 'metadata';
data['[object HTMLDivElement']   //'metadata'
//上面的代码是将一个DOM节点作为对象data的键 但是由于对象只接收字符串作为键名 所以element被自动转为字符串[object HTMLDivElement]

//为了解决这个问题 Map数据结构出现额 它类似于对象 也是键值对的集合 但是键的范围不限于字符串 各种类型的值 包括对象 都可以当作键 也就是说Object结构提供了 字符串-值的对应
//Map结构提供了 值-值的对应 是一种更完善的结构
const m = new Map();
const o = {p:'Hello World'};

m.set(o, 'content');  //把o,'content' 设置为一个键值对
m.get(o)   //'content'
m.has(o)   //true
m.delete(o)   //true
m.has(o)   //false
//这里使用了Map结构的set方法 将对象o当作m的一个键 然后又使用get方法读取这个键 接着使用delete方法删除这个键

//作为构造函数 Map也可以接收一个数组作为参数 该数组的成员是一个个表示键值对的数组
const map = new Map([
    ['name','david'],
    ['title','Author']
]);
map.size   //2
map.has('name')   //true
map.get('name')   //'david

//上面代码在新建Map实例时 指定了两个键name和title
//Map构造函数接收数组作为参数 实际上执行的是下面的算法
const item = [
    ['name','david'],
    ['title','Author']
];
const map = new Map();

items.forEach(
    ([key,value]) => map.set(key, value)
);

//事实上 不仅仅是数组 任何具有iterator接口 且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数 也就是说Set和Map都可以用来生成新的Map
const set = new Set([
    ['foo',1],
    ['bar',2]
]);
const m1 = new Map(set);
m1.get('foo')   //1

const m2 = new Map([['baz',3]]);
const m3 = new Map(m2);
m3.get('baz')   //3
//上面代码中 我门分别使用Set对象和Map对象 当作Map构造函数的参数 结果都生成了新的Map对此昂
//如果对同一个键多次复制 后面的值键覆盖前面的值
const map = new Map();

map.set(1,'aaa').set(1,'bbb');
map.get(1);   //bbb
//上面代码对键1连续赋值两次后 后一次的值覆盖了前一次的值

//只有对同一个对象引用 Map结构才将其视为同一个键 
const map = new Map();
map.set(['a'], 555);
map.get(['a'])   //undefined

//上面代码的set和get方法 表面是针对同一个键 实际上是这两个值 内存地址不一样 因此get方法无法读取该键 返回undefined
//同样值的两个实例 在Map结构中被视为两个键
const Map = new Map();
const k1 = ['a'];
const k2 = ['a'];
map.set(k1,111).set(k2,222);

map.get(k1);  //111
map.get(k2);  //222
//这里虽然k1和k2的值相同 但是在Map中被视为两个键 

//如果键是一个简单类型 则不同值是同一个键 
//如果键是NaN 则两个NaN是同一个键

//实例的树丛和操作方法
//Map结构的实例有一下属性和操作方法
//1.size属性
const map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size   //2

//2.set(key, value)
//set方法返回的是当前的Map对象 因此可以采用链式编程的写法
let map = new Map().set(1,'a').set(2,'b').set(3,'c');

//3.get(key)

//4.has(key)

//5.delete(key)

//6.clear()

//遍历方法
//Map结构原生提供三个遍历器生成函数和一个遍历方法
//keys()返回键名; values()返回键值; entries()返回所有成员的遍历器; forEach()遍历Map()所有成员
for(let[key, value] of map.entries()){
    console.log(key ,value);   //'F' 'no' /  'T' 'yes'
}
//上面代码等同于map.entries()

//Map结构转为数组结构 比较快速的方法是使用扩展运算符(...)
const map = new Map([
    [1,'one'],
    [2,'two'],
    [3,'three'],
]);
[...map.keys()]   //[1,2,3]
[...map.values()]   //['one', 'two', 'three']
[...map.entries()]   //[1,'one], [2, 'two'] [3, 'three']
[...map]  //[1,'one], [2, 'two'] [3, 'three']

//与其他数据结构的互相转换
//1.Map转为数组  直接用扩展运算符
//2.数组转为Map
new Map([
    [true, 7],
    [{foo:3},['abc']]
])
//3.Map转为对象
function strMapToObj(strMap){
    let obj = Object.create(null);
    for(let[k,v] of strMap){
        obj[k] = v; 
    }
    return obj;
}
const myMap = new Map().set('yes',true).set('no', false);
strMapToObj(myMap)   //{yes:true, no:false}
//4.对象转为Map
function objToStrMap(obj){
    let strMap = new Map();
    for(let k of Object.keys(obj)){
        strMap.set(k, obj[k]);
    }
    return strMap;
}
objToStrMap({yes:true, no:false})   //Map{'yes' => true, 'no' => false}

//Map转为JSON
//情况一 Map的键名都是字符串 这时可以选择转为对象JSON
function strMapToJson(strMap){
    return JSON.stringify(strMapToObj(strMap));  //先转为对象 再调用JSON.stringify变为字符串
}
let myMap = new Map().set('yes',true).set('no',false);   
strMapToJson(myMap)   //'{"yes":true, "no":false}'

//情况二 Map键名有非字符串 这时可以选择转为数组JSON
function mapToArrayJason(map){
    return JSON.stringify([...map]);
}
let myMap = new Map().set(true, 7).set({foo:3},['abc']);
mapToArrayJason(myMap)   //'[[true,7],[{"foo":3},["abc"]]]'

//JSON转为Map 正常情况下 所有键名都是字符串
function jsonToStrMap(jsonStr){
    return objToStrMap(JSON.parse(jsonStr));   //parse 以后就变成了object了
}
jsonToStrMap('{"yes":true, "no":false}')   //Map{'yes' => true, 'no' => false}

//还有一种情况 整个 JSON就是一个数组 且每个数组成员本身 又是一个有两个成员的数组 这是 它可以一一对应的转为Map 这往往是Map转为数组JSON的逆操作
function jsonToMap(jsonStr){
    return new Map(JSON.parse(jsonStr));
}
jsonToMap('[[true,7],[{"foo":3},["abc"]]]')   // Map {true => 7, Object {foo: 3} => ['abc']}





