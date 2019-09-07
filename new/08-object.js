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

//Object.is() 
