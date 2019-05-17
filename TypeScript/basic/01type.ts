let isDone: boolean = false;

let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
/******************************************************/

let name1: string = "bob";
name1 = "smith";


let name2: string = `Gene`;
let age: number = 37;
let sentence1: string = `Hello, my name is ${name2}.

I'll be ${age + 1} years old next month.`;

let sentence2: string = "Hello, my name is " + name2 + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month.";

/******************************************************/

let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
/******************************************************/

// Declare a tuple type
let x: [string, number];
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
enum Color1 {Red, Green, Blue}

let c1: Color1 = Color1.Green;
console.log(c1);

//2:
enum Color2 {Red = 1, Green = 2, Blue = 4}

let c2: Color2 = Color2.Green;
console.log(c2);

//3:
enum Color3 {Red = 1, Green, Blue}

let colorName: string = Color3[2];
console.log(colorName);  // 显示'Green'因为上面代码里它的值是2

/******************************************************/

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

let notSure1: any = 4;
//notSure1.ifItExists(); // okay, ifItExists might exist at runtime
//notSure1.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
//prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.


let list3: any[] = [1, true, "free"];
list3[1] = 100;
console.log(list3)


/******************************************************/

function warnUser(): void {
    console.log("This is my warning message");
}

function getAge(): number {
    return 1234;
}

let unusable: void = undefined;
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
/******************************************************/

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

/******************************************************/

/*object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
使用object类型，就可以更好的表示像Object.create这样的API。*/
declare function create(o: object | null): void;

create({prop: 0}); // OK
create(null); // OK

/*create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error*/

/******************************************************/
let someValue1: any = "this is a string";
let strLength1: number = (<string>someValue1).length;

let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;
//两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；
// 然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。
