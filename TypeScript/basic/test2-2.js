var x = 1, y = z = 0;

function add(n) {
    return n = n + 1;
}

y = add(x);

function add(n) {
    return n = n + 3;
}

z = add(x);
console.log(x + " " + y + " " + z);


var  obj ="12345";
console.log(typeof(obj) === "string");
console.log(typeof obj === "string");

obj.constructor === String
