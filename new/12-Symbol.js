//Symbol 是一种数据类型 表示独一无二的值 它是javaScript语言的第七种数据类型 
//前六种数据类型 undefined null Boolean String Number Object 现在有了Symbol

//Symbol值通过Symbol函数生成  简单来说 对象的属性名现在可以有两种类型
//第一种是原来就有的字符串  第二种是Symbol类型 这种属性都是独一无二的
let s = Symbol();
typeof s   //Symbol

//Symbol函数前不能使用new命令 因为生成的Symbol是一个原始类型的值 不是对象 
//也就是说 由于Symbol值不是对象 所以不能添加属性
//Symbol函数可以接收一个字符串作为参数 表示对Symbol实例的描述 
let s1 = Symbol('foo');
let s2 = Symbol('bar');
s1   //Symbol(foo)
s2   //Symbol(bar)
s1.toString()   //'Symbol(foo)'
s2.toString()   //'Symbol(bar)'
//这里 s1 s2是两个Symbol值 如果不传参数 它们在控制台的输出都是Symbol() 不利于区分 加了参数以后输出就是Symbol(arg) 就方便区分了
//如果Symbol函数的参数是个对象 就会调用对象的toString方法 将其转为字符串 然后才生成一个Symbol值
const obj = {
    toString(){
        return 'abc';
    }
};
const sym = Symbol(obj);   //Symbol(abc)

//Symbol值不能与其他类型的值进行运算 会报错
let sym = Symbol('My symbol');
'your symbol is' + sym   //TypeError: Cannot convert a Symbol value to a string
`your symbol is ${sym}`  //TypeError: Cannot convert a Symbol value to a string

//但是Symbol值可以显示转为字符串  注意 只是显示
let sym = Symbol('My symbol');

String(sym)   //'Symbol(My symbol)'
sym.toString() //'Symbol(My symbol)'

//另外Symbol值可以转为布尔值 但不能转为数值
let sym = Symbol();
Boolean(sym)  //true
if(sym){
    //...
}
Number(sym)  //TypeError
sym + 2 //TypeError

//作为属性名的Symbol
//由于Symbol每个属性名都是不相等的 可以防止覆盖
let mySymbol = SYmbol();
//第一种写法
let a = {};
a[mySymbol] = 'Hello';
//第二种写法
let a = {
    [mySymbol]:'Hello!'
};
//第三种写法
let a = {};
Object.defineProperty(a, mySymbol, {value:'Hello'});
//同样的结果
a[mySymbol]  //'Hello'

//上面代码通过方括号结构和Object.defineProperty 将对象的属性名指定为一个Symbol值
//Symbol值作为对象属性名时 不能用点运算符
const mySymbol = new Symbol();
const a = {};

a.mySymbol = 'Hello!';  //.运算符后面总是字符串 所以这里不是真正的设置Symbol
a[mySymbol]   //undefined
a['mySymbol']  //"Hello!"
//这里 因为点运算符后面总是字符串 所以不会读取mySymbol值 导致a属性名实际上是一个字符串 而不是一个Symbol值


