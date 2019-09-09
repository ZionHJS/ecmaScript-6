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
 //Promise实例具有then() 其实then()是定义在Promise.prototype原型对象上的 
 //then()的作用为Promise实例添加状态改变时的回调函数 前面说过 then()的第一个参数是resolved状态的回调函数 第二个参数是rejected状态的回调函数 
 
 //then()返回的是一个新的Promise实例 因此可以采用链式写法编程
 getJSON('/post.json').then(function(json){
     return json.post;
 }).then(function(post){
     //...
 });
 //上面连续调用了两个then 第一个then的回调函数结果返回到第二个then作为参数
 
 //采用链式的then 可以指定一组按照次序调用的回调函数 这时前一个回调函数 有可能返回的还是一个Promise对象 这时后一个回调函数 就会等待该Promise对象的状态发生变 才会被调用
 getJSON('/post.json').then(function(post){
     return getJSON(post.commentURL);
 }).then(function funcA(comments){
     console.log('resolved', comments);
 },function funcB(err){
     console.log('rejected:', err)
 });
 //这里第一个then方法指定的回调函数返回一个Promise对象 这是第二个then方法的回调函数会登台这个新的Promise对象的状态发生变 才决定调用哪个参数函数

 //Promise.prototype.catch() === .then(null, rejection) 用于指定发生错误时的回调函数
 getJSON('/post.json').then(function(posts){
     //...
 }).catch(function(err){
     //处理getJSON 和 前一个回调函数运行时发生的错误
     console.log('error happened', error);
 });
 //上面的代码中 getJSON方法返回一个Promise对象 如果该对象状态变为resolved 则会调用then方法指定的回调函数 如果异步抛出错误 状态就变为rejected 就会调用catch方法指定的回调 
 //另外then方法里面的错误 也会被catch方法捕捉到
 P.then((val)=>console.log('fulfiled:', val)).catch((err)=>console.log('rejected',err));

 //下一个例子
 const promise = new Promise(function(resolve, reject) {
    throw new Error('test');
  });
  promise.catch(function(error) {
    console.log(error);
  });
  //reject方法的作用 等同与抛出错误
  
  //如果Promise状态已经变为resolved 再抛出错误是无效的 为什么?因为状态已经凝固了

  //Promise对象的错误具有“冒泡”性质 会一直向后传递 直到被捕为止 也就是说错误总是会被下一个catch语句捕获
  getJSON('/post/1.json').then(function(post){
      return getJSON(post.commentURL);
  }).then(function(comments){
      //...
  }).catch(function(error){
      //处理前面三个Promise发生的错误
  });
  //上面三Promise对象 任何一个产生错误都会被catch捕获
  //一般来说不建议使用then的第二个参数来设定reject的回调函数 直接在最后用catch就好

  //如果没有在外面设置catch那么Promisen内部的错误就不会传递到外面 通俗的说Promise会吃掉错误

  //一般总是建议Promise后面跟catch方法 这样可以处理Promise内部发生的错误 catch方法返回的还是一个Promise对象 因此后面还可以接着调用then方法
  const someAsyncThing = function(){
      return new Promise(function(resolve, reject){
          resolve(x + 2);
      });
  };
  someAsyncThing().catch(function(error){
      console.log('oh no', error);
  }).then(function(){
      console.log('carry on');
  });
  //oh no [ReferenceError: x is not defined]
  //carry on 
  //上面代码 运行完报错的catch 接着运行then()
  
  //catch方法之中 还能再抛出错误
  const someAsyncThing = function(){
      return new Promise(function(resolve, reject){
          resolve(x + 2);
      });
  };
  someAsyncThing().then(function(){
      return someAsyncThing();
  }).catch(function(error){
      console.log('oh no', error);
      y + 2;  //y没有被定义 但是后面没有办法捕获这个错误
  }).then(function(){
      console.log('carry on')  //由于有错误没有被捕获到 所以这里的代码不会运行
  });
  //oh no [ReferenceError: x is not defined]
  //上面代码中catch里面抛出了一个错误 因为后面没有别的catch方法了 导致这个错误不会被捕获 也不会传递到外层 如果改写一下 就不一样了
  someAsyncThing().then(function(){
      return someOtherAsyncThing();
  }).catch(function(error){
      console.log('oh no', error);
      y + 2;
  }).catch(function(error){
      console.log('carry on', error)
  });
  // oh no [ReferenceError: x is not defined]
  // carry on [ReferenceError: y is not defined]
  //上面代码第二个catch捕获了前面的错误 代码运行到了最后

  Promise.prototype.finally()
  //finally方法用于指定不管Promise对象最后的状态如何 都会执行的操作 
  Promise.then(result => {...}).catch(error => {...}).finally(() => {...});
  //这里不管Promise最后的状态 在执行完then和catch指定的回调函数以后 都会执行finally方法指定的回调函数
  //下面是一个例子 服务器使用Promise处理请求 然后使用finally方法关掉服务器
  server.listen(port).then(function(){...}).finally(server.stop);
  
  //finally方法的回调函数不接收任何参数 这意味着没有办法直到 前面的Promise状态到底是fulffilled还是rejected 这表明finally方法里面的操作 与状态无关 不依赖Promise的执行结果

  //finally本质上还是then方法的特例
  Promise.finally(() => {
      //...
  });
  //等同于
  Promise.then(result => {
      //...
      return result;
  }),
  error => {
      //...
      throw error;
  }
  //上面代码中finally简化了操作
  

  //Promise.all()
  //Promise.all方法用于将多个Promise实例 包装成一个新的Promise实例
  const p = Promise.all([p1, p2, p3]);
  //上面代码 Promise.all方法接收一个数组作为参数 p1,p2,p3都是Promise实例 如果不是 就会先调用下面讲到的Promise.resolve方法 将参数转为Promise实例 再进一步处理
  //p的状态由 p1, p2, p3公共决定 
  //1.只有当p1,p2,p3状态都是fulfilled p的状态才是fulfilled  此时p1,p2,p3的返回值组成一个数组 传给p的回调函数 
  //2.只要p1,p2,p3之中有一个被reject p的状态就是reject 此时被第一个reject的实例的返回值 会传递给p的回调函数
  const promises = [2,3,5,7,11,13].map(function(id){
      return getJSON('/post/'+id+'json');
  });
  Promise.all(promises).then(function(posts){
      //...
  }).catch(function(reason){
      //...
  });
  //上面代码 promises是包含6个Promise实例的数组 只有这6个实例的状态都编程fulfilled 或者其中有一个变为rejected 才会调用Promise.all方法后面的回调函数
  
  //如果作为参数的Promise实例 自己定义了catch方法 那么它一旦被rejected 并不会触发Promise.all()的catch方法
  const p1 = new Promise((resolve, reject) => {
      resolve('hello');
  }).then(result => result).catch(e => e);
  const p2 = new Promise((resolve, reject) => {
      throw new Error('error')
  }).then(result => result).catch(e => e);

  Promise.all([p1, p2]).then(result => console.log(result)).catch(e => console.log(e));   //['hello', Error: error]
  //这里 p1 会resolve p2首先会rejected 但是p2有自己的catch方法 该方法返回一个新的Promise实例 p2指向的实际上是这个实例 该实例执行完catch方法之后 也会变成resolved 导致Promise.all()方法参数里面的两个实例都会resolved 因此调用then方法指定的回调函数 而不会调用catch方法指定的回调函数
  //如果p2没有自己的catch方法 就会调用Promise.all()的catch方法
  
  //Promise.race() 方法同样是将多个Promise实例 包装成一个新的Promise实例
  const p = Promise.trace([p1, p2, p3]);
  //上面代码中 只要p1, p2, p3之中有一个实例率先改变 p的状态就跟着改变 那个率先改变的Promise实例的返回值 就传递给p的回调函数
  //Promise.race方法的参数与Promise.all方法一样 如果不是Promise实例 就会先调用下面讲到的Promise.resolve方法 将参数转为Promise实例 再进一步处理
  const p = Promise.race([  
      fetch('/resource-that-mahy-take-a-while'),
      new Promise(function(resolve, reject){
          setTimeout(() => reject(new Error('request timeout')),5000)
      })
    ]);
    p.then(console.log).catch(console.error);
    //上面代码中 如果5秒内fetch方法无法返回结果 变量p的状态就会变为rejected 从而触发catch方法指定的回调函数
    
    //Promise.resolve()
    //有时需要将现有对象转为Promise对象 Promise.resolve方法就起到这个作用
    const jsPromise = Promise.resolve($.ajax('/whatever.json'));
    //Promise.resolve等同于下面的写法
    Promise.resolve('foo')
    //等价于
    new Promise(resolve => resolve('foo'))
    
    //Promise.resolve方法的参数分为下面的四种情况
    //参数是Promise实例 / 参数是thenable对象 / 参数不具有then方法的对象 或根本就不是对象 / 不带有任何参数

    //Promise.reject() 方法也会返回一个新的Promise实例 该实例的状态为rejected
    const p = Promise.reject('error');
    //等同于
    const p = new Promise((resolve, reject) => reject('error'))

    p.then(null, function(s){
        console.log(s)
    });   //error
    //上面的代码生成一个Promise对象实例p 状态为rejected 回调函数会立即执行
    
    //Promise.reject()方法的参数 会原封不动作为reject的理由 变成后续方法的参数 这一点与Promise.resolvd方法不一致
    const thenable = {
        then(resolve, reject){
            reject('error');
        }
    };
    Promise.reject(thenable).catch(e => {
        console.log(e === thenable)
    });   //true
    //上面代码中 Promise.reject方法的参数是一个thenable对象 执行以后 后面的catch方法的参数不是reject抛出的'error'这个字符串 而是thenable对象
    
    //Promise的应用
    //加载图片 我们可以将图片的加载写成一个Promise 一旦加载完成 Promise的状态就会发生改变
    const preloadImage = function(path){
        return new Promise(function(resolve, reject){
            const image = new Image();
            image.onload = resolve;
            image.onerror = reject;
            image.src = path;
        });
    };


    //Generator函数与Promise的结合
    //使用Generator函数管理流程 遇到异步操作的时候 通常会返回一个Promise对象
    function getFoo(){
        return new Promise(function(resolve, rejection){
            return ('foo');
        });
    }
    const g = function* (){
        try{
            const foo = yield getFoo();
            console.log(foo);
        }catch(e){
            console.log(e);
        }
    };

    function fun(generator){
        const it = generator();
        function go(result){
            if(result.done) return result.value;
             return result.value.then(function(value){
                 return go(it.next(value));
             },function(error){
                 return go(it.throw(error));
             });
        }
        go(it.next())
    }
    run(g);