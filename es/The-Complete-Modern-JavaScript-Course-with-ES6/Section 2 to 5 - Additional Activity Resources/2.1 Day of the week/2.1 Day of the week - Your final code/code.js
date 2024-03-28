//create the day variable
var day = prompt('Please enter a day of the week:');
day = day.toLowerCase();
console.log(day);

//Use the switch statement to print a message
switch(day){
    case "monday":
        console.log('Welcome the new week!');
        break;
    case "tuesday":
        console.log('This is your second day of the week!');
        break;
    case "wednesday":
        console.log('Still enjoying the week?');
        break;
    case "thursday":
        console.log('Tomorrow is Friday!');
        break;
    case "friday":
        console.log('It is Friday! The weekend is around the corner!');
        break;
    case "saturday":
        console.log('Finally, the weekend has come!');
        break;
    case "sunday":
        console.log('The weekend is almost gone');
        break;
    default: 
        console.log('I do not recognise this!');
}