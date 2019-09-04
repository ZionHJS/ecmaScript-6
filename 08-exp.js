//1.正则表达式 构造函数升级
const exp1 =/\d*/gim //g global i ignore m Multi-line

//用构造函数创建 正则表达式
const exp2 = new RegExp('\d+', 'g');

const exp3 = new RegExp('\d+/gim')  //es5 支持的方式，直接传正则表达式，但无法传入第二个参数 

//es6中 可以传入第二个参数
const exp4 = new RegExp(/\d+/gi, 'im');  //第二个参数:flag,修饰符
console.log('exp4.flags:', exp4.flags);   //第二个参数是一个flag
const exp4 = new RegExp(/\d+/gi);  //第二个参数:flag,修饰符
console.log('exp5.flags:', exp5.flags);

//增加的修饰符: u u修饰符， 含义为"Unicode模式"，用来正确处理大于\uFFFF的Unicode字符
let s = "吉"
console.log(/^.$/gi.test(s)); //false
console.log(/^.$/u.test(s));  //true u代表正则表达式可以匹配unicode的字符

//3.y修饰符,叫做"粘连"修饰符 后一次匹配都从上一次匹配成功位置的下一个位置开始
const str = '2344bb33dd89';
const exp1 = /\d{2}/g;
let t;
while(t = exp1.exec(str)){
    console.log('t:',t);
}

//使用沾粘匹配 y
const str = '2344bb33dd89';
const exp1 = /\d{2}/y;  //y表示沾粘匹配
let t;
while(t = exp1.exec(str)){
    console.log('t:',t);
}

//4. s 修饰符:dotAll模式 正则表达式中，点(.)是一个操作字符，代表任意单个字符。另外:一个是四字节的UTF-16
//字符，这个可以用u修饰符解决,另一个是行中支付(line terminator character)
console.log(/./s.test('\n'))

//5. 具名组匹配 ES2018 引入了具名组匹配(Named Caoture Groups), 允许为每一个组匹配指定一个名字
const exp2 = /(?<num1>\d+)(?<num2>-\d+-)/;
console.log(exp2.exec('3333-222-aaaa'));

//还支持解构赋值
let{groups:{num1, num2}} = exp2.exec('3333-222-aaaa');
console.log('num1:',num1);
console.log('num2:',num2);

//6.增加的属性
//RegExp.prototype.flags
//RegExp.prototype.sticky   //y 粘连
//RegExp.prototype.unicode  //u Unicode




