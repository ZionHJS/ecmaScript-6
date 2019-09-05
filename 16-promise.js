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
    resolve(p1);
});
p2.then(data => {
    console.log('p2:then');
    console.log('data:', data);
});





