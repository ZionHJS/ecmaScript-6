//数值的扩展
//ES6提供了二进制和八进制的新的写法 分别用前缀0b(或0B) 0o(或0O)表示
0b111110111 === 503 // true
0o767 === 503  //true

//从ES5开始 在严格模式之中 八进制就不再允许使用前缀0表示 ES6进一步明确 要使用前缀0o表示
// 非严格模式
(function(){
    console.log(0o11 === 011);
  })() // true
  
// use district
(function(){
   'use strict';
   console.log(0o11 === 011);
})() //SyntaxError: Octal literals are not allowed in strict mode.

//Number方法可以将0b 和 0o前缀的字符串数值转为十进制
Number(`0b111`)  //7
Number(`0o10`)   //8

//Number.isFinite(), Number.isNaN()
//ES6在Number对象上，新提供了Number.isFinite() 和 Number.isNaN()两个方法

//Number.isFinite()是否有限 和 Number.isNaN() 
Number.isFinite(15);  //true
Number.isFinite(0.999);  //true
Number.isFinite(NaN);  //flase
Number.isFinite(Infinity);  //false
Number.isFinite('foo')  //false
Number.isFinite(true)  //false
//如果参数不是数值 一律返回false
Number.isNaN(NaN);   //true
Number.isNaN('NaN');  //true
Number.isNaN('15');  //false
Number.isNaN(15);  //false
Number.isNaN('true');  //false

//Number.parseInt(), Number.parseFloat()
Number.parseInt('12.34') //12
Number.parseFloat('123.45#')  //123.45

Number.parseInt === parseInt   //true
Number.parseFloat === parseFloat   //true

//Number.isInteger() 判断一个数值是否为整数
Number.isInteger(25)   //true
Number.isInteger(25.1)   //false

//JavaSript内部 整数和浮点数采用的是同样的储方法 所以25和25.0被视为同一个值
Number.isInteger(25) === Number.isInteger(25.0)  //true

//Number.EPSILON
//ES6 在 Number对象上面 新增一个极小常量Number.EPSILON 根据规格 它表示1与大于1的最小浮点数之间的差
Number.EPSILON === Math.pow(2, -52);
Number.EPSILON  //2.2204232324242323e-16
//Number.EPSILON 实际上就是JavaScript的最小精度

//安全整数 和 Number.isSafeInteger()
//JavaScript能够准确表示整数范围在-2^53到2^53之间(不含两个端点),超过这个范围 无法精确表示这个值
Math.pow(2, 53)  //9007199254740992

9007199254740992  // 9007199254740992
9007199254740993  // 9007199254740992

Math.pow(2, 53) === Math.pow(2, 53) + 1  //true

//Number.Max_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER 是JavaScript中的范围上下限
//Number.isSafeInteger() 就是用来判断一个整数是否在这个安全范围之内

//指数运算符 (**)
2**2 //4  
2**3 //8
//指数运算符可以与等号结合 形成一个新的赋值运算符(**=) 
let a = 1.5;
a **= 2; //a=a*a

let b = 4;  
b **= 3;  //b=b*b*b

//注意 在V8引擎中 指数运算符与Math.pow的实现不相同 对于特别大的运算结果 两者会有细微的差别
Math.pow(99, 99)
// 3.697296376497263e+197

99 ** 99
// 3.697296376497268e+197

