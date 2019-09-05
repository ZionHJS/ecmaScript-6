//1. ES6引入了一种新的原始数据类型Symbol, 表示独一无二的值
//String Number Boolean Object Function null undefiend Symbol
let s1= Symbol();   //创建一个Symbol
let s2 = Symbol();
console.log('s1 === s2 :', s1 === s2);
console.log('s1:', s1);
s1.toString();
console.log(String(s1));

//Symbol函数可以接收一个字符串作为参数，表示对Symbol实例的描述
let s3 = Symbol('google.com');
console.log('s3:',s3);

//2. Symbol不能参与运算 但是可以Symbol值转换为字符串
let s4 = Symbol('sss');
console.log('s4.toString + "====" :', s4.toString() + "===");

//3.作为属性名的Symbol
let t = {
    name:'google',
    age:19,
    [Symbol('ttt')]:19,   //private property
    [Symbol('func')]() {
        console.log('ssss');
    }
};

for(let s of Object.getOwnPropertySymbols(t)){
    console.log('t[s]:', t[s]);
}

console.log('Object.getOwnPropertyNames(t):', Object.getOwnPropertyNames(t));

for(let key of Object.keys(t)){
    console.log('key:', key);  //拿不到Symbol的属性
}

//getOwnPropertySymbols() 通过它拿到Symbol属性
console.log('Object.getOwnPropertySymbols(t):', Object.getOwnPropertySymbols(t));  //=>成功拿到Symbol的属性

//5.Symbol.for() Symbol.keyFor()
let s1 = Symbol.for('google.com');
let s2 = Symbol.for('google.com');

console.log(s1 === s2);  //true

Symbol.keyFor(s1);
console.log('Symbol.keyFor(s1):', Symbol.keyFor(s1));


