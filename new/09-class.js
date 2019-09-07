//class
//Javascript语言中 生成实例对象的传统方法是构造函数
function Point(x, y){
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function(){
    return '('+this.x+','+this.y+')';
};
var p = new Point(1, 2);  // p =>{x:1, y:2}

// ES6的class写法
//定义类
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        return '('+this.x+','+this.y+')';
    }
}
//这段代码就定义了一个类，里面有一个constructor方法 这就是构造方法 而this关键字则代表实例对象  this指向实例对象

//class类 完全可以看作构造函数的一种写法
class Point{
    //...
}
typeof Point //'function'
Point === Point.prototype.constrcutor   //true
//上述代码表明 类的数据类型就是函数 类本身就是指向构造函数

//使用类的时候 可以直接使用new命令
class Bar{
    doStuff(){
        console.log('stuff');
    }
}
var b = new Bar();
b.doStuff()   //'stuff'

//构造函数的prototype属性 在ES6的class类中继续存在 类的所有方法都是定义在类的prototype属性上面的
class Point{
    constructor(){
        //...
    }
    toString(){
        //...
    }
    toValue(){
        //...
    }
}
//等同于 
Point.prototype = {  //class类的原型上包含了其所有的方法
    constrcutor(){},
    toString(){},
    toValue(){},
};
//在类的实例上面调用方法 其实就是调用原型上的方法
class B {}
let b = new B ();
b.constrcutor === B.prototype.constrcutor   //true

//由于类的方法都定义在prototype上面 所以类的新方法可以添加在prototype对象上面 Object.assign()方法可很方便的一次向类添加多个方法
class Point(){
    constructor(){
        //...
    }
}
Object.assign(Point.prototype,{  //直接在类的原型上添加方法
    toString(){},
    toValue(){}
});

//prototype对象的constructor属性 直接指向'类'本身 
Point.prototype.constructor === Point   //true

//类内部定义的所有方法 都不可枚举 non-enumerable
class Point {
    constructor(x, y){
        //...
    }
    toString(){
        //...
    }
}
Object.keys(Point.prototype)  // []
Object.getOwnPropertyNames(Point.prototype)   //['constructor','toString']

//类的属性名 可以采用表达式
let methodName = 'getArea';
class Square{
    constrcutor(length){
        //...
    }
    [methodName](){
        //...
    }
}
//上面代码中 Squre类的方法名getArea 是从表达式得到的

//严格模式 
//类和模块的内部 默认就是以严格模式运行 所以不需要添加'use strict'

//constructor方法
//constructor方法是类的默认方法，通过new命令生成对象实例时 自动调用该方法 
class Point{
}
//等同于
class Point{
    constructor(){}   //自动调用生成 类必须有constructor
}

//constructor方法默认返回实例对象(this) 完全可以指定返回另外一个对象
class Foo{
    constrcutor(){
        return Object.create(null);  //返回了新的null对象 constructor不再返回默认的实例对象
    }
}
new Foo() instanceof Foo   //false   这里测试构造函数Foo.prototype 是否出现在对象的原型链中的任何位置

//类必须使用new调用 否则会报错 而普通构造函数不使用new也可以
class Foo{   
    constructor(){
        return Object.create(null);
    }
}
Foo();  //TypeError: Class constructor Foo cannot be invoked without 'new'

//类的实例对象
//实例的属性除非显示定义在 本身this对象上 否则都是定义在prototype(即class上)
class Point{
    constructor(x, y){  //这里意思是 定义在constructor里面的方法和属性才作数？？
        this.x = x;
        this.y = y;
    }
    toString(){  //定义在class上的方法  所以就是定义在原型对象上的属性和方法
        return '('+this.x+','+this.y+')';
    }
}
var point = new Point(2, 3);
point.toString()   //(2, 3)
point.hasOwnProperty('x')  //true
point.hasOwnProperty('y')  //true
point.hasOwnProperty('toString')  //false
point.__proto__.hasOwnProperty('toString')  //true

//类的所有实例共享一个原型对象
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__ === p2.__proto__   //true
//这意味着 可以通过实例__proto__给 类 添加方法

//__proto__ 并不是语言本身的特性 这是各大厂商具体实现时添加的私有属性 不建议在实际生产中使用该属性 避免对环境产生依赖 
//生产环境中 我门可以使用 Object.getPrototytpeOf 方法来获取实例对象的原型 然后给原型添加方法和书讯个
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function(){return 'Oops'};  //修改p1的__proto__就相当于修改了所有对象共享的原型对象

p1.printName()   //'Oops'
p2.printName()   //'Oops'

var p3 = new Point(4,2);
p3.printName()  //'Oop'

//class表达式 
//与函数一样 类也可以使用表达式的形式定义
const Myclass = class Me{
    getClassName(){  
        return Me.name;
    }
}
//这里 类的名字不是 Me 而是 Myclass , Me只在class的内部代码可用 指代当前类
let inst = new Myclass();
inst.getClassName()  //Me
Me.name  //ReferenceError: Myclass is not defined  //这里Me只在class内部可用
//如果内部没有用到的话 可以省略Me 也就是可以写成下面的形式
const MyClass = class{/*...*/}

//采用class表达式 可以写出立即执行的Class
let person = new class{
    constrcutor(name){
        thjis.name = name;
    }
    sayName(){
        console.log(this.name);
    }
}('david');
person.sayName();  //'david'
//这里 person就是一个立即执行的类的实例

//不存在变量提升
//类不存在变量提升host
new Foo();   //ReferenceError: Foo is not defined
class foo{}

//私有方法和私有属性
//私有方法是常见的需求 只能通过变通的方法模拟是想
class Widget{
    //公有方法
    foo(baz){
        this._bar(baz);
    }
    //私有方法
    _bar(baz){
        return this.snaf = baz;
    }
}
//下划线表示_bar是一个只在内部使用的私有方法 只是一种命名方式
//实际真正实现私有方法的如下
//直接将私有方法移出代码块
class Widget{
    foo(baz){  //公有方法
        bar.call(this, baz);  //使用了.call 使得bar实际上称为了真正的私有方法
    }
    //...
}
function bar(baz){
    return this.snaf = baz;
}

//另一种方法 利用[Symbol]值的唯一性 将私有方法的名字命名为一个[Symbol]值
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{
    //公有方法
    foo(baz){
        this[bar](baz);
    }
    //私有方法
    [bar](baz){
        return this[snaf] = baz;
    }
    //...
}
//这里bar和snaf都是Symbol值 导致第三方无法获取它们

//私有属性尚且在提案之中

//this的指向
//类的方法内部如果含有this 它默认指向类的实例 
class Logger{
    printName(name = 'there'){
        this.printName(`Hello ${name}`);
    }
    print(text){
        console.log(text);
    }    
}
const logger = new Logger();
const { printName } = logger;
printName();   //TypeError: Cannot read property 'printName' of undefined
//这里单独调用了printName()方法 而 printName()方法的内部this默认指向它的实例 如果在全局中调用 this就会指向运行时所在的环境 就报错

//绑定this 可以在任何地方调用方法
class Logger{
    constrcutor(){  
        this.printName = this.printName.bind(this)   //绑定了this 
    }
}
//第二种方法 箭头函数
class Logger{
    constrcutor(){   
        this.printName = (name = 'there') => {
            this.print(`Hello${name}`);
        }
    }
}

//name属性
class Point {}
Point.name   //'Point'
//name 属性总是返回紧跟在class关键字后面的类名

//class的取值函数 getter 和存值函数 setter
class MyClass{
    constrcutor(){   
        //...
    }
    get prop(){
        return 'getter';
    }
    set prop(value){
        console.log('setter', +value);
    }
}
let inst = new MyClass();

inst.prop = 123;
inst.prop //'getter'

//存值函数 setter 和 取值函数 getter 都是设置在属性的Descriptor对象上的
class CustomHTMLElement{
    constrcutor(element){
        this.element = element;
    }
    get html(){
        return this.element.innerHTML;
    }
    set html(){
        this.element.innerHTML = value;
    }
}
var descriptor = Object.getOwnPropertyDescriptor(
    CustomHTMLElement.prototype,   //"html"
);
'get' in descriptor   //true
'set' in descriptor   //true

//如果在某个方法之前加上* 就表示该方法是一个Generator函数
class Foo{
    constrcutor(...args){
        this.args = args;
    }
    *[Symbol.iterator](){
        for(let arg of this.args){
            yield arg;
        }
    }
}
for(let x of new Foo('hello','world')){
    console.log(x);   // hello world
}

//class的静态方法
//类相当于实例的原型 所有在类中定义的方法 都会被实例继承 如果在一个方法前加上static关键字 就表示该方法不会被实例继承 而是直接通过类来调用
class Foo{
    static classMethod(){
        return 'hello';
    }
}
Foo.classMethod()   //'hello'

var foo = new Foo();
foo.classMethod()  //static 方法没有继承到实例对象

//如果静态方法包含this关键字 this指的是类 而不是实例
class Foo{
    static bar(){
        this.baz();  //this指向了类的baz() 而没有指向实例的baz()
    }
    static baz(){
        console.log('hello');
    }
    baz(){
        console.log('world');
    }
}
Foo.bar()   //hello
//这里说明 静态方法可以和非静态方法重名 调用的方式而不同

//静态方法可以被子类继承
class Foo {
    static classMethod() {
      return 'hello';
    }
  }
class Bar extends Foo {
    
  }
Bar.classMethod() // 'hello'

//静态方法也是可以从super对象上调用
class foo{
    static classMethod(){
        return 'hello';
    }
}
class Bar extends Foo{
    static classMethod(){
        return super.classMethod() + ', too';
    }
}
Bar.classMethod()   //'hello, too'

//class的静态属性和实例属性
//静态属性是指class本身的属性 Class.propName 而不是定义在实例对象(this)上的属性
class Foo{
}
Foo.prop = 1;   //这里定义了一个静态属性prop  静态属性不是静态方法
Foo.prop   //1
//目前class还没有定义静态属性 所以暂时用这种方法 并不能使用 static prop:1 这是无效的


class Foo{
    prop1='abc';
    static prop2 = '2'
}








