//1.函数增加了函数参数的默认值
function add(a,b){
    a = a || 1;
    b = b || 1;
    return a + b;
}
function add(a,b = 1){
    a = a || 2;
    b = b || 2;
    return a + b;
}
console.log('add(1):', add(1));
console.log('add(1, undefined):', add(1, undefined));

//2.参数默认值是惰性求值的 默认值是用到的时候才会去求出具体值
let x = 1; 
function add(a,b = x){
    return a + b;
}
console.log('add(1):', add(1));  //2
x += 1;
console.log('add(1):', add(1));  //3

//3.参数默认值与解构赋值结合起来使用
function add({a,b =1}={}){
    return a + b;
}
console.log(add({a:3}));  //4
console.log('add():', add({}));

//4.尾参数定义了默认值是可以省略的 否则是不能调用传参
function add(a,b =9, c){
    return a + b + c;
}
add(1, undefined, 2);   //12
console.log(add(1, undefined, 2));
add(1, ,2);  //中间不能省略 会报错

function add(a ,b ,c = 9){
    return a + b + c;
}
add(2,3); //2 + 3 + 9

//5.函数的length属性 在定义了默认值后会失真
function add(a,b=9){
    return a + b;
}
console.log('add.length:', add.length);  //add.length = 1

//6.设置了函数的默认值 函数进行声明初始化时 参数会形成一个单独的作用域(context) 等到初始化结束，这个作用域会消失
let x = 1;
function add(a, b = x){
    let x = 2;
    console.log('b:',b)
}
add(1);  //1

//7. es6引入了rest参数(形式为...变量名) 用于获取函数的多余参数
function add(...nums){
    return nums.reduce((pre, cur, index) => {
        console.log('pre:',pre);
        console.log('cur:',cur);
        console.log('index:', index);
        return pre + cur;
    });
}
add(4,5,2);   //1
console.log('add(4,5,2):', add(4,5,2));

//8.函数的严格执行模式
//从ES5开始，函数内部可以设定为严格模式，ES2016做了一些修改，规定只有函数参数使用了默认值，解构赋值，或者扩展运算符
//那么函数内部就不能显示设定为严格模式，否则会报错

//9.函数的name属性 返回该函数的函数名
funtion add(a, b){
    return a + b;
}
console.log('add.name:', add.name);
const t = function(a,b){return a + b;};
console.log('t.name:',t.name);

//10.箭头函数的复习 箭头函数立即用 不能改变其this指向
const fun = function(a,b){return a + b};
const fun = (a,b) => a+b; //same
const fun2 = a => void console.log(a);  //void表示不需要返回值
const fun3 = () => {
    console.log(2);
    return 9;
};
const fun4 = () => ({a:1, b:2});

let arr = [3,9,2,1,212];
arr.sort((a,b)=>a-b);

//11.尾调用 尾函数
function b(){}

function add(){
    b();  //b()尾函数调用
}
function add(){
    return b()*3;   //b()尾函数 如果做了运算就不是尾函数和尾调用了
}
function add(){
    return b() + b(); //不是尾函数调用
}

//12.尾递归
function sum(num){
    if(num >= 1){
        return sum(num -1) + num; //效率低，容易超过最大嵌套调用值
    }else{
        return 1;
    }
}
console.log('sum(10):', sum(10));

let num =1000;
var sum = 0;
for(let i = 0; i <= num; i++){
    sum +=i;
}
console.log('sum:',sum);

//13.递归的优化，尾递归的优化 => 循环
function sum(num, total = 0){
    if(num > 0){
        return sum(num-1, total + num);
    }else{
        return total;
    }
}
console.log('sum(1000):', sum(1000));