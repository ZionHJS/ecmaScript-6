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
 
//y符号提取token词元 y保证了匹配之间不会有漏掉的字符
const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
const TOKEN_G = /\s*(\+|[0-9]+)\s*/g;
tokenize(TOKEN_Y, '3 + 4');   //['3','+','4']
tokenize(TOKEN_G, '3 + 4');   //['3','+','4']

function tokenize(TOKEN_REGEX, str){  //tokenize函数
    let result = [];
    let match;
    while(match = TOKEN_REGEX.exec(str)){
        result.push(match[1]);
    }
    return result;
}

//RegExp.prototype.sticky属性
//与y修饰符匹配  ES6的正则实例对象多了sticky属性 表示是否设置了y修饰符
var r = /hello\d/y;
r.sticky //true

//RegExp.prototype.flags属性
//ES6为正则表达式新增了flags属性 会返回正则表达式的修饰符
/abc/ig.source   //"abc"  source

/abc/ig.flags   //'gi  flags

//s修饰符:dotAll模式
//正则表达式中 .是一个特殊的字符 代表任意单个字符 

//后行断言
//先行断言(lookahead)指的是 x只有在y前面才匹配 必须写成/x(?=y)/, 比如 只匹配百分号之前的数字要写成 /\d+(?=%)
//先行否定断言(negative lookahead) x只有不在y前面才匹配 必须写成/x(?!y)/ 比如 只匹配不在百分号之前的数字 要写成 /\d+(?!%)/
/\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
/\d+(?!%)/.exec('that\'s all 44 of them')  //["44"]

//后行断言正好相反 x只有在y后面才能匹配 必须成成/(?<=y)x/ 比如,只匹配美元符号之后的数字 要写成/(?<=\$)\d+/, x只有不在y后面才匹配 必须写成/(?<!y)x 只匹配不在美元符号后面的数字 要写成/(?<!\$)d+/
/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')   //["100"]
/(?<!\$)\d+/.exec('it is worth about $90');  //null

//用后行断言对字符串进行替换
const RE_DOLLAR_PREFIX = /(?<=\$)foo/g;
'$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar');   //'$bar %foo foo'  //仅替换了$后面的foo

//unicode属性类
//ES6引入了一种新的类的写法 \p{...} 和 \p{...} 允许正则表达式匹配符合Unicode某种属性的所有字符
const regexGreekSymbol = /\p{Script=Greek}/u;
regexGreekSymbol.test('π');

//具名组匹配
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;  //圆括号的用法就是匹配括号内相应的字符串 有几个括号就有几个字符串

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1];   //1999
const month = matchObj[2];   //12
const day = matchObj[3];   //31

//ES6引入了具组名匹配 允许为每一个组匹配指定一个名字 即便便于阅读代码 又便于引用
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;  //?+标签符号用来在正则中指定该圆括号内容内的名字

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year;   //1999
const month = matchObj.groups.month;   //12
const day = matchObj.groups.day;   //31

//解构赋值和替换
//有了具名组匹配之后 可以使用解构赋值直接从匹配结果上变为变量赋值
let {groups:{one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar') 
//one  =>  foo
//two  =>  bar
//字符串替换时 可以用$<组名>引用具名组
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
'2015-01-02'.replace(re, '$<day>/$<month>/$<year>')   //02/01/2015

//引用
//如果要在正则表达式内部引用某个 "具名组匹配", 可以使用\k<组名>的写法
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
RE_TWICE.test('abc'!'abc')   //true
RE_TWICE.test('abc'!'ab')   //false
