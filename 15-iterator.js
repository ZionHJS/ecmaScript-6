//1.边利器(Iterator) 是一个遍历机制 它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
let s = {
    age:19, 
    name:'gppg'
}
for(let key of Object.key(s)){
    console.log('key:', key);
}   //not iterable
for(let values of Object.values(s)){
    console.log('values:', values);
}   //not iterable

for(let v of s){
    console.log('v:', v);
}   //not iterable

//可遍历对象要求 属性名必须是:Symbol.iterator 这个是内置的Symbol值

//第一步:自定义对象
let s = {
    data:[1,3,9,'gogole'],
    [Symbol.iterator](){
        let self = this;
        return{
            next(){
                //{val:any, done:boolean}
                //每次遍历 都要返回一个上面的对象
                if(self._index === undefined){
                    self._index = 0;
                }
                let t = {
                   value: self.data[self._index],
                   done: self._index === self.data.length - 1
                }
                self._index += 1;
                return t;
            }
        }
    }
}
for(let v of s){
    console.log('v:', v);
} 

//2.具备原生 iterator
//Array
//Map
//Set
//String
//TypedArray
//函数的arguments对象
//nodeList对象
console.log(Array.prototype[Symbol.iterator])
let arr = [1,3,9];
for(let val of arr){
    console.log('val:', val);
}

//3.伪数组部署遍历对象
let s = {
    0:1,
    1:'google',
    2:{},
    length:3,
    [Symbol.iterator]:Array.prototype[Symbol.iterator]
};
for(let val of s){
    console.log('val:', val)
}



