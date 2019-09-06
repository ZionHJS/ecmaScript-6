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

// Math对象的扩展
//Math.trunc 去除一个数的小数部分 返回整数部分
Math.trunc(4.1)   //4
//对于非数值,Math.trunc内部使用Number方法将其先转为数值
Math.trunc('123.456');   //123
Math.trunc(true);   //1
Math.trunc(null);   //0
//对于空值和无法截取整数的值 返回NaN
Math.trunc(NaN);   //NaN
Math.trunc('foo');   //NaN
Math.trunc();   //NaN
Math.trunc(undefined);   //NaN
//兼容配置
Math.trunc = Math.trunc || function(x){
    return x < 0 ? Math.ceil(x) : Math.floor(x);
};

//Math.sign() 用来判断一个数到底是正数，负数，还是非数值 会将其转换为数值
//正数 返回+1, 负数 返回-1, 0 返回0, -0 返回-0， 其他值 返回NaN
Math.sign(-5)  //-1
Math.sign(5)   //1
Math.sign(0)  //0
Math.sign(-0)  //-0
Math.sign(NaN)  //NaN

//如果是非数值 会自动转化为数值 无法转换的值 会返回NaN
Math.sign('123')  //1
Math.sign('abc')  //NaN
Math.sign(undefined)   //NaN

//兼容配置
Math.sign = Math.sign || function(x){
    x = +x;
    if(x === 0 || isNaN(x)){
        return x;
    }
    return x>0 ? 1 : -1;
}

//Math.cbrt() 用来计算一个数的立方根
Math.cbrt(-1)   //-1
Math.cbrt(0)   //0
Math.cbrt(1)   //1
Math.cbrt(2)   //1.25992321323123
//对于非数值 Math.cbrt方法内部也是最先使用Number方法将其转为数值
Math.cbrt('8')   //2
Math.cbrt('hello')  //NaN

//兼容配置
Math.cbrt = Math.cbrt || function(x){
    var y = Math.pow(Math.abs(x), 1/3);
    return x<0 ? -y : y;
};

//Math.clz32() JavaScript的正数使用32位二进制形式表示 Math.clz32方法返回一个数的32位无符号正数形式 有多少个前导0
Math.clz32(0)   //32
Math.clz32(1)   //31
Math.clz32(1000)   //22
Math.clz32(0b01000000000000000000000000000000)   //1
Math.clz32(0b00100000000000000000000000000000)   //2
// 左移运算符 与 Math.clz32 方法直接相关
Math.clz32(1 << 1) // 30
Math.clz32(1 << 2) // 29
Math.clz32(1 << 29) // 2

//对于小数 Math.clz32方法只考虑整数部分
Math.clz32(3.2)   //30

//对于空值或者其他类型的值 Math.clz32方法会将它们先转为数值 然后再计算 
Math.clz32() //32
Math.clz32(NaN)  //32
Math.clz32('foo')   //32
Math.clz32([]) //32

//Math.imul() 方法返回两个数以上以32位带符号整数形式相乘的结果 返回的也是一个32位带符号的整数
Math.imul(2, 4)  //8
Math.imul(-1, 8)   //-8

//Math.fround() 返回一个数的32位单精度浮点数形式  
Math.fround(0);  //0
Math.fround(1);  //1
Math.fround(2 ** 24 -1);  //16777215

//如果参数精度大于2的24次方 返回结果便开始丢失精度 
Math.fround(2 ** 24);  //16777216
Math.fround(2 ** 24 +1);   //16777216

//对于NaN和Infinity 此方法返回原值 对于其他类型的非数值 Math.fround方法会将其转化为数值 再返回单精度浮点数
Math.fround(NaN);   //NaN
Math.fround('5');  //5
Math.fround(true);   //1
Math.fround({});  //NaN

//Math.hypot()   方法返回所有参数的平方和的平方根
Math.hypot(3 , 4);  //5
Math.hypot(3,4,'5');  //7.078123123
Math.hypot(-3);   //3
Math.hypot(NaN);  //NaN


//对数方法
//Math.expm1() Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1

//Math.log1p()  Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。

//Math.log10()  Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。

//Math.log2()   Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。

//双曲函数方法
//ES6新增了6个双曲函数的方法
// Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
// Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
// Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
// Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
// Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
// Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）