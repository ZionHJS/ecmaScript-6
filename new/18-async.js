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






