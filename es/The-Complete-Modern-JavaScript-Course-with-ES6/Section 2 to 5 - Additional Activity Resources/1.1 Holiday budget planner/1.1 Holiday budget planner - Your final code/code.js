//build the calculateCost function
function calculateCost(hotelPrice, duration, ticketPrice, budget){
    var totalCost = hotelPrice * duration + ticketPrice;
    console.log("The total cost of your plan is $" + totalCost + ".");
    console.log("Your budget is $" + budget + ".");
    
    //decide whether the plan is within our budget
    var result;
    if(totalCost <= budget){
        result = "Let's go!";
    }else{
        result = "Please change your plan!";
    }
    return result;
}