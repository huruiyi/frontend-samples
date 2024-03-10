var greeter01;
(function (greeter01) {
    function greeter(person) {
        return "Hello, " + person;
    }
    var user = "Jane User";
    document.body.innerHTML = greeter(user);
})(greeter01 || (greeter01 = {}));
//# sourceMappingURL=greeter01.js.map