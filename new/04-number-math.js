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

