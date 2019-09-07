//ES6允许直接写入变量和函数 作为对象的属性和方法 
const foo = 'bar';
const baz = {foo};
baz //{foo:'bar'}
//等同于
const baz = {foo:foo};

//方法简写
const o = {
    method: function(){
        return 'Hello!';
    }
};

let birth = '2000/01/01';
const Person = {
    name: 'david',
    birth,
    hello(){
        console.log('my name is', this.name);
    }
};

//属性名表达式
Object.foo = true;
obj['a' + 'bc'] = 123;

//ES6允许字面量的方式定义对象(使用大括号)
let proKey = 'foo';
let obj = {
    [propKey]:true,
    ['a' + 'bc']: 123
};
//另一个例子
let lastWord = 'last word';

const a = {
    'first word':'hello',
    [lastWord]:'world'
};
a['first word'] //hello
a[lastWord]  //"world"
a['last word'] //"world"

//表达式还可以用于定义方法名
let obj = {
    ['h' + 'ellp'](){
        return 'h1';
    }
};
obj.hello()  //hi

//属性表达式 如果是一个对象 默认情况下会自动将对象转为字符串[object, Object] 
const keyA = {a:1};
const keyB = {b:2};

const myObject = {
    [keyA]:'valueA',
    [keyB]:'valueB'
};
myObject   //Object{[object Object :"valueB"}
//这里为什么只有一个 valueB呢？因为[keyA]和[keyB]返回的都是[object Object], 而后者会把前者覆盖掉  而最后myObject对象只有一个object属性

//方法的name属性
//函数的name属性返回函数名 对象方法也是函数 因此也有name属性
const person = {
    sayName(){
        console.log('hello!');
    },
};
person.sayName.name   //"sayName"

//如果对象的方法使用了取值函数getter和存值函数setter 则name属性不是在该方法上面 而是该方法的属性描述对象的get set属性上面 返回值是方法名加上get和set
const obj = {
    get foo(){},
    set foo(x){}
},

obj.foo.name
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

descriptor.get.name   //"get foo"
descriptor.set.name   //"set foo"

//有两种特殊情况 bind方法创造的函数 name属性返回bound加上原函数的名字 Functrion构造函数创造的函数 name属性返回anonymous
(new Function()).name   //anonymous

var doSomething = function(){
    //...
};
doSomething.bind()().name   //'bound doSomething'

//如果对象的方是一个Symbol值 那么name属性返回的是这个Symbol值的描述
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
    [key1](){},
    [key2](){},
};
obj[key1].name   //"[description]"
obj[key2].name  //""

//Object.is() 用来比较两个值是否严格相等 与严格比较运算符(===)的行为基本一直
Object.is('foo','foo');   //true
Object.is({}, {});  //false
//不同之处只有两个 +0不等于-0  NaN等于自身
+0 === -0 //true
NaN === NaN //false

Object.is(+0, -0)   //false
Object.is(NaN, NaN)   //true

// Object.assign()
// Object.assign() 方法用于对象的合并 将源对象(source)的所有可枚举属性 复制到目标对象(target)
const target = { a:1 };
const source1 = { b:2 };
const source2 = { c:3 };

Object.assign(target, source1, source2);
target //{a:1, b:2, c:3}
//Object.assign方法的第一个参数是目标对象 后面的参数都是源对象
//如果目标对象与源对象有同名属性 或多个源对象有同名属性 则后面的属性会覆盖前面的属性
const target = { a:1, b:1};
const source1 = { b:2, c:2};
const source2 = { c:3};

Object.assign(target, source1, source2);
target //{a:1, b:2, c:3}

//如果参数不是对象 则会先转问对象 然后返回
typeof Object.assign(2)  //"object"

//由于undefined 和 null 无法转换为对象 所以如果它们作为参数 就会报错
Object.assign(undefined)  //TypeError: Cannot convert undefined or null to object
Object.assign(null)  //TypeError: Cannot convert undefined or null to object
//如果非对象参数出现在源对象的位置 那么处理规则有所不同 首先这些参数都会转成对象 如果无法转换 则跳过 这意味着 undefined和null 不在首参数 就不会报错
let obj = {a:1};
Object.assign(obj, undefined) === obj   //true
Object.assign(obj, null) === obj  //true

//其他类型的值 数值，字符串和布尔值 不在首参数 也不会报错。但是，除了字符串会以数组的形式 拷贝入目标对象 其他值都不会产生效果
const v1 = 'abc';
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1 ,v2 ,v3);  //v2 和 v3不会产生效果 因为它们不是字符串
console.log(obj);  //{'0':'a', '1':'b', '2':'c'}

Object('abc'); // => {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}  //原因在此

//Object.assign拷贝的属性是有限制的 只拷贝源对象的自身属性,也不拷贝不可枚举的属性
Object.assign({b:'c'}, Object.defineProperty({}, 'invisible',{
    enumerable:false,
    value:'hello'
}))
//{b:'c'}  //因为enumerable:false








