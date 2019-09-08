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





