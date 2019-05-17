var greeter03;
(function (greeter03) {
    function greeter(person) {
        return "Hello, " + person.firstName + " " + person.lastName;
    }
    greeter03.greeter = greeter;
    var user = { firstName: "Jane", lastName: "User" };
    document.body.innerHTML = greeter(user);
})(greeter03 || (greeter03 = {}));
// greeterCat({"firstName":"aa","lastName":"bb"})
function greeterCat(cat) {
    return "Hello, " + cat.firstName + " " + cat.lastName;
}
//# sourceMappingURL=greeter03.js.map