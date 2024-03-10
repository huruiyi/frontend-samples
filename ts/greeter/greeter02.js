var greeter02;
(function (greeter02) {
    function greeter(person) {
        return "Hello, " + person;
    }
    var user = [0, 1, 2];
    //error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
    //document.body.innerHTML = greeter(user);
})(greeter02 || (greeter02 = {}));
//# sourceMappingURL=greeter02.js.map