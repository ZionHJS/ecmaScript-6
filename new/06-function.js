//ES6允许为函数的参数设置默认值 
function log(x, y ='World'){
    console.log(x, y);
}
log('Hello')   //Hello World
log('Hello', 'China')   //Hello China
log('Hello', '')   //Hello

function Point(x=0, y=0){
    this.x = x;
    this.y =y;
}
const P = new Point();   //P{x:0, y:0}

//参数变量是默认声明的 所以不能用let或const再次声明
function foo(x=5){
    let x = 1;   //error 'x' has already been declared
    const x = 2;   //error
}
//函数不能有同名参数
function foo(x, x ,y=1){
    //SyntaxError: Duplicate parameter name not allowed in this context
}

//参数的默认值是惰性求值的 每次使用都重新计算默认值表达式的值
let x = 99;
function foo(p=x+1){
    console.log(p);
}
foo();  //100
x = 100;
foo();  //101

//解构赋值配合默认值来使用
function foo({x, y=5}){
    console.log(x, y);
}
foo({});   //undefined 5
foo({x:1});   //1 5
foo({x:1, y:2});   //1 2
foo();  // TypeError: Cannot read property 'x' of undefined 内传的参数必须是对应的对象

function foo({x, y=5} = {}){ //这里设置了函数参数的默认值 这时也属于双重默认值的情况
    console.log(x,y);
}
foo();   //undefined 5

//如果没有提供参数 函数foo的参数默认为一个空对象
function fetch(url, {body='', method='GET', header={}}){
    console.log(method);
}
fetch('www.google.com', {})   //GET
fetch('www.baidu.com')   //TypeError: Cannot destructure property `body` of 'undefined' or 'null'.
//上面的代码由于没有传入第二个参数而出错 此时如果结合函数参数的默认值 就可以省略第二个参数, 这时 就出现了双重默认值
function fetch(url, {body='', method='GET', header={}} = {}){
    console.log(method);
}
fetch('www.google.com')  //GET
//上面的代码中 函数fetch没有第二个参数时 函数参数的默认值就会生效 然后才是解构赋值的默认值生效 变量method才会取到默认值GET
//两种写法的不同
function m1({x=0, y=0} = {}){  //这种写法 如果没有传入参数 会双重激发默认值
    return [x,y];
}
function m2({x,y} = {x:0, y:0}){  //这中写法 如果没有传入参数 m2()的参数依然会返回undefined 原因就在与没有给参数事先激活默认值
    return [x,y];
}

//参数默认值的位置
//通常情况下 定义了默认值的参数 应该是函数的尾参数 因为这样比较容易看出来 到底省略了哪些参数 如果非尾部的参数设置默认值 实际上这个参数是没法省略的
function f(x=1, y){
    return[x,y];  //1 undeifined
}
//f() [1 undefined]; f( ,3) 报错; f(undefined, 1) [1,1]
//为了避免因为没有传入参数而出现报错的情况 一般把具有默认值的参数放在末尾

//默认值 undefined null
function foo(x=5, y=6){
    console.log(x,y);
}
foo(undefined, null);   //5 null => null  undeifned => 默认值

//函数的length属性 
(function(a){}).length //1
(function(a=5){}).length //0  指定了默认值后 .length属性返回的是没有指定默认值参数的个数
(function(a,b,c=5){}).length //2
//如果设置默认值的参数不是尾参数 那么.length属性也不再计入后面的参数了
(function(a=0, b, c){}).length  //0
(function(a,b=1,c){}).length  //1

//作用域 一旦设置了参数默认值 函数进行声明初始化时 参数会形成一个单独的作用域(context) 等到初始化结束 这个作用域就会消失 这种语法行为 在不设置参数默认值时 是不会出现的
var x = 1;
function f(x,y=x) {
    console.log(y);
}
f(2);   //2  x指向参数2 并不指向全局变量x 因为f()调用的时候生成了单独的作用域 这个单独的作用域 仅仅在()中 并不包括{}

var x = 1;
function f(x){
    console.log(x);  // x => undefined
}
//更多例子
function f(y=x){
    let x = 2;
    console.log(y);
}
f();   //ReferenceError: x is not defined
//y=x自己是一个作用域 并没有在{}或者全局的作用域里面 所以是访问不到let x = 2的
let x = 1;
f();  //1  这里为什么又能访问到了呢？因为全局变量是小作用域的外层作用域
//但是 这样写又会出错
var x = 1;
function f(x=x){
    console.log(x);
}
f();   //ReferenceError: x is not defined 为什么？因为x=x 实际上执行的是let x = x, let会有暂时性死区 参数形成单独作用域 无法访问全局的变量

//如果参数的默认值是一个函数 该函数的作用域也遵循这个规则 
let foo = 'outer';
function bar(func = () => foo){  //这里参数赋值默认值 形成了单独的作用域 这里的foo与bar函数里面的foo无关
    let foo = 'inner';
    console.log(func());
};
bar(); //outer
//为什么？函数bar的参数func是一个匿名函数 返回值是foo 函数参数所形成的单独作用域里面 并没有定义变量foo 所以这里函数里返回的的foo指向全局的foo

//更复杂的例子
var x = 1;
function foo(x, y = function(){x=2;}){
    var x = 3;
    y();  //x=2 但是 x在一个函数作用域里面
    console.log(x);
}
foo();  //3  执行y后 内部变量x和全局变量x的值都没有变 x所有的变化都在参数的单独作用域里面
//x => 1
//没有var的情况
var x = 1;
function foo(x, y = function(){x=2;}){
    x = 3;
    y();
    console.log(x);  //=>2
}
f();
//全局的x依然是1

//应用 
function throwIfMissing(){
    throw new Error('Missing Parameter');
}
function foo(mustBeProvided = throwIfMissing()){
    console.log(mustBeProvided + 1);  //= 等号前面那个才是参数
    return mustBeProvided;
}
foo()   //Error:Missing Parameter

//rest参数 
//ES6引入rest参数 用于获取函数的多余参数 这样就不需要使用arguments对象了 rest参数搭配的变量是一个数组 该变量将多余的参数放入数组中
function add(...values){  //rest的形式为 ...变量名
    let sum = 0;
    for(var val of values){
        sum += val;
    }
    return sum;
}
add(2,5,3);  //10

//rest参数代替arguments变量的例子
function sortNumbers(){  //argumenst 是一个类数组 必须使用 Array.prototype.slice.call()调用数组的原型方法
    return Array.prototype.slice.call(arguments).sort();
}
const sortNumbers = (...numbers) => numbers.sort();  //rest 本身就是一个真正的数组 所以可以直接调用.sort()

//rest 参数改写数组
function push(array, ...item){  //rest参数只能在最后一个 不然会报错
    items.forEach(function(item){
        array.push(item);
        console.log(item);
    });
}
var a = [];
push(a, 1, 2, 3);

//函数的length属性 不包括rest参数 rest参数无法被记入到length属性里面
(function(a){}).length //1
(function(...a){}).length //0
(function(a,...b){}).length  //1

//严格模式 ES6中 只要函数参数使用了默认值/解构赋值/或者扩展运算符 那么函数内部就不能显示设定为严格模式 否则会报错
function doSomething(a,b=a){
    'use strict';
// SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list
}
//这样设定的原因是 函数内部的严格模式 适用于函数体和函数参数 函数执行的时候 先执行参数 然后再执行函数体。这样就有一个不合理的地方 只有从函数体之中 才能直到是否应该以严格模式执行 但是参数却应该先于函数体执行
function doSomething(value = 070){  //如果参数是复杂的 就无法知道这里的执行模式是否是严格 因为严格模式定义在函数体中，它是后执行的
    'use strict';
    return value;
    //SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list
}
//解决方法
//1.在全局中设置use strict
//2.把函数包在一个无参数立即执行函数里面
const doSomething = (function(){
    'use strict'
    return function(value = 42){
        return value;
    }
}());

//name属性 用于返回该函数的函数名
function foo(){};
foo.name   //'foo'

//如果将一个不具名函数赋值给一个变量，则ES5 ES6 的name属性都会返回这个具名函数原本的名字
const bar = function baz();
bar.name //baz

//Function构造函数返回的函数实例 name属性的值为anonymous
(new Function).name   //'anonymous
//bind 返回的函数 name属性会加上bound前缀
function foo(){};
foo.bind({}).name //'bound foo'

(function(){}).bind({}).name   //'bound '

//箭头函数 =>
