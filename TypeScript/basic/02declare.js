console.log("Declare01........................");
var Declare01;
(function (Declare01) {
    var num1 = 10;
    function f() {
        var message = "Hello, world!";
        console.log(num1);
        return message;
    }
})(Declare01 || (Declare01 = {}));
console.log("Declare02........................");
var Declare02;
(function (Declare02) {
    function f() {
        var a = 10;
        return function g() {
            var b = a + 1;
            return b;
        };
    }
    var g = f();
    console.log(g()); // returns 11;
})(Declare02 || (Declare02 = {}));
console.log("Declare03........................");
var Declare03;
(function (Declare03) {
    function f() {
        var a = 1;
        a = 2;
        var b = g();
        console.log(b);
        a = 3;
        return b;
        function g() {
            return a;
        }
    }
    console.log(f()); // returns 2
})(Declare03 || (Declare03 = {}));
console.log("Declare04........................");
var Declare04;
(function (Declare04) {
    /*  变量 x是定义在*if语句里面*，但是我们却可以在语句的外面访问它。
        这是因为 var声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置
        被访问（我们后面会详细介绍），包含它的代码块对此没有什么影响。
        有些人称此为* var作用域或函数作用域*。 函数参数也使用函数作用域。*/
    function f(shouldInitialize) {
        if (shouldInitialize) {
            var x = 10;
        }
        return x;
    }
    console.log(f(true)); // returns '10'
    console.log(f(false)); // returns 'undefined'
})(Declare04 || (Declare04 = {}));
console.log("Declare05........................");
var Declare05;
(function (Declare05) {
    function sumMatrix(matrix) {
        var sum = 0;
        for (var i = 0; i < matrix.length; i++) {
            var currentRow = matrix[i];
            console.log(i + " " + matrix.length);
            for (var j = 0; j < currentRow.length; j++) {
                console.log("inner: " + j + " " + currentRow.length);
                sum += currentRow[j];
            }
        }
        return sum;
    }
    var arrs = [[1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4, 5]];
    var number = sumMatrix(arrs);
    console.log(number);
})(Declare05 || (Declare05 = {}));
console.log("Declare05-1........................");
var Declare05_1;
(function (Declare05_1) {
    function sumMatrix(matrix) {
        var sum = 0;
        for (var i = 0; i < matrix.length; i++) {
            var currentRow = matrix[i];
            console.log(i + " " + matrix.length);
            for (var i = 0; i < currentRow.length; i++) {
                console.log("inner: " + i + " " + currentRow.length);
                sum += currentRow[i];
            }
        }
        return sum;
    }
    var arrs = [[1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4, 5]];
    var number = sumMatrix(arrs);
    console.log(number);
})(Declare05_1 || (Declare05_1 = {}));
console.log("Declare06........................");
var Declare06;
(function (Declare06) {
    for (var i = 0; i < 10; i++) {
        setTimeout(function () {
            console.log(i);
        }, 100 * i);
    }
})(Declare06 || (Declare06 = {}));
