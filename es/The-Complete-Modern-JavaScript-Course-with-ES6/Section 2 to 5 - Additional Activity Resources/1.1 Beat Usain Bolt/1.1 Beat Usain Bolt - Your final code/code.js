//create world champion objects
var wchMale = {
    name: "Usain Bolt",
    time: 9.58
};
var wchFemale = {
    name: "Florence Griffith-Joyner",
    time: 10.49
};


//create the user object
var user = {};

//get gender from the user
user.gender = prompt("Please enter your gender: male or female");
user.gender = user.gender.toLowerCase();

//get the time from the user
user.time = prompt("Please enter your race time:");
user.time = parseFloat(user.time);

console.log(user);

//if statement
if(user.gender === "male" && !isNaN(user.time)){
    if(user.time < wchMale.time){
        console.log("Congratulations! You have beaten " + wchMale.name + ", you have set a new world record: " + user.time + " seconds.");
    }else{
        console.log("Sorry! You need to train harder!");
    }

}else if(user.gender === "female" && !isNaN(user.time)){
    if(user.time < wchFemale.time){
        console.log("Congratulations! You have beaten " + wchFemale.name + ", you have set a new world record: " + user.time + " seconds.");
    }else{
        console.log("Sorry! You need to train harder!");
    }
}else{
    console.log('Please reload the page and use a correct gender and a correct time!');
}