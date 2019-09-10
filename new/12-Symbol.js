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
    toString() {
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
if (sym) {
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
    [mySymbol]: 'Hello!'
};
//第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello' });
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
    [s]: function (arg) {...};  //s就是Symbol 所以必须放在[]中
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
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
};
Reflect.ownKeys(obj)   //['enum', 'nonEnum', Symbol(my_key)]   //注意 这里Symbol的键名被放到了最后

//由于Symbol的属性不会被常规的遍历方法遍历得到 我们可以利用这个特性 来定义非私有但是值用于内部的方法
let size = Symbol('size');
class Collection {
    constructor() {
        this[size] = 0;
    }
    add(item) {
        this[this[size]] = item;
        this[size]++;
    }
    static sizeOf(instance) {
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

//Symbol.for(), Symbol.keyFor()
//Symbol.for() 接收一个字符串作为参数 然后搜索有没有以该参数作为名称的Symbol值 如果有就返回这个Symbol值 否则就新建并返回一个以该字符串为名称的Symbol值
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2   //true
//这里为什么相等呢？因为都是搜索出来的相同Symbol值

//Symbol.for() Symbol()这两种写法 都会生成新的Symbol 它们的区别是 前者会被登记到全局环境中供搜索 后者不会。Symbol.for() 不会每次调用就返回一个新的Symbol类型的值 而是会先检查给定的key是否已经存在 如果不存在才会新建一个值 
//比如 调用Symbol.for('cat')30次 每次都会返回同一个Symbol值 但是调用Symbol('cat')30次 会返回30个不同的值
Symbol.for('bar') === Symbol.for('bar')   //true

Symbol.('bar') === Symbol.('bar')   //false

//Symbol.keyFor()方法返回一个已登记的Symbol类型值的key
let s1 = Symbol.for('foo');
Symbol.keyFor(s1);   //'foo'
let s2 = Symbol('foo')
Symbol.keyFor(s2)   //undefined 

//内置Symbol值 11个内置的Symbol值 指向语言内部使用的方法
//Symbol.hasInstance() 指向一个内部方法 当其他对象使用instanceof运算符 判断是否为该对象的实例时 会调用这个方法 foo instanceof Foo 实际调用的是Foo[Symbol.hasInstance]
class MyClass {
    [Symbol.hasInstance](foo) {
        return foo instanceof Array;   //判断foo是否为Array实例
    }
}
[1, 2, 3] instanceof new MyClass() //true
//这里 MyClass是一个类 new MyClass()会返回一个实例 该实例的Symbol.hasInstance方法 会进行instanceof运算时自动调用 判断左侧的运算子是否为Array实例 

//Symbol.isConcatSpreadable() 这个属性等于一个布尔值 表示该对象用于Array.prototype.concat() 是否可以展开
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e');   //['a','b','c','d','e']
arr1[Symbol.isConcatSpreadable];   //undefined
let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable]; = false;
['a', 'b'].concat(arr2, 'e');
//Symbol.isConcatSpreadable 默认值为umdefined 设置为true时才可以展开 

//Symbol.species 属性 指向一个构造函数 创建衍生对象时 会使用该属性
class MyArray extends Array {
}
const a = new MyArray(1, 2, 3);
const b = a.map(x => x);
const c = a.filter(x => x > 1);

b instanceof MyArray   //true
c instanceof MyArray   //true
//上面代码中 子类MyArray继承了父类Array  a是MyArray的实例 b和c是a的衍生对象 b和c都是调用数组方法生成的 所以应该是数组实例 但是实际它们也是MyArray实例 

//现在我们可以为MyArray设置Symbol.species属性
class MyArray extends Array {
    static get [Symbol.species]() { return Array; }
}
//这里由于定义了Symbol.species属性 创建衍生对象时就会使用这个属性返回函数 作为构造函数 这个例子也说 定义Symbol.species属性要采用get取值器 默认Symbol.species属性的写法如下
static get[Symbol.species](){
    return this;
}

//Symbol.match 属性 指向一个函数 当执行str.match(myObject)时 如果该属性存在就会调用它 返回该方法的返回值
String.prototype.match(regexp)
//等同于
regexp[Symbol.match](this)

class MyMatcher {
    [Symbol.match](string) {
        return 'hello world'.indexOf(string);
    }
}
'e'.match(new MyMatcher())   //1

//Symbol.replace 指向一个方法 当该对象被String.prototype.replace方法调用时  会返回该方法的返回值
String.prototype.replace(searchValue, replaceValue)
//等同于
searchValue[Symbol.replace](this, replaceValue)

//Symbol.search 指向一个方法 当该对象被String.prototype.search方法调用时 会返回该方法的返回值
String.prototype.search(regexp)
//等同于
regexp[Symbol.search](this)

class MySearch {
    constructor(value) {
        this.value = value;
    }
    [Symbol.search](string) {
        return string.indexOf(this.value);
    }
}
'foobar'.search(new MySearch('foo'));   //8

//Symbol.split 指向一个方法 当该对象被String.proptotype.split方法调用时 会返回该方法的返回值
String.prototype.split(separator, limit);
//等同于
separator[Symbol.split](this, limit)

//Symbol.iterator 指向该对象的默认遍历器方法
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

[...myIterable] // [1, 2, 3]

//symbol.toPrimitive 指向一个方法 该对象被转为原始类型的值时 会调用这个方法 返回该对象对应的原始类型值
let obj = {
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case 'number':
                return 123;
            case 'string':
                return 'str';
            case 'default':
                return 'default';
            default:
                throw new Error();
        }
    }
};

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'

    //Symbol.toStringTag 指向一个方法 在该对象上面调用Object.prototype.toString方法时 如果这个属性存在 它的返回值就会出现在toString方法返回的字符串中 表示对象的类型 
    // 例一
    ({ [Symbol.toStringTag]: 'Foo' }.toString())
// "[object Foo]"

// 例二
class Collection {
    get [Symbol.toStringTag]() {
        return 'xxx';
    }
}
let x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"

//Symbol.unscopables 指向一个对象 该对象指定了使用with关键字 哪些属性会被with环境排除
Array.prototype[Symbol.unscopables]
// {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   includes: true,
//   keys: true
// }

Object.keys(Array.prototype[Symbol.unscopables])
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']

//test
//作为属性名的Symbol
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
    [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"

//Symbol值作为对象属性名时 不能用点运算符
//在对象内部 使用Symbol值定义属性时 Symbol值必须放在方括号中
let s = Symbol();

let obj = {
    [s]: function (arg) { ... }
};

obj[s](123);

//Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。
const log = {};

log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
};
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');

//魔术字符串
function getArea(shape, options) {
    let area = 0;

    switch (shape) {
        case 'Triangle': // 魔术字符串
            area = .5 * options.width * options.height;
            break;
        /* ... more code ... */
    }

    return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
//Triangle在这里就是一个魔术字符串
//消除魔法字符串的方法 就是把它写成字符串
const shapeType = {
    triangle: 'Triangle'
};

function getArea(shape, options) {
    let area = 0;
    switch (shape) {
        case shapeType.triangle:
            area = .5 * options.width * options.height;
            break;
    }
    return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });






