//Prompt the user to input their firstname, lastname and year of birth
var firstname = prompt('Please enter your first name:');
var lastname = prompt('Please enter your last name:');
var year = prompt('Please enter your year of birth:');
year = parseInt(year);

//create the variable setence1
var sentence1 = 'Hello ' + firstname + ' ' + lastname + '.';

//calculate future age
var futureAge = 2040 - year;

//create sentence2
var sentence2 = 'Your age in 2040 will be ' + futureAge + '.';

//create the result variable
var result = sentence1 + '\n' + sentence2;

//add an extra sentence to result
result += '\nI wish you a long life full of success and happiness!';
console.log(result);