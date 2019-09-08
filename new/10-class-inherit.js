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
        super.myMethod(msg);
    }
}
Child.myMethod(1);   //static 1

var child = new Child();
child.myMethod(2);   //instance 2
//上面代码中 super在静态方法中指向父类 在普通方法中指向父类的原型对象


