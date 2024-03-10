var isDone = false;
var decLiteral = 6;
var hexLiteral = 0xf00d;
var binaryLiteral = 10;
var octalLiteral = 484;
/******************************************************/
var name1 = "bob";
name1 = "smith";
var name2 = "Gene";
var age = 37;
var sentence1 = "Hello, my name is " + name2 + ".\n\nI'll be " + (age + 1) + " years old next month.";
var sentence2 = "Hello, my name is " + name2 + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month.";
/******************************************************/
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
/******************************************************/
// Declare a tuple type
var x;
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
//x = [10, 'hello']; // Error
console.log(x[0].substr(1)); // OK
//console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
x[0] = 'world'; // OK, 字符串可以赋值给(string | number)类型
console.log(x[1].toString()); // OK, 'string' 和 'number' 都有 toString
//x[1] = true; // Error, 布尔不是(string | number)类型
/******************************************************/
//1:
var Color1;
(function (Color1) {
    Color1[Color1["Red"] = 0] = "Red";
    Color1[Color1["Green"] = 1] = "Green";
    Color1[Color1["Blue"] = 2] = "Blue";
})(Color1 || (Color1 = {}));
var c1 = Color1.Green;
console.log(c1);
//2:
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 1] = "Red";
    Color2[Color2["Green"] = 2] = "Green";
    Color2[Color2["Blue"] = 4] = "Blue";
})(Color2 || (Color2 = {}));
var c2 = Color2.Green;
console.log(c2);
//3:
var Color3;
(function (Color3) {
    Color3[Color3["Red"] = 1] = "Red";
    Color3[Color3["Green"] = 2] = "Green";
    Color3[Color3["Blue"] = 3] = "Blue";
})(Color3 || (Color3 = {}));
var colorName = Color3[2];
console.log(colorName); // 显示'Green'因为上面代码里它的值是2
/******************************************************/
var notSure = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
var notSure1 = 4;
//notSure1.ifItExists(); // okay, ifItExists might exist at runtime
//notSure1.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
var prettySure = 4;
//prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
var list3 = [1, true, "free"];
list3[1] = 100;
console.log(list3);
/******************************************************/
function warnUser() {
    console.log("This is my warning message");
}
function getAge() {
    return 1234;
}
var unusable = undefined;
// Not much else we can assign to these variables!
var u = undefined;
var n = null;
/******************************************************/
// 返回never的函数必须存在无法达到的终点
function error(message) {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
    while (true) {
    }
}
create({ prop: 0 }); // OK
create(null); // OK
/*create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error*/
/******************************************************/
var someValue1 = "this is a string";
var strLength1 = someValue1.length;
var someValue2 = "this is a string";
var strLength2 = someValue2.length;
//两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；
// 然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。
