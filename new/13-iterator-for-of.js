//遍历器 iterator 是一种接口 为各种不同的数据提供一个简单的访问接口 而且使得数据结构的成员能够按某种次序排列 iterator接口主要提供给for...of循环使用

//iterator的遍历过程如下
//1.创建一个指针对象 指向当前数据结构的起始位置 也就是说iterator本质上是一个指针对象
//2.第一次调用指针对象的next方法 会将指针指向数据结构的第一个成员
//3.第二次调用指针对象的next方法 指针就指向数据结构的第二个成员
//4.不断调用指针对象的next方法 直到它指向数据结构的结束位置

//总之 调用对象的next方法 就可以遍历事先给定的数据结构
//下面是一个无限遍历器对象的列子
var it = idMaker();
it.next().value  //0
it.next().value  //1
it.next().value  //2

function idMaker(){
    var index = 0;
    return {
        next:function(){
            return{value:index++, done:false};
        }
    };
}
//上面例子中 遍历器生成函数idMaker 返回一个遍历器对象 但是没有对应的数据结构 或者说遍历器对象自己描述了一个数据结构出来
