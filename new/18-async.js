//async函数
//async函数就是Generator函数的语法糖
const fs = require(fs);
const readFile = function(fileName){
    return new Promise(function(resolve, reject){
        fs.readFile(fileName, function(error, data){
            if(error) return (error);
            resolve(data);
        });
    });
};
const gen = function* () {
    const f1 = yield readFile('/etc/fstab');
    const f2 = yield readFile('/etc/shells');
    console.log(f1.toString);
    console.log(f2.toString);
}
//写成async函数就是下面这样
const asyncReadFile = async function(){
    const f1 = await readFile('/etc/fastab');
    const f2 = await readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};
//一比较就会发现 async函数就是将Generator函数的*替换成async yield替换成await而已

//async函数对Generator函数的改进 主要体现在下面四点
//1.内置执行器
//Generator函数的执行必须靠执行器 所以才有co模块 而async函数自带执行器 也就是说async函数的执行与普通函数一样只要一行
//asyncReadFile();
//这完全不像Generator函数需要调用next()方法 或者 co模块才能真正执行 
//2.更好的语意
//async和await 比起*和yield 语意更清楚了 async表示函数里有异步操作 await表示紧跟在后面的表达式需要等待结果
//3.更广的适用性
//co模块约定 yield命令后面只能是Thunk函数或Promise对象 而async函数的await命令后面 可以是Promise对象和原始类型的值
//4.返回值是Promise
//async函数的返回值是Promise对象 这比Generator函数的返回值是Iterator对象方便多了 可以用then指定下一步操作
//进一步说async函数完全可以看作多个异步操作 包装成一个Promise对象 而await命令就是内部then命令的语法糖


//基本用法
//async函数返回一个Promise对象 可以使用then方法添加回调函数 当函数执行的时候 一旦遇到await就会先返回 等待异步操作完成 再接着执行函数体内后面的语句
async function getStockPriceByName(name){
    const symbol = await getStockSymbol(name);
    const stockPrice = await getStockPriceByName(symbol);
    return stockPrice;
}
getStockPriceByName('goog').then(function(result){
    console.log(result);
});
//上面代码是一个获取股票报价的函数 函数前面的async关键字 表明该函数内部有异步操作 调用该函数时 会立即返回一个Promise对象

//下面一个例子 指定多少ms后输出一个值
function timeout(ms){
    return new Promise((resolve) => {  //Promise对象会立即执行
        setTimeout(resolve, ms);
    });
}
async function asyncPrint(value, ms){
    await timeout(ms);  
    console.log(value);
}
asyncPrint('hello world', 50);  //value ms
//50ms后 输出'hello world'

//async函数有多种使用形式
//函数声明
async function foo(){}
//函数表达式
const foo = async function(){}
//对象的方法
let obj = {async foo(){}};  
obj.foo().then(...)
//Class的方法
class Storage{
    constructor(){
        this.cachePromise = caches.open('avatars');
    }
    async getAvatar(name){ 
        const cache = await this.cachePromise;
        return cache.match('/avatars/${name}.jpg');
    }
}
const storage = new Storage();
storage.getAvatar('jake').then(...);
//箭头函数
const foo = async()=>{};
//方法和声明的区别在于没有function 直接来就是函数名(){}

//async函数的语法规则总体上比较简单 难点是错误处理的机制

//返回Promise对象 
//async函数返回一个Promise对象
//async函数内部return语句返回的值 会称为then方法回调函数的参数
async function f(){
    return 'hello world';
}
f().then(v => console.log(v));  //v => hello world

//async函数内部抛出错误 会导致返回的Promise对象变为reject状态 抛出错误对象会被catch方法回调函数接收到
async function f(){
    throw new Error('error!');
}
f().then(
    v => console.log(v),
    e => console.log(e)
)   //Error: error!

//Promise对象状态的变化
//async函数返回的Promise对象 必须等到内部所有await命令后面的Promise对象执行完 才会发生状态改变 除非遇到return语句或者抛出错误 也就是说 只有async函数内部的异步操作执行完 才会执行then方法指定的回调函数
async function getTitle(url){
    let response = await fetch(url);
    let html = await response.text();
    return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
//上面代码中 函数getTitle内部有三个操作 抓取网页，取出文本，匹配页面标题 只有这三个操作全部完成 才会执行then方法里面的console.log




