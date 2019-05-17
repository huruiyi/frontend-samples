var arr = [1, 2, 43];
var json1 = {a: 6, b: 4, c: [1, 2, 3]};
var str = 'sdfsdf';

var json2 = clone(json1);

json1['c'] = [3, 4, 5];

console.log(json1);
console.log(json2);

function clone(obj) {
    var oNew = new obj.constructor(obj.valueOf());
    if (obj.constructor == Object) {
        for (var i in obj) {
            oNew[i] = obj[i];
            if (typeof (oNew[i]) == 'object') {
                clone(oNew[i]);
            }
        }
    }
    return oNew;
}

/*
 * 16.浏览器标准模式和怪异模式之间的区别是什么？
 盒模型解释不同

 17.闭包
 子函数能被外部调用到，则该作用连上的所有变量都会被保存下来。

 18.请解释什么是Javascript的模块模式，并举出实用实例。
 js模块化mvc（数据层、表现层、控制层）
 seajs
 命名空间

 19.你如何组织自己的代码？是使用模块模式，还是使用经典继承的方法？
 对内：模块模式
 对外：继承

 20.你如何优化自己的代码？
 代码重用
 避免全局变量（命名空间，封闭空间，模块化mvc..）
 拆分函数避免函数过于臃肿
 注释

 21.你能解释一下JavaScript中的继承是如何工作的吗？
 子构造函数中执行父构造函数，并用call\apply改变this
 克隆父构造函数原型上的方法

 22.请尽可能详尽的解释AJAX的工作原理。
 创建ajax对象（XMLHttpRequest/ActiveXObject(Microsoft.XMLHttp)）
 判断数据传输方式(GET/POST)
 打开链接 open()
 发送 send()
 当ajax对象完成第四步（onreadystatechange）数据接收完成，判断http响应状态（status）200-300之间或者304（缓存）执行回调函数
 */
/
