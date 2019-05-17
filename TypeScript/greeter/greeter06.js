var greeter6;
(function (greeter6) {
    function Greeter(greeting) {
        this.greeting = greeting;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    var greeter = new Greeter("world");
    var button = document.createElement('button');
    button.textContent = "Say Hello";
    button.onclick = function () {
        alert(greeter.greet());
    };
    document.body.appendChild(button);
})(greeter6 || (greeter6 = {}));
//# sourceMappingURL=greeter06.js.map