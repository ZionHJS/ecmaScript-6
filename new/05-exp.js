//ES6的正则函数 第一个参数是正则对象 第二个参数是是指定修饰符
new RegExp(/abc/ig, 'i').flags   //i

//字符串的正则方法
//字符串对象共有4个方法 match() replace()  search() split()
// String.prototype.match 调用 RegExp.prototype[Symbol.match]
// String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
// String.prototype.search 调用 RegExp.prototype[Symbol.search]
// String.prototype.split 调用 RegExp.prototype[Symbol.split]

//u修饰符　
//ES6对正则表达式添加了u修饰符 含义为'Unicode'模式 
/^\uD83D/u.test('\uD83D\uDC2A') // false
/^\uD83D/.test('\uD83D\uDC2A') // true

//点字符
var s = '吉';
/^.$/test(s)  //false
/^.$/u.test(s)   //true

//unicode字符表示法
/\u{61}/.test('a')   //false
/\u{61}/u.test('a')   //true
/\u{20BB7}/u.test('吉')  //true

//量词
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true

//RegExp.protptype.unicode属性
const r1 = /hello/;
const r2 = /hello/u;
r1.unicode //false
r2.unicode //true

//y修饰符 '粘连'修饰符
//y修饰符 与 g修饰符 类似 也是全局匹配 不同处在于 g修饰符只要剩余位置中存在匹配就可 而y修饰符确保匹配必须从剩余的第一个位置开始 这就是'粘连'的含义
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s)   //['aaa']
r2.exec(s)   //['aaa']

r1.exec(s)  //['aa'] 第二次匹配
r2.exec(s)  //null
//y与g的区别是在第一次匹配结束之后的 '粘连'特性

//y修饰符配合lastIndex属性 但是要求必须在lastIndex指定的位置发现匹配s
const REGEX = /a/y;
//从2号位置开始匹配
REGEX.lastIndex = 2;
//因为是粘连 匹配失败
REGEX.exec('xaya'); //首位是y=>null
//指定从3号位置开始匹配 
REGEX.lastIndex = 3;
//3号位置是粘连 匹配成功
const match = REGEX.exec('xaya');
match.index //3
REGEX.lastIndex //4

//实际上 y修饰符号隐藏了头部匹配标志^ 这个就是相当于有了头部匹配标志的g修饰符
/b/y.exec('aba')   //null
//配合replace方法的例子
const REGEX = /a/y;  //单独有y的时候 只执行一次 返回第一次的结果
'aaxaa'.replace(REGEX, '-');  //'-axaa'

const REGEX = /a/gy;
'aaxaa'.replace(REGEX, '-');  //'--xaa'

//配合match的例子
'a1a2a3'.match(/a\d/y)  //'a1' 单独有y的时候 只执行一次 返回第一次的结果
'a1a2a3'.match(/a\d/gy) // ["a1", "a2", "a3"]  返回全部结果




