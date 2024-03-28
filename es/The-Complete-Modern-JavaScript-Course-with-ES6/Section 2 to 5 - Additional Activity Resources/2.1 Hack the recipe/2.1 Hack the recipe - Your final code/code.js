//build the recipe object
var recipe = {
    flour: {
        quantity: 200,
        unit: "g"
    },
    sugar: {
        quantity: 150,
        unit: "g"
    },
    butter: {
        quantity: 125,
        unit: "g"
    },
    milk: {
        quantity: 125,
        unit: "ml"
    },
    eggs: {
        quantity: 2,
        unit: "unit"
    },
    vanillaEssence: {
        quantity: 1,
        unit: "teaspoon"
    },
    salt: {
        quantity: 0.5,
        unit: "teaspoon"
    },
    bakingPowder: {
        quantity: 2,
        unit: "teaspoon"
    }
};
console.log(recipe);

//create toAdd object
var toAdd = {
    g: 10,
    ml: 15,
    teaspoon: 1,
    unit: 1
};

//create hackRecipe function
var hackRecipe = function(ingredient){
    
    //get the unit
    var unit = recipe[ingredient].unit;
    
    //get the quanity to add
    var quantityToAdd = toAdd[unit];
    
    //increase the quantity
    recipe[ingredient]["quantity"] += quantityToAdd;
    
    
    //log changes
    console.log("Added " + quantityToAdd + " " + unit + " of " +  ingredient + ".");
    
    //log the recipe
    console.log(recipe);
};