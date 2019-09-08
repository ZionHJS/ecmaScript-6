//class可以通过extends关键字实现继承 
class Point{
}
class ColorPoint extends Point{
}
//ColorPoint继承了Point 两者内部都没有任何代码
//在ColorPoint内部加上代码
class ColorPoint extends Point{
    constructor(x, y, color){
        super(x, y)   //调用父类的constructor(x, y)
        this.color = color;
    }
    toString(){   
        return this.color + ' ' + super.toString();   //调用父类的toString
    }
}
//上面的代码中constructor和toString方法之中都出现了super关键字 它在这里表示构造函数 用来新建父类的this对象
//子类必须在constructor方法中调用super方法 否则新建实例时会报错 这是因为子类自己的this对象 必须先通过父类的构造函数完成塑造 得到与父类同样的实例属性和方法 然后再对其进行加工 加上子类自己的实例属性和方法 如果不调用super方法 子类就得不到this对象
class Point{/*...*/}
class ColorPoint extends Point{
    constructor(){
    }
}
let cp = new ColorPoint();   //ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
//这里 虽然ColorPoint 继承了 Point 但它的构造函数没有调用super方法来调用父类的构造函数 所以无法构建它自身的this对象
//如果子类没有定义constructor方法 这个方法会被默认添加 也就是说 不管有没有显式定义 任何一个子类都有constructor方法
class ColorPoint extends Point{
}
//等同于
class ColorPoint extends Points{
    constructor(args...){  //默认配置的constructor
        super(...args);
    }
}

//在子类的构造函数中 只有调用了super之后 才可以使用this关键字 这是因为子类实例的构建是基于父类实例的加工 只有super方法之后才能返回父类实例
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
class ColorPoint extends Point{
    constructor(x, y, color){
        this.color = color;  //ReferenceError
        super(x, y);
        this.color = color;  //没有报错
    }
}

//子类来生成实例
let cp = new ColorPoint(25, 8, 'green');

cp instanceof ColorPoint //true
cp instanceof Point //true

//父类的静态方法 也会被子类继承
class A{
    static hello(){
        console.log('hello world');
    }
}
class B extends A{
}
B.hello()   //hello world

//Object.getPrototypeOf() 方法用来从子类上获取父类
Object.getPrototypeOf(ColorPoint) === Point   //true

//super关键字 
//super关键字既可以当作函数来使用 也可以当作对象使用 
//1.当作函数来使用的时候 代表父类构造函数 constructor 
class A{}
class B extends AS{
    constructor(){
        super();   //子类必须执行一次super
    }
}
//super虽然代表了父类的构造函数 但是返回的是子类B的实例 即super内部的this指的是B 因此super()在这里相当于A.prototype.constructor.call(this)
class A {
    constructor() {
        console.log(new.target.name)
    }
}
class B extends A{
    constructor(){
        super();
    }
}
new A()   //A
new B()   //B
//这里new.target指向是新new出来的对象 也客观证明了super内部的this指向了B

//作为函数 super只能在子类的构造函数中 在其他地方就会报错
class A {}
class B extends A{
    m(){
        super();  //SyntaxError: 'super' keyword unexpected here  //也就是说super作为函数使用的时候 只针对constructor构造函数 就是调用构造函数
    }
}

//当super作为对象时 在普通方法中 指向父类的原型对象 在静态方法中 指向父类
class A {
    p(){
        console.log(this);
        return 2;
    }
}
class B extends A {
    constructor(){
        super();
        console.log(super.p());   //2
    }
}
let b = new B(); 
//上面代码中 子类B中的super.p()就是将super当作一个对象使用 这时super在普通方法之中指向A.prototype 所以super.p()就相当于A.prototype.p()
//问题super.p()的this指向谁呢？？？
//这里要注意 由于super指向父类的原型对象 所以定义在父类实例上的方法或属性 是无法通过super调用的
class A{
    constructor(){
        this.p = 2;
    }
}
class B extends A{
    get m(){
        return super.p;
    }
}
let b = new B();
b.m  //undefined
//这里 super指向父类的原型对象 所以定义在父类实例上的方法或属性 是无法通过super调用的
//但是如果属性定义在父类的原型对象上super就可以取到
class A {
}
A.prototype.x = 2;

class B extends A{
    constructor() {
        super();
        console.log(super.x)   //2
}
}
let b = new B();
//这里属性x是定义在父类A的原型上面的 所以super.x就可以取到它的值

//在子类普通方法中通过super调用父类方法时 方法内部的this指向当前的子类的实例
class A {
    constructor(){
        this.x = 1;
    }
    print(){
        console.log(this.x);
    }
}
class B extends A{
    constructor(){
        super();
        this.x = 2;
    }
    m(){
        super.print();
    }
}
let b = new B();
b.m()   //2   这里实际执行的是 super.print.call(this) this指向B对象

//由于this指向子类实例 所以如果通过super对某个属性赋值 这时super就是this 赋值的属性会变成子类实例的属性
class A{
    constructor(){
        this.x = 1;
    }
}
class B extends A{
    constructor(){
        super();
        this.x = 2;
        super.x = 3;  //这里是相当于在赋值了
        console.log(super.x)   //undefined  读的是 A.prototype.x 但A只有constructor现在
        console.log(this.x)   //3
    }
}
let b = new B();
//上面代码中 super.x的赋值为3 这时等同于this.x赋值为3 当读取super.x的时候 读的是A.prototype.x 返回undefined

//如果super作为对象 用在静态方法中 这时super将指向父类 而不是父类的原型对象
class Parent{
    static myMethod(msg){
        console.log('static', msg);
    }
    myMethod(msg){
        console.log('instance', msg);
    }
}
class Child extends Parent{
    static myMethod(msg){
        super.myMethod(msg);
    }
    myMethod(msg){
        super.myMethod(msg);  //普通方法中调用super指向父类的原型对象
    }
}
Child.myMethod(1);   //static 1 调用的是static方法 因为排在第一个

var child = new Child();
child.myMethod(2);   //instance 2
//上面代码中 super在静态方法中指向父类 在普通方法中指向父类的原型对象

//子类静态方法中通过super调用父类的方法时 方法内部的this指向当前的子类 而不是子类的实例
class A {
    constructor(){
        this.x = 1;
    }
    static print(){
        console.log(this.x);
    }
}
class B extends A{
    constructor(){
        super();
        this.x = 2;
    }
    static m(){
        super.print();
    }
}

B.x = 3;
B.m()   //3

//使用super的时候 必须显示指定是作为函数 还是作为对象使用 否则会报错
class A {}
class B extends A{
    constructor(){
        super();
        console.log(super);  //SyntaxError: 'super' keyword unexpected here
    }
}

//上面代码中 console.log(super)当中的super 无法看出是作为函数使用还是作为对象使用 
//对象总是继承其他对象的 所以可以在任意一个对象中 使用super关键字
var obj = {
    toString(){
        return 'MyObject' + super.toString();
    }
};
obj.toString();  //MyObject:[object, Object]   //对象总是继承至其他对象

//类的prototype属性和__proto__属性
//浏览器中 每一个对象都有__proto__属性 指向对应的构造函数prototype属性
//class 同时具有prototype和__proto__属性 因此有两条同时存在的继承链

//子类的__proto__属性 表示构造函数的继承 总是指向父类
//子类prototype属性的__proto__属性 表示方法的继承 总是指向父类的prototype属性
class A{}
class B extends A {}
B.__proto__  === A //true
B.prototype.__proto__ === A.prototype   //true

//继承是按照下面的的模式实现的
class A{}
class B{}
//B的实例继承A的实例
Object.setPrototypeOf(B.prototype, A.prototype);

//B继承A的静态属性
Object.setPrototypeOf(B, A)

const b = new B();
//这里解释下Object.setPrototypeOf
Object.setPrototypeOf = function(obj, proto){
    obj.__proto__ = proto;
    return obj;
}
//所以这里实际发生的情况是
Object.setPrototypeOf(B.prototype, A.prototype);
//等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
//等同于
B.__proto__ = A;

//这两条继承链 可以这样理解: 作为一个对象 子类B的原型(__proto__)是父类A  作为一个构造函数 子类B的原型对象(prototype属性)是父类的原型对象(prototype属性)的实例
Object.create(A.prototype)
//等同于
B.prototype.__proto__=A.prototype;

//重点来了
//extends关键字后面可以跟多种类型的值
class A extends Object{
}
A.__proto__ = Object   //true
A.prototype.__proto__ = Object.prototype   //true
//这种情况下 其实A就是构造函数Object的复制  A的实例就是Object的实例

//第二种情况 不存在任何继承
class A{}
A.__proto__ === Function.prototype   //true
A.prototype.__proto__ === Object.prototype   //true

//实例的__proto__属性
//子类实例的__proto__属性的__proto__属性 指向父类实例的__proto__属性 也就是说子类的原型的原型 是父类的原型
var p1 = new Point(2,3);
var p2 = new ColorPoint(2,3,'red');

p2.__proto__ === p1.__proto__ //false
p2.__proto__.__proto__ === p1.__proto__  //true
//上面代码中 ColorPoint继承了Point 导致前者原型的原型是后者的原型

//因此 通过子类实例的__proto__.__proto__属性 可以修改父类实例的行为
p2.__proto__.__proto__.printName = function(){
    console.log('Ha')
}
p1.printName()   //'Ha'

//原生构造函数的继承
//原生构造函数是指语言的内置构造函数 通常用来生成数据解构  ECMAScript大致有下面这些原生构造函数
//Boolean()  Number()  String()  Array()  Data() Function()  RegExp()  Error()  Object()
//原生构造函数的this无法绑定 导致拿不到内部属性
//ES可以新建父类实例对象的this 然后再用子类的构造函数修饰this 使得父类的所有行为都可以继承 那么就可以继承原生的构造函数了
class MyArray extends Array{
    constructor(...arg){
        super(...arg);
    }
}
var arr = new MyArray();
arr[0] = 12;
arr.length //11

arr.length = 0;
arr[0];  //undefined
//这里定义了一个MyArray类 继承了Array构造函数 因此就可以从MyArray生成数组的实例 
//这个例子也说明了 extends关键字不仅可以用来继承类 还可以用来继承原生的构造函数 因此可以在原生数据解构的基础上 定义自己的数据结构
class VersionedArray extends Array{
    constructor(){
        super();
        this.history = [[]];
    }
    commit(){
        this.history.push(this.slice());
    }
    revert(){
        this.splice(0, this.length, ...this.history[this.history.length - 1]);
    }
}
var x = new VersionedArray();

x.push(1);
x.push(2);
x  //[1,2]
x.history  //[[]]

x.commit()
x.history  //[[],[1,2]]

x.push(3)
x  //[1,2,3]

x.revert();
x  //[1,2]
//上面代码 有点不懂 

//Mixin模式的实现
//Mixin 指的是多个对象合成一个新的对象 新对象具有各个组成成员的接口
const a = {
    a:'a'
};
const b ={
    b:'b'
};
const c = {...a, ...b};  //{a:'a', b:'b'}
//c对象是a对象和b对象的合成 具有两者的接口

//下面是一个更完备的实现 将多个类的接口混入(mix in) 另一个类
function mix(...mixins){
    class Mix{}
    for(let mixin of mixins){
        copyProperties(Mix.prototype, mixin);   //拷贝实例属性
        copyProperties(Mix.prototype. Reflect.getPrototypeOf(mixin));  //拷贝原型属性
    }
    return Mix;
}

function copyProperties(target, source){
    for(let key of Reflect.ownKeys(source)){
        if(key !== 'constructor' && key !=='prototype' && key !== 'name'){
            let desc = Object.getOwnPropertyDescriptor(source, key);
        }
    }
}
//上面代码的mix函数 可以将多个对象合成为一个类 使用的时候继承这个类即可


