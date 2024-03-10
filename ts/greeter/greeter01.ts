namespace greeter01 {
    function greeter(person: string) {
        return "Hello, " + person;
    }

    let user = "Jane User";

    document.body.innerHTML = greeter(user);
}
