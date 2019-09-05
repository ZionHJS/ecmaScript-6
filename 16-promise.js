//1. promise 简单来说就是一个容器 里面保存着某个未来才会结束的事件的结果
//promise对象代表一个异步操作 有三种状态:pending, fullfilled(已成功 也称resolved) 和 rejected
let p = new Promise((resolve, reject) => {
    try{
        console.log('started execute Promise-Code');
        throw new Error('unexpected msg!');  //自定义报错
        setTimeout(() => {
            //写一些 处理逻辑的代码
            resolve(123);   //处理事件，任务 如果成功 直接调用resolve
        }, 1000);
    }catch(e){
        reject(e);   //把当前的promise状态改成fail
    }
});
p.then(data => {
    console.log('data:', data);
}).catch(error => console.log('error:', error));
console.log('done');

//2.构建一个promise对象 

//3.promise实例生成以后 可以用then方法分别指定resolved状态和rejected状态的回调函数 

//then方法可以接收两个回调函数作为参数 第一个回调:Promise对象状态变为resolved时调用 第二个回调:Promise对象的状态reject时候调用
const fs = require('fs');
const path = require('path');

let p2 = new Promise((resolve, reject) => {
    console.log('execute Promise Initialization');
    //读取05-strings.js文件内容
    let fileData = fs.readFileSync(path.join(__dirname,'05-strings.js'), 'utf8');
    resolve(fileData);
});
p2.then(data => {
    console.log('data:', data);
    return{data, time:Data.now()}
}).then(data => console.log(data));

//5.resolve函数的参数除了正常的值以后 还可以是另外一个promise实例，那么resolve会等等Promise实例返回结果后再执行resolve状态改变
let p1 = new Promise((resolve, reject) => {
    console.log('p1 initialized');
    setTimeout(() => {
        resolve(123);
    },2000);
});
p1.then(data => {
    console.log('p1:then');
    console.log('data:', data);
});
let p2 = new Promise((resolve, reject) => {
    console.log('p2 initialized');
    resolve(p1);   //如果resolve传入的是一个promise 那么必须等待Promise执行完成后 then完之后 才能改变当前Promise的状态
});
p2.then(data => {
    console.log('p2:then');
    console.log('data:', data);
});


//6.then方法返回一个新的promise 所以可以进行可链式编程
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100);  
    }, 2000);
});

p1.then(data => {
    return 10;
}).then(data =>{
    console.log('data:', data);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(3);
        }, 2000)
    });
}).then(data => {
    console.log('data:', data);
}).catch(er => console.log(er))
.finally(() => {
    console.log('sss');   //无论如何都会执行的代码
})

//7.then前一个回调函数 有可能返回的还是一个Promise对象 这时后一个回调函数 就会等待该Promise对象的状态发生变化 才会被调用 


//9.finally 方法用于指定不管Promise对象最后的状态如何 都会执行操作 ES2018引入标准

//10.Promise.all 用于多个Promise实例 包装陈个一个新的Promise实例
//所有的子Promise全部为Resolved状态 则它就是Resolved 其中一个Rejevted那么就直接Rejected
//then的参数是 所有子Promise的结果的组成的数组

Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(), Promise.reject(new Error('our fault!'))])
.then(data => console.log(data))
.catch(error => console.log(error));

//11.Promise.race方法同样是将多个Promise实例 包装成一个新的Promise实例
Promise.race([new Promise(resolve => {
    setTimeout(() => {
        resolve(1);
    },1000)
}), Promise.resolve(2), Promise.reject(3)]).then(data => console.log(data)).catch(e => console.log(e));

//12.Promise.resolve(),现有对象转为Promise对象
//[1]参数是一个Promise实例
//[2]参数是一个thenable对象，具有then方法的对象，然后就立即执行
Promise.resolve({
    then(resolve, reject){
        resolve(32);
    }
}).then(data => console.log(32));
Promise.resolve('ssss');

//13.Promise.reject()






