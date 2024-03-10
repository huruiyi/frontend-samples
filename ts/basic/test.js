var a = 234;
console.log("1: " + a);
test();


a = 456;
console.log("2: " + a);
test();


function test() {
    console.log(a)
}

f = function () {
    return true;
};
g = function () {
    return false;
};
(function () {
    if (g) {
        f = function f() {
            return false;
        }

        function g() {
            return true;
        }
    }
})();
console.log([] == ![]);
console.log(g());
console.log(f());

console.log("***********************************");
console.log(typeof (null));      // object
console.log(typeof (undefined)); // undefined
console.log(typeof (NaN));       // number
console.log(NaN == undefined);   // false
console.log(NaN == NaN);         // false
var str = "123abc";
console.log(typeof (str++));     // number
console.log(str);                // NaN
console.log("***********************************");


function DateDemo() {
    var d = new Date();
    var s = "今天日期是：";

    s += d.getMonth() + 1 + "/";
    s += d.getDate() + "/";
    s += d.getYear();
    return s;
}

console.log(DateDemo());


for (i = 0, j = 0; i < 10, j < 6; i++, j++) {
    k = i + j;
    console.log(k)
}

console.log("***********************************");
var tt = 'aa';

function test() {
    console.log(tt);  //underfined;
    var tt = 'dd';
    console.log(tt);  //dd
}

test();
console.log("***********************************");
var myObject = {
    num: 2,
    add: function () {
        this.num = 3;
        (function () {
            console.log(this.num);  //underfined
            this.num = 4;
        })();
        console.log(this.num)   //3
    }
}

myObject.add();
console.log("***********************************");
//console.log(om == undefined);
console.log(typeof om == 'undefined');

console.log("***********************************");
(function () {
    console.log(om); // 显示 undefined
    var om = 'abc';
    console.log(om); // 显示 abc
})();

console.log("***********************************");

(function () {
    console.log(om); // 显示 undefined
    if (true) {
        var om = 'abc'; // 此处声明没有机会执行
    }
    console.log(om);
})();

console.log("***********************************");


var strEmpty = " Hello World ";

//去除所有空格:
var str1 = strEmpty.replace(/\s*/g, "");
console.log("[" + str1 + "]");

//去除两头空格:
var str2 = strEmpty.replace(/^\s*|\s*$/g, "");
console.log("[" + str2 + "]");

//去除左空格：
var str3 = strEmpty.replace(/^\s*/, "")
console.log("[" + str3 + "]");

//去除右空格：
var str4 = strEmpty.replace(/(\s*$)/g, "");
console.log("[" + str4 + "]");

var str5 = strEmpty.replace(/\s*/g, "");
console.log("[" + str5 + "]");
console.log("***********************************");

/*******************继承**************************/
function Person(name) {
    this.name = name;
}

Person.prototype.showName = function () {
    console.log(this.name);
};

function Worker(name, job) {
    Person.apply(this, arguments);
    this.job = job;
}

for (var i in Person.prototype) {
    Worker.prototype = Person.prototype;
}
new Worker('sl', 'coders').showName();
console.log("***********************************");
var str = '123胡锦涛';

console.log(getStrlen(str) + " " + str.length)

//求一个字符串的字节长度;
function getStrlen(str) {
    var json = {len: 0};
    var re = /[\u4e00-\u9fa5]/;
    for (var i = 0; i < str.length; i++) {
        if (re.test(str.charAt(i))) {
            json['len']++;
        }
    }
    return json['len'] + str.length;
}
