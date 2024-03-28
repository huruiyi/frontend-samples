//create the result variable
var result = "Activity - Duration";

//create the remainingTime variable
var remainingTime = 24;

while(remainingTime > 0){
    //prompt the user to input an activity
    var activity = prompt("Please enter an activity: ");

    //declare duration
    var duration;

    //do while statement asking for the duration
    do{
        duration = prompt("How long will the activity last for in hours? (use a decimal number, ex: 3.25)\nYou have " + remainingTime +"h left.");
        duration = parseFloat(duration);
    }while(duration > remainingTime && isNaN(duration));

    //update the remaining time
    remainingTime -= duration;
    //add a new line to the result variable with activity details
    result += "\n" + activity + " - " + duration + " hours.";

}

console.log(result);