{
    var i = 9;
}
console.log(i); //9
{
    let i = 9; // i变量只在 花括号内有效！！！
}
console.log(i); // Uncaught ReferenceError: i is not defined

//JS 中的 for 循环体比较特殊，每次执行都是一个全新的独立的块作用域，用 let 声明的变量传入到 for 循环体的作用域后，不会发生改变，不受外界的影响。
// i虽然在全局作用域声明，但是在for循环体局部作用域中使用的时候，变量会被固定，不受外界干扰。
for (let i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log(i);    //  i 是循环体内局部作用域，不受外界影响。
    }, 0);   
}
// 输出结果：0  1  2  3  4  5  6  7  8  9
for (let i = 0; i < 10; i++) {   // i虽然在全局作用域声明，但是在for循环体局部作用域中使用的时候，变量会被固定，不受外界干扰。
    console.log(i);   //0  1  2  3  4  5  6  7  8  9
}

//let 没有变量提升
console.log(aicoder); // 错误：ReferenceError: aicoder is not defined ...
let aicoder = 'aicoder.com';

//let 变量不能重复声明
let a = 0;
let a = 'sss';   // Uncaught SyntaxError: Identifier 'a' has already been declared

//let 块作用域嵌套
{
    let k = 9;
    {
        console.log(k);   //=> 9
        let m = 10; 
        console.log(m);   //=> 10
    }
    console.log(m);   //ReferenceError: m is not defined
}
//let 小结 let 让js真正拥有了块级作用域，也是向着更规范的路走 

//const 声明一个常量 一旦声明 不可改变
const SITE_URL = 'google.com';

//修改常量会报错
SITE_URL = 'hamkd.com'; // TypeError: Assignment to constant variable.

const PI; // SyntaxError: Missing initializer in const declaration
PI = 3.1415926; //不允许声明后改动值
//const 块级别 暂时性死区 无变量提升
console.log(M_URL);   //ReferenceError: M_URL is not defined
{
    const M_URL = 'google.com';
}
console.log(M_URL);   //ReferenceError: M_URL is not defined

for(const i=0; i<10; i++){
    console.log(i);   //Assignment to constant variable.
}

//const声明复杂类型
const foo = {};

//为foo添加一个属性
foo.prop = 123;
foo.prop;  //123

//将foo指向另一个对象 会报错
foo = {};   //TypeError: Assignment to constant variable.

//let 和 const声明的变量不属于顶层对象的属性
const a = 9;
window.a;   //undefined
let c = 10;
window.c;   //undefined
var b = 9;
window.b   //=> 9

//test 
let iterable = [10,20,30];
for(const value of iterable){   //每次for循环都会单独生成一个作用域 所以这里看上去const value被反复赋值了
    console.log(value);
}