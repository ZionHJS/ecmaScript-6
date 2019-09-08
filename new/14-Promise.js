//Promise对象
//Promise是异步变成的一种解决方案 比传统解决方案 回调函数事件 更合理强大 
//所谓Promise简单来说就是一个容器 里面保存着某个未来才会结束的事件的结果 通常是一个异步操作 从语法上来说Promise是一个对象 从它可以获取异步操作的消息 Promise提供统一的 API 各种异步操作都可以用同样的方法进行处理

//Promise对象的特点 
//1.对象的状态不受外界的影响  Promise对象代表一个异步操作 有三种状态pending,fullfiled rejected  只有异步操作的结果 可以决定当前是哪一种状态 任何其他操作都无法改变这个状态 这也是 Promise名字的由来
//2.一旦状态改变了 就不会再变 当状态从pending fullfiled rejected切换改变后 状态就凝固了 一直保持这种结果 这时称为已定型solved 如果状态定型了 再对Promise对象添加回调函数 也会理解是的得到这个结果
//与事件event不同的是 当错过了事件 再去监听时 是得不到结果的
// resolved == fullfiled 不包含rejected

//有了Promise对象 就可以将异步操作以同步操作的流程表达出来 避免了层层嵌套的回调函数 Promise对象提供统一接口 使得控制异步操作更加容易

//Promise的缺点 无法取消Promise 一旦创建就会立即执行 如果不设置回调函数 Promise内部的错误就无法抛到外面 pending状态时无法获得状态的信息 是刚刚开始还是已经完成

//Promise对象是一个构造函数 用来生成 Promise实例 
const Promise = new Promise(function(resolved, reject){
    if(/*Asynchronous operation succeeded*/){
        resolved(value);
    }else{
        rejected(error);
    }
});
//Promise构造函数接收一个函数作为参数 该函数的两个参数分别是resolved 和rejected 它们是两个函数 由JavaScript引擎提供 不由自己部署
//resolved函数的作用是 将Promise对象的状态从未完成变为成功 (pending变为resolved) 在异步操作成功时调用 并将异步操作的结果 作为参数传递出去 rejected同理相反

//Promise实例生成后 可以用then分别指定resolved和rejected状态的回调函数
Promise.then(function(value){   //value resolved 时的状态
    //success
}, function(error){   //error时的状态
    //faillure
});

//then方法接收两个回调函数作为参数 第一个回调函数是Promise对象的状态变为resolved时调用 第二个回调函数是Promise对象的状态变为rejected时调用 第二个参数是可选的 这两个函数都接收Promise对象传出的值作为参数
function timeout(ms){
    return new Promise((resolved, reject) => {
        setTimeout(resolved, ms, 'done');
    });
}
timeout(100).then((value)=>{
    console.log(value);
});
//这里timeout返回一个Promise实例 表示一段事件以后才会发生的结果 过了指定的时间(ms) Promise实例状态变为resolved 就会触发then方法绑定的回调函数

//Promise新建后就会立即执行
let promise = new Promise(function(resolved, reject){
    console.log('Promise');  //Promise
    resolved();
});
promise.then(function(){
    console.log('resolved'); //resolved
});
console.log('Hi!'); //Hi
//上面代码中Promise新建后执行 所以首选输出的是Promise 然后then方法指定回调函数将在当前脚本中所有同步任务执行完才会执行 所以resolved最后输出

//异步加载图片的例子
function loadImageAsync(url){
    return new Promise(function(resolved, reject){
        const image = new Image();

        image.onload = function(){
            resolved(image);
        };
        image.onerror = function(){
            reject(new Error('Could not load image at' + url))
        };
        image.src = url;
    });
}

//用Promise实现Ajax操作的例子
const getJSON = function(url){
    const promise = new Promise(function(resolved, reject){
        const handler = function(){
            if(this.readyState !== 4){
                return;
            }
            if(this.status === 200){
                resolved(this.response);
            }else{
                reject(new Error(this.statusText));
            }
        };
        const client = new XHMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application/json');
        client.send();
    });
    return promise;
}
getJSON('/post.json').then(function(json){
    console.log('Contents:' + json);
},function(error){
    console.log('error happened:', error)
});
//上面代码中 getJSON是对XMLHttpRequest对象的封装 用于发出一个针对JSON数据的HTTP请求 并且返回一个Promise对象 在gerJSON内部 resolve函数和reject函数调用时都带有参数

//如果调用resolve和reject函数时带有参数 那么它们的参数会被传递给回调函数 reject函数的参数通常是Error对象的实例 表示抛出错误 resolve函数的参数除了正常值以外还可能是另一个Promise实例
const p1 = new Promise(function(resolved, reject){
    //...
});
const p2 = new Promise(function(resolved, reject){
    //...
    resolved(p1);
});
//这里p1做为参数传递给了p2的resolved() 即一个异步操作的结果是另一个异步操作的参数 
//这时 p1的状态会传递给p2 也就是说p1的状态决定了p2的状态 如果p2的状态是pending 那么p2的回调函数就会等待p1的状态改变 如果p2的状态已经是resolved或者rejected那么p2的回调函数立即执行
const p1 = new Promise(function(resolve, reject){
    setTimeout(()=>reject(new Error('fail')), 3000)
})
const p2 = new Promise(function(resolve, reject){
    setTimeout(() => resolve(p1), 1000)
})
p2.then(result => console.log(result)).catch(error => console.log(error));   //Error:fail
//这个例子中p1 3000之后变成reject p2 1000之后发生状态改变 resolve方法返回的是p1. 由于p2返回的是另一个Promise 导致p2自己的状态无效了。由p1状态决定p2的状态 所以 后面的then语句都变成针对后者p1
//又过了2000 p1变成了reject 导致触发catch方法执行的回调函数

//resolve和reject并不会中介Promise的参数函数执行
 new Promise((resolve, reject) => {
     resolve(1);
     console.log(2);  //2 resolve并没有终结参数函数的执行
 }).then(r => {
     console.log(r);  //1 
 });  

 //一般来说调用resolve或reject之后 Promise的属性就完成了 后继操作就应该放到then方法里面 而不应该写在resolve或reject后面 所以最好在它们前面加上return语句 这样就不会发生意外
 new Promise((resolve, reject) => {
     return resolve(1);
     //后的语句不会执行
     console.log(2);
 })

 //Promise.prototype.then()
 //
 

