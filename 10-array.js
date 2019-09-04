//1.数组扩展运算符的应用
console.log('ss', 2, 3, 4);
let k = [1,2,4,9, 'asdfg'];
console.log(...k);

//替代函数的apply方法
let m = [1,9,22,29,19,2]; 
let max = Math.max.aplly(null, m);
console.log('max:', max);

let maxEs6 = Math.max(...m);
console.log('maxEs6:', maxEs6);

//2.rest参数的逆应用
function sum(...arr){
    return arr.reduce((pre,next) => pre + next);
}
console.log('sum(1,2,3,4):', sum(1,2,3,4));

let m = [2,9,8,22,19];
sum(...m);

//3.复制数组
let newArr3 = [...m];
console.log('newArr3:', newArr3);
let[...newArr4] = m;
console.log('newArr4:', newArr4);

//4.合并数组
let m = [2, 8, 'aa', 'google.com'];
let m2 = [2, 8, 'aa', 'google.com'];
let m3 = [2, 8, 'aa', 'google.com'];

let k = m.concat(m2, m3);
console.log('k:', k);
let n = [...m, ...m2, ...m3, 'google.com----'];

//5.字符串展开
let k = 'google.com';
console.log('[...k]:', [...k]);

//6.queryASelectorAll返回值的展开
let arr = [...document.querySelectorAll('li')];
let obj = {
    '0':'a',
    '1':'b',
    '2':'c',
    'length':'3'
};

let k = Array.from(obj);
console.log('typeof k :', typeof k);

//8.数组实例的find() 和 findIndex() 用于找出第一个符合条件的数组成员或者索引
let k = [2,9,10,222];

let m = k.find((val, index) => {
    console.log('index:', index);
    return val >= 10;
});
console.log('m:', m);

console.log('k.findIndex(val => val >= 10 :', k.findIndex(val => val>=10));

//9.数组实例的fill方法 填充一个数组
let k = new Array(10);
k.fill(3);
console.log('k:',k);

k.fill('a', 3, 8);
console.log('k:',k);

//fill方法可以接收第二个和第三个参数，用于指定填充的起始位置和结束位置

//10.数组实例的entries(), keys(), 和values()
let k = [1,2,3,4,5,6];
for(let key of k.keys()){
    console.log('key:', key);
}

for(var [key,val] of k.entries()){
    console.log('key:', key);
    console.log('val:', val);
}

//11.数组实例的includes()
let k = [2,9,9,12,222];
k.includes(2);
console.log('k.includes(2):', k.includes(2));
console.log('k.includes(20):', k.includes(2));
console.log('k.includes(NaN):', k.includes(2));












