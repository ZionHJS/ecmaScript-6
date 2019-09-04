//1. Javascript 允许采用\uxxxx形式表示一个字在\u0000~\uFFFF之间的字符
let x = '\u0061';
let y = '\u0062';
let z = '\u0063';
console.log('x:',x);
console.log('y:',y);
console.log('z:',z);

//2. 超出\u0000~\uFFFF范围的字符，必须用两个双字节表示
let b = "\uD842\uDf87";
console.log('b:',b);

//3.还可以用花括号把码点包裹住
let d = '\u{20887}';
console.log('d:',d);

//4.js中的字符表示方法汇总
let a = '\z';
let b = '\172'


//8.includes(), startWith(), endswith()
let s = '123456';

console.log('s.includes("34"):', s.includes("34"));
console.log('s.includes("30"):', s.includes("30"));

console.log('s.startsWith("1"):', s.startsWith("1"));
console.log('s.startsWith("2"):', s.startsWith("2"));

console.log('s.endsWith("56"):', s.endsWith("56"));
console.log('s.endsWith("567"):', s.endsWith("567"));







