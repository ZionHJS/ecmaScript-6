//1. Set类型 它类似于数组 但是成员的值都是唯一的，没有重复的值
let s = new Set();
s.add(1);
s.add('1');
s.add(1);  //set集合中的值都是唯一的
console.log('s.size', s.size);
console.log('s:',s);

//接收一个可遍历的对象，比如:字符串 NodeList接口
let s = new Set([1,2,9,1,0]);
console.log('s:', s);  //{1,2,9,0} 已经被去重了

//Set内部判断两个值是否不同
s.add(NaN);s.add(NaN);s.add(NaN);s.add(NaN);
console.log('s:', s);

//3. Set.prototype.size 返回Set实例的成员总数

//4. Set 实例的四个操作方法
let s = new Set([1,9,0]);
s.delete(0);
console.log('s:',s); //{9,0}

//has(value):返回一个布尔值，表示该值是否为Set的成员
console.log('s.has(1):', s.has(1));
console.log('s.has(9):', s.has(9));
console.log('s.has(0):', s.has(0));

//clear(): 清楚所有成员 没有返回值
s.clear();
console.log('s:', s);

//数组去重 展开运算符
let s = new Set();
s.add(1);
s.add(2);
s.add(3);

let arr = [...s];
console.log('arr:', arr);  //[1,2,3]

//Array.from
let arr2 = Array.from(s);
console.log('arr2:', arr2);  //arr2: [1,2,3]

//6. Set 结构的实例有四个遍历方法
let S = new Set([1,2,3,4,5]);
console.log('S.keys():', S.keys());
console.log('S.values():', S.values());
console.log('s.entries():', S.entries());

//forEach(): 使用回调函数遍历每个成员
s.forEach((item, index, map) => {
    console.log('item:', item);
    console.log('index:', index);
});

//7. WeakSet, WeakSet 对象允许你将弱保持对象存储在一个集合中

//WeakSet 对象中存储的对象值都是被弱引用的，如果没有其他的变量或属性引用这个对象值，则这个对象值会被当作垃圾回收掉
let ws = new WeakSet();
let a = {a:'2222'};
let b = {b:'3333'};
ws.add(a); ws.add(b);
console.log('ws:',ws);
ws.delete(a);
console.log(ws.has(b));
console.log('ws:',ws);