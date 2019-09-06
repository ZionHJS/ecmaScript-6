//ES6的正则函数 第一个参数是正则对象 第二个参数是是指定修饰符
new RegExp(/abc/ig, 'i').flags   //i

//字符串的正则方法
//字符串对象共有4个方法 match() replace()  search() split()
// String.prototype.match 调用 RegExp.prototype[Symbol.match]
// String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
// String.prototype.search 调用 RegExp.prototype[Symbol.search]
// String.prototype.split 调用 RegExp.prototype[Symbol.split]

//u修饰符　
//ES6对正则表达式添加了u修饰符 含义为'Unicode'模式 
/^\uD83D/u.test('\uD83D\uDC2A') // false
/^\uD83D/.test('\uD83D\uDC2A') // true