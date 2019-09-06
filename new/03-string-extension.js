//字符的Unicode方法
//JavaScript 允许采用\uxxxx形式表示一个字在\u0000~\uFFFF之间的字符，其中xxxx表示字符的 Unicode 码点
'\u0061' // "a"

//超出\u0000~\uFFFF范围的字符，必须用两个双字节的形式表示
'\uD842\uDFB7'   //吉
//花括号表示超范围的字符
'\u{20BB7}'   //吉
'\u{41}\u{42}\u{43}'   //"ABC"

let hello = 123;
hell\u{6F} //123

'
u{1F680}' === '\uD83D\uDE80'  //true

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
let s = '吉';
s.codePointAt(0);  //134071
s.codePointAt(1);  //57271
s.codePointAt(2);  //97
