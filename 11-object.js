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