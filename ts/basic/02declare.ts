console.log("Declare01........................")
namespace Declare01 {
    const num1 = 10;

    function f() {
        const message = "Hello, world!";
        console.log(num1);
        return message;
    }
}

console.log("Declare02........................")
namespace Declare02 {
    function f() {
        const a = 10;
        return function g() {
            const b = a + 1;
            return b;
        }
    }

    const g = f();
    console.log(g()); // returns 11;

}

console.log("Declare03........................")
namespace Declare03 {
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
}

console.log("Declare04........................")
namespace Declare04 {

    /*  变量 x是定义在*if语句里面*，但是我们却可以在语句的外面访问它。
        这是因为 var声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置
        被访问（我们后面会详细介绍），包含它的代码块对此没有什么影响。
        有些人称此为* var作用域或函数作用域*。 函数参数也使用函数作用域。*/
    function f(shouldInitialize: boolean) {
        if (shouldInitialize) {
            var x = 10;
        }
        return x;
    }

    console.log(f(true));  // returns '10'
    console.log(f(false)); // returns 'undefined'
}

console.log("Declare05........................")
namespace Declare05 {
    function sumMatrix(matrix: number[][]) {
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
    console.log(number)
}

console.log("Declare05-1........................")
namespace Declare05_1 {
    function sumMatrix(matrix: number[][]) {
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
    console.log(number)
}


console.log("Declare06........................")
namespace Declare06 {
    for (var i = 0; i < 10; i++) {
        setTimeout(function () {
            console.log(i);
        }, 100 * i);
    }
}
