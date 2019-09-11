//async函数
//async函数就是Generator函数的语法糖
const fs = require(fs);
const readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if (error) return (error);
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
const asyncReadFile = async function () {
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
async function getStockPriceByName(name) {
    const symbol = await getStockSymbol(name);
    const stockPrice = await getStockPriceByName(symbol);
    return stockPrice;
}
getStockPriceByName('goog').then(function (result) {
    console.log(result);
});
//上面代码是一个获取股票报价的函数 函数前面的async关键字 表明该函数内部有异步操作 调用该函数时 会立即返回一个Promise对象

//下面一个例子 指定多少ms后输出一个值
function timeout(ms) {
    return new Promise((resolve) => {  //Promise对象会立即执行
        setTimeout(resolve, ms);
    });
}
async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}
asyncPrint('hello world', 50);  //value ms
//50ms后 输出'hello world'

//async函数有多种使用形式
//函数声明
async function foo() { }
//函数表达式
const foo = async function () { }
//对象的方法
let obj = { async foo() { } };
obj.foo().then(...)
//Class的方法
class Storage {
    constructor() {
        this.cachePromise = caches.open('avatars');
    }
    async getAvatar(name) {
        const cache = await this.cachePromise;
        return cache.match('/avatars/${name}.jpg');
    }
}
const storage = new Storage();
storage.getAvatar('jake').then(...);
//箭头函数
const foo = async () => { };
//方法和声明的区别在于没有function 直接来就是函数名(){}

//async函数的语法规则总体上比较简单 难点是错误处理的机制

//返回Promise对象 
//async函数返回一个Promise对象
//async函数内部return语句返回的值 会称为then方法回调函数的参数
async function f() {
    return 'hello world';
}
f().then(v => console.log(v));  //v => hello world

//async函数内部抛出错误 会导致返回的Promise对象变为reject状态 抛出错误对象会被catch方法回调函数接收到
async function f() {
    throw new Error('error!');
}
f().then(
    v => console.log(v),
    e => console.log(e)
)   //Error: error!

//Promise对象状态的变化
//async函数返回的Promise对象 必须等到内部所有await命令后面的Promise对象执行完 才会发生状态改变 除非遇到return语句或者抛出错误 也就是说 只有async函数内部的异步操作执行完 才会执行then方法指定的回调函数
async function getTitle(url) {
    let response = await fetch(url);
    let html = await response.text();
    return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
//上面代码中 函数getTitle内部有三个操作 抓取网页，取出文本，匹配页面标题 只有这三个操作全部完成 才会执行then方法里面的console.log

//await命令
//正常情况下 await命令后面是一个Promise对象 如果不是会转成一个立即resolve的Promise对象
async function f() {
    return await 123;
}
f().then(v => console.log(v))
//v 就是 f()返回的Promise对象 这里它已经resolved了

//await后面的Promise对象如果变成reject状态 则reject的参数会被catch方法的回调函数接收到 
async function f() {
    await Promise.reject('error!')
}
f().then(v => console.log(v).catch(e => console.log(e)));
//只要一个await语句后面的Promise变为reject 那么整个async函数都会中断执行
async function f() {
    await Promise.reject('error');
    await Promise.resolve('hello world');   //不会执行 前面已经中断了
}

//有时 我们希望即使前一个异步操作失败 也不要中断后面的异步操作 这时可以将第一个 await 放在try...catch结构里面 这样不管这个异步操作是否成功 第二个await都会执行
async function f() {
    try {
        await Promise.reject('error');
    } catch (e) {
        e => console.log(e)
    }
    return await Promise.resolve('hello world');
}
f().then(v => console.log(v));   //hello world
//另一种方法是在await后面的Promise对象后再跟一个catch方法 处理前面可能出现的错误sd
async function f() {
    await Promise.reject('error').catch(e => console.log(e));
    return await Promise.resolve('hello world!');
}
f().then(v => console.log(v));
// error
// hello world!

//错误处理 
//如果await后面的异步操作出错 那么等同于async函数返回的Promise对象被reject
async function f() {
    await new Promise(function (resolve, reject) {
        throw new Error('error!');
    });
}
f().then(v => console.log(v)).catch(e => console.log(e));  //Error: error!
//上面代码中 async函数f执行后 await后面的Promise对象会抛出一个错误对象 导致catch方法的回调函数被调用 它的参数就是抛出的错误对象 
//防止出错的方法 也是将其放在try...catch代码块中
async function f() {
    try {
        await new Promise(function (resolve, reject) {
            throw new Error('error!')
        });
    } catch (e) {
    }
    return await ('hello world!');
}
//如果有多个await 可以统一放在try...catch结构中
async function main() {
    try {
        const val1 = await firstStep();
        const val2 = await secondeStep(val1);
        const val3 = await thridStep(val1, val2);

        console.log('Final:', val3)
    } catch (err) {
        console.log(err);
    }
}

//下面的例子使用try...catch结构 实现多次重复尝试
const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
    let i;
    for (i = 0; i < NUM_RETRIES; i++) {
        try {
            await superagent.get('http://google.com/this-throws-an-error');
            break;
        } catch (err) {
        }
    }
    console.log(i);   //3
}
test();
//上面代码中 如果await操作成功 就会使用break语句退出训话 如果失败就会被catch语句捕捉 然后进入下一轮循环

//使用注意点
//前面已经说过 await命令后面的Promise对象 运行结果可能是rejected 所以最好把await命令放在try...catch代码块中
async function myFunction() {
    try {
        await somethingThatReturnsAPromise();
    } catch (err) {
        console.log(err);
    }
}
//第二点 多个await命令后面的异步操作 如果不存在继发关系 最好让它们能够同时触发
let foo = await getFoo();
let bar = await getBar();

//上面代码中 getFoo 和 getBar是两个独立的异步操作 被写成继发关系
let [foo, bar] = await Promise.all([getFoo(), getBar()]);
//这样就可以让foo, bar同时触发 缩短整个程序执行的时间

//await命令只能用在async函数中 如果用在普通函数 则会报错
async function dbFunc(db) {
    let docs = [{}, {}, {}];
}
//报错
docs.forEach(function (doc) {
    await db.post(db);
});

//如果确实希望多个请求并发执行 可以使用Promise.all方法 当三个请求都会resolved时 下面两种写法效果相同
async function dbFuc(db) {
    let doc = [{}, {}, {}];
    let promises = docs.map((doc) => db.post(doc));

    let results = await Promise.all(promises);
    console.log(results);
}
//或者
async function dbFunc(db) {
    let docs = [{}, {}, {}];
    let promises = docs.map((doc) => db.post(doc));

    let results = [];
    for (let promise of promises) {
        results.push(await promise);
    }
    console.log(results);
}

//async函数实现的原理
async function fn(args) {
    //...
}
//等同于
function fn(args) {
    return spawn(function* () {
        //...
    });
}
//所有的async函数都可以写成上面的第二种形式 其中的spawn函数就是自动执行器
//下面给出spawn函数的实现 基本就是前文自动执行器的翻版
function spawn(genF) {
    return new Promise(function (resolve, reject) {
        const gen = genF();
        function step(nextF) {
            let next;
            try {
                next = nextF();
            } catch (e) {
                return reject(e);
            }
            if (next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(function (v) {
                step(function () { return gen.next(v); });
            }, function (e) {
                step(function () { return gen.throw(e); });
            });
        }
        step(function () { return gen.next(undefined); });
    });
}

//与其他异步处理方式的比较
//async Promise Generator 
function chainAnimationsPromise(elem, animations){
    let ret = null;
    let p = Promise.resolve();
    for(let anim of animations){
        p = p.then(function(val){
            ret = val;
            retuen anim(elem);
        })
    }
    return p.catch(function(e){
        //...
    }).then(function(){
        return ret;
    });
}

//for await...of
//for...of循环用于遍历同步的Iterator接口 新引入的for await...of循环 则是用于遍历异步Iterator的接口
async function f(){
    for await(const x of createAsyncIterable(['a','b'])){
        console.log(x);  //a b
    }
}
//for await...of循环的一个用途 是部署了asyncIterable操作的异步接口 可以直接放入这个循环
//for await...of循环也可以用于同步遍历器
(async function(){
    for await(const x of ['a','b']){
        console.log(x);  //a  b
    }
})();   

//异步Generator函数


//yield* 语句 
//yield* 语句也可以跟一个异步遍历器
async function* gen1(){
    yield 'a';
    yield 'b';
    return 2;
}
async function* gen2(){
    const result = yield* gen1();
}
//上面代码中 gen2函数里面的result变量 最后值是2s
//跟同步Generator函数一样 for await...of循环会展开yield*














