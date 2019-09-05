//1.class的基本语法
function Person(name = 'david', age = 19){
    this.age = age;
    this.name = name;
}

Person.prototype.show = function(){
    console.log(this.name, this.age);
}

let p = new Person('david');
p.show();

//2.es6使用class定义类型
class Person{
    show(){
        console.log(this.PName);
    }
    get PName(){
        return this._pName;
    }
    set PName(val){
        this._pName = val;
    }
}

let p = new Person();
p.PName = 'google.com';
p.show();

console.log('typeof Person:', typeof Person);   //Person类型 其实本质跟原来的构造函数是一样的
console.log('Person.prototype.show:', Person.prototype.show);

//3.构造函数constructor方法
class Person{
    constructor(name='google.com', age = 19){
        this.age = age;
        this.name = name;
    }
    show(){
        console.log('this.age:', this.age);
        console.log('this.name:', this.name);
    }
}

let p = new Person();   //es6用class定义的类型 必须用new构建
p.show();  //从constructor里面找属性

let p2 = new Person('david',18);   //传参数会覆盖constructor里的参数
p2.show();

//构造函数中 返回其他对象
class Person{
    constructor(name, age){
        return {
            name, age
        }
    }
}
let p = new Person('ss', 123);
console.log('p:',p);

//4.严格模式

//5.class表达式
let Person = class{
    show(){
        console.log('123');
    }
};
let p = new Person();
p.show();

//6.类不存在变量提升hosting
let p = new Person();
p.show();

class Person{
    show(){
        console.log('ssss');   //this => 构造对象的实例
    }
}

//使用解构的时候 要注意this可能不是指向当前的对象
class Person{
    constructor(){
        this.show = this.show.bind(this);
    }
    show(){
        console.log('this:', this);
    }
}
let p = new Person();
p.show()
let {show} = p;
show();

//8.class的静态方法
class Person{
    static add(a,b){
        return a + b;
    }
}
Person.PI = 3.1415926;
console.log(Person.add(10,101));

//9.class 的继承 extends
//1-把父构造函数里面初始化对象的代码执行
//2-把父构造函数的原型上定义的方法进行拷贝
class Person{
    constructor(name = '', age = 18){
        this.name = name;
        this.age = age;
    }
    show(){
        console.log('this.name:', this.name);
        console.log('this.age:', this.age);
    }
}
class Student extends Person{
    constructor(name = '', age = 18, phone = ''){
        super(name, age);  //继承 必须调用super() 而且在子类的构造函数内部使用this之前必须用super
        this.phone = phone;
    }
}

let s = new Student('google', 20, '123123213');
s.show();

//10.继承原生的构造函数
function Person(){
    this.age = age;
    this.name = name;
}
Person.prototype.show= function(){
    console.log('this.age:', this.age);
    console.log('this.name:', this.name);
}
class Student extends Person{
    constructor(){
        super(age,name);
    }
}
let s = new Student(19, 'google.com');
s.show();

//11.继承内置类型的构造函数
class MyArray extends Array{
    constructor(...args){
        super(...args);
    }
}

let m = new MyArray(3,4,6,2,8,2);
console.log('m:',m);
