//1.属性的简介语法
let name = 'google.com';
let phone = '1992381231';

let person = {
    age:19,
    name,
    phone
}
console.log('person:',person);

//2.方法的简写
let person = {
    age:19,
    show:function(){
        console.log(this.age);
    }
}
person.show();
//简写
let person = {
    age:19,
    show(a,b) {
        console.log(this.age);
    }
}
person.show(3,5);

//3.属性名表达式
let a = 'google.com';
let b = 'google';
let person = {
    [a+1]:'123',
    [b]:'bbb',
    show(){
        console.log(this[a+1]);
        console.log('this[b]:', this[b]);
        console.log('this.google:', this.google);
    }
}
person.show();
console.log('person:', person);

//4.表达式还可以用于定义方法名
let a  = 'add';
let person = {
    [a+1]:function(){
        console.log('2222')
    }
}
person[a+1]();

//5.对象方法的name属性, 返回函数名
console.log(person[a+1].name);

//6.两种特殊情况:bind方法创造的函数，name属性返回bound加上原函数的名字;Function构造函数创造的函数，name属性返回anonymous
let f = function(){};
let k = f.bind({});

console.log('k.name:', k.name);
let f = new Function('console.log("hello")');
f();

//7.Object.is() 它用来比较两个值是否严格相等，与严格比较运算符(===)的行为基本一直
// === 严格运算符:不能处理 NaN不等于自生 以及+0 等于 -0
console.log(0 === (-0));
console.log(NaN === NaN);

Object.is(NaN,NaN); //比较两个参数

//8. Object.assign方法用于对象的合并，将源对象(source)的所有可枚举属性 复制到目标对象(target) 这个是浅拷贝
let m = {ai: 'aicoder'};
let k = Object.assign(m, {a:1},{b:2},{c:3});
console.log('k:',k);
console.log('m:',m);

//Object.assign 浅拷贝数字和布尔类型没有效果，字符串会转成字符数组
let n = Object.assign({}, 33, true, {a:2});
console.log('n:', n);

let n = Object.assign({}, 'google.com');
console.log('n:', n);

//数组的assign
let n = Object.assign({},['a', 2, 3, 'aaa']);
console.log('n:', n);

//同名属性的替换
let m = {};
let k = Object.assign(m, {age:18, name:''}, {age:20});
console.log('k:', k);

//给对象赋默认值
//浅拷贝对象

//9.属性的定义与描述 Object.defineProperties()
let person = {};
person.age = 10;

console.log('person:', person);

Object.defineProperties(person, {
    name:{
        configurable: true,
        enumerable:true,
        value:'google.com',
        writable:true
    },
    phone:{
        configurable:false,
        enumerable:false,
        writable:false,
        value:'123123123'
    },
    address:{
        get:function(){
            return 'Beijing Newyork Shanghai'
        },
        set:function(){
            return ''
        }
    }
});
console.log(person.phone);
console.log('person:', person);
console.log(person.address);

for(let k in person){
    console.log(k);
}







