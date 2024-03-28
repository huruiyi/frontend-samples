//create marks variables and prompt the user to input their marks
var mark1 = parseInt(prompt('Please enter the first module mark'));
var mark2 = parseInt(prompt('Please enter the second module mark'));
var mark3 = parseInt(prompt('Please enter the third module mark'));
var mark4 = parseInt(prompt('Please enter the fourth module mark'));
var mark5 = parseInt(prompt('Please enter the fifth module mark'));

console.log('Your results: ');
console.log('Module 1 mark: ' + mark1 + '.');
console.log('Module 2 mark: ' + mark2 + '.');
console.log('Module 3 mark: ' + mark3 + '.');
console.log('Module 4 mark: ' + mark4 + '.');
console.log('Module 5 mark: ' + mark5 + '.');

//create pass variables
var pass1 = mark1 >= 60 ? 1 : 0;
var pass2 = mark2 >= 60 ? 1 : 0;
var pass3 = mark3 >= 60 ? 1 : 0;
var pass4 = mark4 >= 60 ? 1 : 0;
var pass5 = mark5 >= 60 ? 1 : 0;

//calculate the number of modules passed
var numModulesPassed = pass1 + pass2 + pass3 + pass4 + pass5;
console.log('You passed ' + numModulesPassed + ' modules.');

//calculate the average
var average = (mark1 + mark2 + mark3 + mark4 + mark5)/5;
average = average.toFixed(2);
console.log('Your average mark is: ' + average);

//create the pass variable
var pass = (average >= 60) && (numModulesPassed >= 4);

//create the result variable
var result = pass ? "Congratulations! You passed." : "Sorry! You failed.";
console.log(result);


