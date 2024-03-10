var greeter00;
(function (greeter00) {
    var Greeter = /** @class */ (function () {
        function Greeter(greeting) {
            this.greeting = greeting;
        }
        Greeter.prototype.greet = function () {
            return "<h1>" + this.greeting + "</h1>";
        };
        return Greeter;
    }());
    ;
    var greeter = new Greeter("Hello, world!");
    document.body.innerHTML = greeter.greet();
})(greeter00 || (greeter00 = {}));
//# sourceMappingURL=greeter00.js.map