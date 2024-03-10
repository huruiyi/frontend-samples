namespace greeter03 {
    interface Person {
        firstName: string;
        lastName: string;
    }

    /*
    * 调用: greeter03.greeter({"firstName":"aa","lastName":"bb"})
    * */
    export function greeter(person: Person) {
        return "Hello, " + person.firstName + " " + person.lastName;
    }

    let user = {firstName: "Jane", lastName: "User"};

    document.body.innerHTML = greeter(user);
}


interface Cat {
    firstName: string;
    lastName: string;
}

// greeterCat({"firstName":"aa","lastName":"bb"})
function greeterCat(cat: Cat) {
    return "Hello, " + cat.firstName + " " + cat.lastName;
}
