var x = 1, y = z = 0;

function add(n) {
    n = n + 1;
}

y = add(x);

function add(n) {
    n = n + 3;
}

z = add(x);
console.log(x + " " +y + " " + z);
