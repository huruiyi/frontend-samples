//create the function greet
function greet(language){
    if(language.toLowerCase() === "english"){
        return function(name){
            return "Hello " + name + "! Welcome to the museum!";
        }
    }else if(language.toLowerCase() === "spanish"){
        return function(name){
            return "Hola " + name + "! Bienvenido al museo!";
        }
    }else{
        return function(name){
            return "I can only speak English or Spanish!";
        }
    }
}