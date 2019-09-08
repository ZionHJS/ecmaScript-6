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

//同理 在对象内部 使用Symbol值定义属性时 Symbol值必须放在方括号中
let s = Symbol();
let obj = {
    [s]:function(arg){...};  //s就是Symbol 所以必须放在[]中
};
obj[s](123);

//上面代码中 如果s不放在方括号中 该属性的键名就是字符串s 而不是s代表的那个Symbol值 
//Symbol类型还可以用于定义一组常量 保证这组常量的值都是不相等的
const log = {};

log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn'),
}
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');

//最后Symbol值作为属性时 该属性是公开属性 不是私有属性

//属性名的遍历
//Symbol作为属性名 该属性不会出现在for...in for...of循环中 也不会被Object.keys() Object.getOwnPropertyNames() JSON.stringify返回 
//它也不是私有属性 有一个Object.getOwnPropertySymbols方法可以拿到 Symbol属性
//Object.getOwnPropertySymbols 返回的是一个数组 成员是当前对象的所有Symbol属性名的值
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols   //[Symbol(a), Symbol(b)]

//Reflect.ownKeys 方法可以返回所有类型的键名 包括常规键名和Symbol键名
let obj = {
    [Symbol('my_key')]:1,
    enum:2,
    nonEnum:3
};
Reflect.ownKeys(obj)   //['enum', 'nonEnum', Symbol(my_key)]   //注意 这里Symbol的键名被放到了最后

//由于Symbol的属性不会被常规的遍历方法遍历得到 我们可以利用这个特性 来定义非私有但是值用于内部的方法
let size = Symbol('size');
class Collection{
    constructor(){
        this[size] = 0;
    }
    add(item){
        this[this[size]] = item;
        this[size]++;
    }
    static sizeOf(instance){
        return instance[size];
    }
}
let x = new Collection();
Collection.sizeOf(x)   //0

x.add('foo');
Collection.sizeOf(x)  //1

Object.keys(x)  //['0']
Object.getOwnPropertyNames(x)  //['0']
Object.getOwnPropertySymbols(x)  //[Symbol(size)]
//这里对象x的size属性是一个Symbol值 所以Object.keys(x) Object.getOwnPropertyNames(x) 都无法获取它 这就造成了一种非私有的内部方法的效果



