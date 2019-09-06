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

