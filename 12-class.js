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