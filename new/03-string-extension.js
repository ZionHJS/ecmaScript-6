//字符的Unicode方法
//JavaScript 允许采用\uxxxx形式表示一个字在\u0000~\uFFFF之间的字符，其中xxxx表示字符的 Unicode 码点
'\u0061' // "a"

//超出\u0000~\uFFFF范围的字符，必须用两个双字节的形式表示
'\uD842\uDFB7'   //吉
//花括号表示超范围的字符
'\u{20BB7}'   //吉
'\u{41}\u{42}\u{43}'   //"ABC"

let hello = 123;
hell\u{ 6F } //123

'
u{ 1F680 } ' === '\uD83D\uDE80'  //true

//javascript一共有6种方法可以表示字符
'\z' === 'z'  //true
'\172' === 'z'  //true
'\x7A' === 'z'  //true
'\u007A' === 'z' //true
'\u{7A}' === 'z'  //true

//具体可以查询中/英文 unicode编码 还有其对应的转换工具

//codePointAt()
//javascript内部 字符以UTF-16的格式储存 每个字符固定为2个字节 对于那些需要4个字节储存的字符 javascript会认为它们是两个字节
var s = '吉';
s.length //2
s.charAt(0) //''  charAt() 方法从一个字符串中返回指定的字符 str.charAt(index)
s.charAt(1) //''
s.charCodeAt(0) //55362   //charCodeAt() 方法返回0到65535之间的整数，表示给定索引处的UTF-16代码单元  就是返回对应index的character code
s.charCodeAt(1) //57271   //这里返回的是10进制的编码(十六进制是20BB7)

//codePointAt方法
//codePointAt()方法返回一个unicode编码点值的非负整数 str.codePointAt(pos) pos就是需要转码的元素的位置
let s = '吉a';
s.codePointAt(0);  //134071
s.codePointAt(1);  //57271
s.codePointAt(2);  //97
//总之，codePointAt方法会正确返回 32 位的 UTF-16 字符的码点。对于那些两个字节储存的常规字符，它的返回结果与charCodeAt方法相同

//String.fromCodePoint() 静态方法返回使用指定的代码点序列创建的字符串
console.log(String.fromCodePoint(9731, 9733, 9842, 0x2F804));  //expected output: "☃★♲你"

//字符串的iterator接口
for (let codePoint of 'foo') {
    console.log(codePoint);  //"f"   "o"   "o"
}

//除了遍历字符串 这个遍历器最大的优点是可以识别大于0xFFFF的码点 传统for循环无法识别这样的码点
let text = String.fromCodePoint(0x20BB7);
for (let i = 0; i < text.length; i++) {
    console.log(text[i]);
}
for (let i of text) {
    console.log(i);
}
//上面的代码中 字符串text只有一个字符 但是for循环会认为它包含两个字符

//includes(), startsWith(), endsWith()
//传统上 javascript只有indexOf()方法 可以用来确定一个字符串是否包含在另一个字符串中 
//includes(): 返回布尔值 表示是否找到了参数字符串
//startsWith(): 返回布尔值 表示字符串是否在原字符串的头部
//endsWith(): 返回布尔值 表示参数字符串是否在原字符串的尾部
let s = 'hello world!';

s.startsWith('hello');   //true
s.endsWith('!');   //true
s.includes('o');   //true

//这三个方法都支持第二个参数 表示开始搜索的位置
let s = 'hello world!';

s.startsWith('world', 6)  //true
s.endsWith('hello', 5)  //true
s.includes('hello', 6)   //false

//repeat()
//repeat方法返回一个新的字符串 表示将原字符串重复n次
'x'.repeat(3)   //'xxx'
'hello'.repeat(2)   //'hellohello'
'na'.repeat(0)   //""
//参数如果是小数 会被取整
'na'.repeat(2.9) //'nana
//如果repeat的参数是负数或者Infinity 会报错
'na'.repeat(Infinity)  //RangeError: Invalid count value
'na'.repeat(-1)   //RangeError: Invalid count value

//参数NaN和-1~0之间的数字会被认为是0
'na'.repeat(NaN)  //''
'na'.repeat(-0.9)  //''

//参数是字符串 则会被转化为0
'na'.repeat('3')  //'nanana'

//padStart() padEnd() 用于头部补全和尾部补全
'x'.padStart(5, 'ab')   //ababx
'x'.padStart(4, 'ab')   //abax

'x'.padEnd(5, 'ab')   //xabab
'x'.padEnd(4, 'ab')   //xaba
//该方法接收两个参数 第一个参数指定字符串的最小长度 第二个参数是用来补全的字符串
//如果原来的字符串长度大于等于指定的最小长度 则返回原字符串
'xxx'.padStart(2, 'ab')   //'xxx'

//如果用来补全的字符串与原来字符串 两者的长度之和超过了指定的最小长度 则会截去超出位数的补全字符串
'abc'.padStart(10, '0123456789'); //'0123456abc'

//如果省略第二个参数 默认使用空格补全长度
'x'.padStart(4);  //'   x'
'x'.padEnd(4);  //'x   '

//模版字符串
//传统方式
$('#result').append(
    'There are <b>' + basket.count + '</b> ' +
    'items in your basket, ' +
    '<em>' + basket.onSale +
    '</em> are on sale!'
);
//ES6方式
$('#result').append(`There are <b>${basket.count}</b> items in your basket, <em>${basket.onSale}</em>are on sale!`);
//模版字符串 {template string} 是增强版的字符串 用反引号(`)标识 它可以当作普通字符串使用 也可以用来定义多行字符串 或者在字符串中嵌入变量
//普通字符串
`In JavaScript '\n' is a line-feed.`
//多行字符串
`In JavaScript this is
not legal.`
console.log(`string text line 1
string text line 2`)
//字符串中嵌入变量
let name = 'Bob', time = 'today';
`Hello ${name}, how are you ${time}?`
//模版字符串都是用反引号表示 如果在模版字符串中需要使用反引号 则前面要用反斜杠转义 反斜杠就是转义字符
let greeting = `\`Yo\`World!`;

//如果模版字符串表示多行字符串 所有的空格和缩进都会被保留在输出之中
$(`#list`).html(`
<ul>
   <li>first</li>
   <li>second</li>
</ul>
`);
//上面代码中 所有模版字符串的空格和换行都是被保留的 比如<ul>标签前面会有一个换行 如果你不想要这个换行 可以使用trim方法消除它
$('#list').html(`
<ul>
   <li>first</li>
   <li>second</li>
</ul>
`.trim());

//模版字符串中嵌入变量 需要将变量名写在${}之中
function authorize(user, action){
    if(!user.hasPrivilege(action)){
        throw new Error(
            `User ${user.name} is not authorized to do ${action}.`
        );
    }
}

//大括号内部可以放入任意的JavaSript表达式 可以进行运算 以及引用对象属性
let x = 1;
let y = 2;
`${x}+${y} = ${x+y}`  //"1+2=3"
`${x}+${y*2} = ${x+y*2}`   //"1+4=5"

let obj = {x:1, y:2};
`${obj.x + obj.y}`   //"3"

//模版字符串中还能调用函数
function fn(){
    return "hello world";
}
`foo ${fn()} bar`   //foo hello world bar


